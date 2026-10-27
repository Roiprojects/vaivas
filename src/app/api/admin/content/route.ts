import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, logActivity } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("pageId") || "home";

  const content = await prisma.pageContent.findUnique({
    where: { id: pageId },
  });

  return NextResponse.json({ content });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { pageId, draftData, action } = await req.json();

    if (!pageId) return NextResponse.json({ error: "Missing page ID" }, { status: 400 });

    const existing = await prisma.pageContent.findUnique({
      where: { id: pageId },
    });

    if (action === "PUBLISH") {
      // Copy current draftData to publishedData
      const dataToPublish = draftData || existing?.draftData || {};

      const updated = await prisma.pageContent.upsert({
        where: { id: pageId },
        update: {
          draftData: dataToPublish,
          publishedData: dataToPublish,
          isPublished: true,
          lastPublishedAt: new Date(),
        },
        create: {
          id: pageId,
          draftData: dataToPublish,
          publishedData: dataToPublish,
          isPublished: true,
          lastPublishedAt: new Date(),
        },
      });

      await logActivity(
        "PUBLISH_CONTENT",
        "CMS",
        `Published live content for page "${pageId}"`,
        session.id,
        session.name
      );

      return NextResponse.json({
        success: true,
        message: `Page "${pageId}" published successfully to live website.`,
        content: updated,
      });
    }

    // Default: Save draft only (does NOT affect publishedData on public site!)
    const updated = await prisma.pageContent.upsert({
      where: { id: pageId },
      update: {
        draftData: draftData,
      },
      create: {
        id: pageId,
        draftData: draftData,
        publishedData: draftData,
        isPublished: true,
      },
    });

    await logActivity(
      "SAVE_DRAFT",
      "CMS",
      `Saved draft for page "${pageId}" without publishing`,
      session.id,
      session.name
    );

    return NextResponse.json({
      success: true,
      message: "Draft saved. Changes will not be public until published.",
      content: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed operation" }, { status: 500 });
  }
}
