import React from "react";
import AdminNavShell from "@/components/admin/AdminNavShell";
import { getAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Admin Portal | Vaivas Ventures",
  description: "Secure administrative suite for Vaivas Ventures management.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return <AdminNavShell session={session}>{children}</AdminNavShell>;
}
