import React from "react";
import { prisma } from "@/lib/prisma";
import AdminHomeCmsEditor from "@/components/admin/AdminHomeCmsEditor";

export const revalidate = 0;

async function getHomeContent() {
  try {
    return await prisma.pageContent.findUnique({
      where: { id: "home" },
    });
  } catch (err) {
    console.error("Failed to load home CMS:", err);
    return null;
  }
}

export default async function AdminHomePage() {
  const content = await getHomeContent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Home Page Content Management</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize headlines, subtexts, and call-to-actions. Changes remain in draft state until
          published.
        </p>
      </div>

      <AdminHomeCmsEditor initialContent={content} />
    </div>
  );
}
