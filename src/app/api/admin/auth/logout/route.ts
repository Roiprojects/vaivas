import { NextRequest, NextResponse } from "next/server";
import { clearAdminSession, getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: session });
}
