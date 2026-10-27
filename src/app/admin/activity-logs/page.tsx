import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminActivityLogsViewer from "@/components/admin/AdminActivityLogsViewer";

export const metadata: Metadata = {
  title: "Activity Logs | Vaivas Ventures Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminActivityLogsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      adminUser: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  });

  return (
    <div className="max-w-6xl mx-auto py-4">
      <AdminActivityLogsViewer
        initialLogs={logs.map((l) => ({
          ...l,
          createdAt: l.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
