import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.adsOrder.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        quotation: true,
        shipments: true,
        billingRecords: true,
      },
    });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      status,
      statusReason,
      assignedStaff,
      productionVendor,
      confirmedDeliveryDate,
      action,
      artworkProofUrl,
      approvedBy,
      qualityCheckNotes,
    } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await prisma.adsOrder.findUnique({
      where: { id: orderId },
      include: { billingRecords: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 1. Artwork Approval Action
    if (action === "APPROVE_ARTWORK") {
      const existingProofs = (order.artworkProofs as any[]) || [];
      const updatedProofs = [
        ...existingProofs,
        {
          url: artworkProofUrl || "/images/ads/print-calendar-showcase.jpg",
          version: `v${existingProofs.length + 1}-Approved`,
          uploadedAt: new Date().toISOString(),
          approvedBy: approvedBy || "Client Representative",
        },
      ];

      const updated = await prisma.adsOrder.update({
        where: { id: orderId },
        data: {
          artworkProofs: updatedProofs,
          isArtworkApproved: true,
          artworkApprovedBy: approvedBy || "Client Representative",
          artworkApprovedAt: new Date(),
          status: "READY_FOR_PRODUCTION",
        },
      });

      return NextResponse.json({ success: true, order: updated });
    }

    // 2. Quality Check Sign-off Action
    if (action === "SIGN_OFF_QC") {
      const updated = await prisma.adsOrder.update({
        where: { id: orderId },
        data: {
          qualityCheckPassed: true,
          qualityCheckNotes: qualityCheckNotes || {
            dimensions: "Verified within ±0.5mm tolerance",
            materials: "Verified paper GSM & stand board thickness",
            colours: "CMYK density matched approved digital proof",
            finish: "Lamination & foiling registration clean",
            quantity: "100% count verified",
            datesChecked: "Calendar page sequence & holidays checked",
          },
          status: "READY_FOR_DISPATCH",
        },
      });

      return NextResponse.json({ success: true, order: updated });
    }

    // 3. Status Transition with Strict Governance Gates
    if (status) {
      // Require reason for On Hold or Cancelled
      if ((status === "ON_HOLD" || status === "CANCELLED") && !statusReason) {
        return NextResponse.json(
          { error: `A documented reason is mandatory when setting status to ${status}.` },
          { status: 400 }
        );
      }

      // Gate check for Production release
      if (
        status === "READY_FOR_PRODUCTION" ||
        status === "IN_PRODUCTION"
      ) {
        if (!order.isArtworkApproved) {
          return NextResponse.json(
            {
              error:
                "Production Gate: Job cannot be released to production until the final artwork proof is signed off by the customer.",
            },
            { status: 400 }
          );
        }

        if (order.advancePaid <= 0) {
          return NextResponse.json(
            {
              error:
                "Production Gate: Job cannot be released to production until the agreed advance payment confirmation is recorded in Billing.",
            },
            { status: 400 }
          );
        }
      }

      const updated = await prisma.adsOrder.update({
        where: { id: orderId },
        data: {
          status,
          statusReason: statusReason || null,
          assignedStaff: assignedStaff !== undefined ? assignedStaff : undefined,
          productionVendor: productionVendor !== undefined ? productionVendor : undefined,
          confirmedDeliveryDate: confirmedDeliveryDate
            ? new Date(confirmedDeliveryDate)
            : undefined,
        },
      });

      return NextResponse.json({ success: true, order: updated });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
