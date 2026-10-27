import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminUsersManager from "@/components/admin/AdminUsersManager";

export const metadata: Metadata = {
  title: "Admin Users | Vaivas Ventures Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const users = await prisma.adminUser.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: { activityLogs: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto py-4">
      <AdminUsersManager
        initialUsers={users.map((u) => ({
          ...u,
          createdAt: u.createdAt.toISOString(),
        }))}
        currentUserId={session.id}
        currentUserRole={session.role}
      />
    </div>
  );
}
