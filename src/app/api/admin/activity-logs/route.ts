import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const module = searchParams.get("module");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    const where: any = {};
    if (module && module !== "ALL") {
      where.module = module;
    }

    if (search) {
      where.OR = [
        { action: { contains: search, mode: "insensitive" } },
        { userName: { contains: search, mode: "insensitive" } },
        { details: { contains: search, mode: "insensitive" } },
      ];
    }

    const logs = await prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        adminUser: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
