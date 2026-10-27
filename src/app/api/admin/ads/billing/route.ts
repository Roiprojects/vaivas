import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const [billingRecords, orders] = await Promise.all([
      prisma.adsBillingRecord.findMany({
        orderBy: { paymentDate: "desc" },
        include: { order: true },
      }),
      prisma.adsOrder.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          orderNumber: true,
          customerName: true,
          companyName: true,
          totalAmount: true,
          advancePaid: true,
          balanceAmount: true,
          paymentStatus: true,
          status: true,
        },
      }),
    ]);

    return NextResponse.json({ success: true, billingRecords, orders });
  } catch (error: any) {
    console.error("Error fetching billing:", error);
    return NextResponse.json({ error: "Failed to fetch billing" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      amount,
      type,
      paymentMethod,
      transactionReference,
      receiptNotes,
      closeOrder = false,
    } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: "Order ID and payment amount are required." },
        { status: 400 }
      );
    }

    const order = await prisma.adsOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const payAmount = parseFloat(Number(amount).toFixed(2));
    if (payAmount <= 0) {
      return NextResponse.json({ error: "Payment amount must be greater than zero." }, { status: 400 });
    }

    const billCount = await prisma.adsBillingRecord.count();
    const currentYear = new Date().getFullYear();
    const invoiceNumber = `INV-${currentYear}-${String(billCount + 1001).padStart(4, "0")}`;

    const newAdvancePaid = parseFloat((order.advancePaid + payAmount).toFixed(2));
    const newBalance = Math.max(0, parseFloat((order.totalAmount - newAdvancePaid).toFixed(2)));
    const paymentStatus = newBalance === 0 ? "FULLY_PAID" : "PARTIALLY_PAID";

    let updatedOrderStatus = order.status;
    if (closeOrder && newBalance === 0) {
      // Order closure rule: only when delivery and agreed settlement conditions are satisfied
      if (order.remainingQty > 0) {
        return NextResponse.json(
          {
            error:
              "Cannot close order: Delivery has not been completed. There are still undelivered quantities.",
          },
          { status: 400 }
        );
      }
      updatedOrderStatus = "CLOSED";
    }

    const result = await prisma.$transaction(async (tx) => {
      const record = await tx.adsBillingRecord.create({
        data: {
          orderId,
          invoiceNumber,
          amount: payAmount,
          type: type || "MILESTONE",
          paymentMethod: paymentMethod || "Bank Transfer / NEFT / RTGS",
          transactionReference: transactionReference || null,
          receiptNotes: receiptNotes || null,
        },
      });

      const updatedOrder = await tx.adsOrder.update({
        where: { id: orderId },
        data: {
          advancePaid: newAdvancePaid,
          balanceAmount: newBalance,
          paymentStatus,
          status: updatedOrderStatus,
        },
      });

      return { record, order: updatedOrder };
    });

    return NextResponse.json({ success: true, record: result.record, order: result.order });
  } catch (error: any) {
    console.error("Error creating billing record:", error);
    return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
  }
}
