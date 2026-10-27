import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const services = await prisma.adsService.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isPublished, isFeatured, order, summary, name } = body;

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await prisma.adsService.update({
      where: { id },
      data: {
        isPublished: isPublished !== undefined ? isPublished : undefined,
        isFeatured: isFeatured !== undefined ? isFeatured : undefined,
        order: order !== undefined ? Number(order) : undefined,
        summary: summary || undefined,
        name: name || undefined,
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}
