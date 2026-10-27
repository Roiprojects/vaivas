import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const shipments = await prisma.adsShipment.findMany({
      orderBy: { createdAt: "desc" },
      include: { order: true },
    });
    return NextResponse.json({ success: true, shipments });
  } catch (error: any) {
    console.error("Error fetching shipments:", error);
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      dispatchedQty,
      packagingDetails,
      deliveryMethod,
      courierPartner,
      trackingReference,
      shippingCharges = 0,
    } = body;

    if (!orderId || !dispatchedQty || !packagingDetails) {
      return NextResponse.json(
        { error: "Order, dispatched quantity, and packaging details are required." },
        { status: 400 }
      );
    }

    const order = await prisma.adsOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const qty = parseInt(dispatchedQty, 10);
    if (qty <= 0) {
      return NextResponse.json({ error: "Dispatched quantity must be greater than zero." }, { status: 400 });
    }

    // Strict validation: Prevent dispatching more than ordered / remaining
    if (qty > order.remainingQty) {
      return NextResponse.json(
        {
          error: `Cannot dispatch ${qty} units. Remaining undelivered quantity is only ${order.remainingQty} units.`,
        },
        { status: 400 }
      );
    }

    const shipmentCount = await prisma.adsShipment.count();
    const currentYear = new Date().getFullYear();
    const shipmentNumber = `SHP-${currentYear}-${String(shipmentCount + 1001).padStart(4, "0")}`;

    const newDispatchedTotal = order.totalDispatchedQty + qty;
    const newRemaining = order.remainingQty - qty;
    const newStatus = newRemaining === 0 ? "DISPATCHED" : "PARTIALLY_DISPATCHED";

    const result = await prisma.$transaction(async (tx) => {
      const shipment = await tx.adsShipment.create({
        data: {
          orderId,
          shipmentNumber,
          dispatchedQty: qty,
          packagingDetails,
          deliveryMethod: deliveryMethod || "Courier",
          courierPartner: courierPartner || null,
          trackingReference: trackingReference || null,
          shippingCharges: parseFloat(Number(shippingCharges).toFixed(2)),
          deliveryStatus: "IN_TRANSIT",
        },
      });

      const updatedOrder = await tx.adsOrder.update({
        where: { id: orderId },
        data: {
          totalDispatchedQty: newDispatchedTotal,
          remainingQty: newRemaining,
          status: newStatus,
        },
      });

      return { shipment, order: updatedOrder };
    });

    return NextResponse.json({ success: true, shipment: result.shipment, order: result.order });
  } catch (error: any) {
    console.error("Error creating shipment:", error);
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { shipmentId, action, proofOfDelivery, issueDetails } = body;

    if (!shipmentId) {
      return NextResponse.json({ error: "Shipment ID is required" }, { status: 400 });
    }

    if (action === "CONFIRM_DELIVERY") {
      const updatedShipment = await prisma.adsShipment.update({
        where: { id: shipmentId },
        data: {
          deliveryStatus: "DELIVERED",
          proofOfDelivery: proofOfDelivery || "Delivered and confirmed by recipient.",
          deliveryConfirmedAt: new Date(),
        },
        include: { order: true },
      });

      // If all units for this order are delivered and balance is zero, update order to DELIVERED
      if (updatedShipment.order.remainingQty === 0) {
        await prisma.adsOrder.update({
          where: { id: updatedShipment.orderId },
          data: { status: "DELIVERED" },
        });
      }

      return NextResponse.json({ success: true, shipment: updatedShipment });
    }

    if (action === "LOG_ISSUE") {
      const shipment = await prisma.adsShipment.findUnique({
        where: { id: shipmentId },
        include: { order: true },
      });

      if (!shipment) return NextResponse.json({ error: "Shipment not found" }, { status: 404 });

      const existingIssues = (shipment.order.issues as any[]) || [];
      const newIssue = {
        shipmentNumber: shipment.shipmentNumber,
        loggedAt: new Date().toISOString(),
        details: issueDetails || "Transit damage or count discrepancy logged",
      };

      await prisma.adsOrder.update({
        where: { id: shipment.orderId },
        data: { issues: [...existingIssues, newIssue] },
      });

      return NextResponse.json({ success: true, message: "Issue logged successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Error updating shipment:", error);
    return NextResponse.json({ error: "Failed to update shipment" }, { status: 500 });
  }
}
