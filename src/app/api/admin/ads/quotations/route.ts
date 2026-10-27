import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const quotations = await prisma.adsQuotation.findMany({
      orderBy: { createdAt: "desc" },
      include: { order: true, lead: true },
    });
    return NextResponse.json({ success: true, quotations });
  } catch (error: any) {
    console.error("Error fetching quotations:", error);
    return NextResponse.json({ error: "Failed to fetch quotations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      leadId,
      customerName,
      customerEmail,
      customerPhone,
      companyName,
      billingAddress,
      validityDays = 15,
      items = [],
      designSetupCost = 0,
      finishingCost = 0,
      deliveryCharges = 0,
      discountAmount = 0,
      taxPercent = 18,
      advanceRequiredPercent = 50,
      commercialTerms = {},
      specificationsSnapshot = {},
    } = body;

    if (!customerName || !customerEmail || items.length === 0) {
      return NextResponse.json(
        { error: "Customer name, email, and at least one item are required." },
        { status: 400 }
      );
    }

    // Precise server-side calculations
    let subtotal = 0;
    const computedItems = items.map((it: any) => {
      const qty = parseFloat(it.quantity) || 1;
      const rate = parseFloat(it.unitRate) || 0;
      const amount = parseFloat((qty * rate).toFixed(2));
      subtotal += amount;
      return {
        description: it.description || "Custom Print / Service Item",
        quantity: qty,
        unitRate: rate,
        amount,
      };
    });

    subtotal = parseFloat(subtotal.toFixed(2));
    const setup = parseFloat(Number(designSetupCost).toFixed(2));
    const finishing = parseFloat(Number(finishingCost).toFixed(2));
    const delivery = parseFloat(Number(deliveryCharges).toFixed(2));
    const discount = parseFloat(Number(discountAmount).toFixed(2));

    const taxableAmount = Math.max(0, subtotal + setup + finishing + delivery - discount);
    const taxRate = parseFloat(Number(taxPercent).toFixed(2));
    const taxAmount = parseFloat(((taxableAmount * taxRate) / 100).toFixed(2));
    const totalAmount = parseFloat((taxableAmount + taxAmount).toFixed(2));

    const advPercent = parseFloat(Number(advanceRequiredPercent).toFixed(2));
    const advanceAmount = parseFloat(((totalAmount * advPercent) / 100).toFixed(2));

    // Next quotation number
    const count = await prisma.adsQuotation.count();
    const currentYear = new Date().getFullYear();
    const quotationNumber = `QT-${currentYear}-${String(count + 1001).padStart(4, "0")}`;

    let leadRefNumber: string | null = null;
    if (leadId) {
      const lead = await prisma.adsLead.findUnique({ where: { id: leadId } });
      leadRefNumber = lead?.refNumber || null;
    }

    const validityDate = new Date(Date.now() + 86400000 * (Number(validityDays) || 15));

    const quotation = await prisma.adsQuotation.create({
      data: {
        quotationNumber,
        revisionNumber: 1,
        leadId: leadId || null,
        leadRefNumber,
        customerName,
        customerEmail,
        customerPhone: customerPhone || "",
        companyName: companyName || null,
        billingAddress: billingAddress || null,
        validityDate,
        items: computedItems,
        subtotal,
        designSetupCost: setup,
        finishingCost: finishing,
        deliveryCharges: delivery,
        discountAmount: discount,
        taxPercent: taxRate,
        taxAmount,
        totalAmount,
        advanceRequiredPercent: advPercent,
        advanceAmount,
        commercialTerms: commercialTerms || {
          leadTime: "10-14 business days from digital proof sign-off",
          deliveryBasis: "Doorstep delivery via insured courier",
          milestones: "50% advance upon order placement, 50% prior to dispatch",
          exclusions: "Unloading without lift access",
          cancellationTerms: "Non-cancellable once plates are imaged",
        },
        specificationsSnapshot: specificationsSnapshot || {},
        status: "DRAFT",
      },
    });

    return NextResponse.json({ success: true, quotation });
  } catch (error: any) {
    console.error("Error creating quotation:", error);
    return NextResponse.json({ error: "Failed to create quotation" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, quotationId, status, acceptanceEvidence, revisedItems } = body;

    if (!quotationId) {
      return NextResponse.json({ error: "Quotation ID is required" }, { status: 400 });
    }

    const currentQuote = await prisma.adsQuotation.findUnique({
      where: { id: quotationId },
      include: { order: true },
    });

    if (!currentQuote) {
      return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
    }

    // 1. Transactional Order Conversion
    if (action === "CONVERT_TO_ORDER") {
      if (currentQuote.isConvertedToOrder || currentQuote.order) {
        return NextResponse.json(
          { error: "Quotation has already been converted to an order." },
          { status: 400 }
        );
      }

      if (currentQuote.status !== "ACCEPTED") {
        return NextResponse.json(
          { error: "Quotation must be accepted before converting to an order." },
          { status: 400 }
        );
      }

      const orderCount = await prisma.adsOrder.count();
      const currentYear = new Date().getFullYear();
      const orderNumber = `ORD-${currentYear}-${String(orderCount + 1001).padStart(4, "0")}`;

      // Calculate total ordered quantity from items
      const itemsList = (currentQuote.items as any[]) || [];
      const totalOrderedQty = itemsList.reduce(
        (sum, item) => sum + (parseInt(item.quantity, 10) || 0),
        0
      ) || 1;

      const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.adsOrder.create({
          data: {
            orderNumber,
            quotationId: currentQuote.id,
            quotationNumber: currentQuote.quotationNumber,
            customerName: currentQuote.customerName,
            customerEmail: currentQuote.customerEmail,
            customerPhone: currentQuote.customerPhone,
            companyName: currentQuote.companyName,
            billingAddress: currentQuote.billingAddress,
            deliveryAddress:
              currentQuote.billingAddress ||
              "To be confirmed upon final dispatch scheduling",
            items: currentQuote.items as any,
            specifications: currentQuote.specificationsSnapshot as any,
            totalAmount: currentQuote.totalAmount,
            advancePaid: 0,
            balanceAmount: currentQuote.totalAmount,
            paymentStatus: "PENDING",
            status: "CONFIRMED",
            totalOrderedQty,
            totalDispatchedQty: 0,
            remainingQty: totalOrderedQty,
          },
        });

        await tx.adsQuotation.update({
          where: { id: currentQuote.id },
          data: { isConvertedToOrder: true },
        });

        // Also update lead status to WON if linked
        if (currentQuote.leadId) {
          await tx.adsLead.update({
            where: { id: currentQuote.leadId },
            data: { status: "WON" },
          });
        }

        return newOrder;
      });

      return NextResponse.json({ success: true, order });
    }

    // 2. Revision Action
    if (action === "REVISE") {
      const priorSnapshot = {
        revisionNumber: currentQuote.revisionNumber,
        items: currentQuote.items,
        totalAmount: currentQuote.totalAmount,
        revisedAt: new Date().toISOString(),
      };

      const existingRevisions = (currentQuote.revisions as any[]) || [];

      const updated = await prisma.adsQuotation.update({
        where: { id: quotationId },
        data: {
          revisionNumber: currentQuote.revisionNumber + 1,
          status: "UNDER_REVISION",
          revisions: [...existingRevisions, priorSnapshot],
        },
      });

      return NextResponse.json({ success: true, quotation: updated });
    }

    // 3. Regular Status / Acceptance Update
    const updated = await prisma.adsQuotation.update({
      where: { id: quotationId },
      data: {
        status: status || undefined,
        acceptanceEvidence: acceptanceEvidence || undefined,
      },
    });

    return NextResponse.json({ success: true, quotation: updated });
  } catch (error: any) {
    console.error("Error updating quotation:", error);
    return NextResponse.json({ error: "Failed to update quotation" }, { status: 500 });
  }
}
