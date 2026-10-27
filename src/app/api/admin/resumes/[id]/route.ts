import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { getAdminSession } from "@/lib/auth";
import { getPrivateResumePath } from "@/lib/storage";

interface ResumeDownloadProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: ResumeDownloadProps) {
  // 1. Enforce admin authentication server-side
  const session = await getAdminSession();
  if (!session) {
    return new NextResponse("Unauthorized: Admin credentials required to access candidate resumes.", {
      status: 401,
    });
  }

  const { id } = await params;
  if (!id) {
    return new NextResponse("Resume file identifier required.", { status: 400 });
  }

  // 2. Resolve safe path in storage/resumes
  const filePath = getPrivateResumePath(id);
  if (!filePath) {
    return new NextResponse("Requested resume not found or removed.", { status: 404 });
  }

  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${id}"`,
      },
    });
  } catch (err) {
    console.error("Resume stream error:", err);
    return new NextResponse("Failed to read resume file.", { status: 500 });
  }
}
