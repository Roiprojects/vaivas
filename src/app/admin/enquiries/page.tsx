import React from "react";
import { prisma } from "@/lib/prisma";
import { Mail, Phone, Clock, Inbox, CheckCircle2 } from "lucide-react";
import AdminEnquiriesManager from "@/components/admin/AdminEnquiriesManager";

export const revalidate = 0;

async function getEnquiries() {
  try {
    return await prisma.contactEnquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to load enquiries:", err);
    return [];
  }
}

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contact & Business Leads CRM</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review incoming inquiries, track resolution status, and maintain client follow-up notes.
        </p>
      </div>

      <AdminEnquiriesManager initialEnquiries={enquiries} />
    </div>
  );
}
