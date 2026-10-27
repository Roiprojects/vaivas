import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, hashPassword, logActivity } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { activityLogs: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (session.role !== "SUPERADMIN" && session.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Only Superadmin and Admin can create accounts" }, { status: 403 });
    }

    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "Name, email and password are required" }, { status: 400 });
    }

    const existing = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json({ success: false, error: "A user with this email already exists" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.adminUser.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        role: role || "ADMIN",
        isActive: true,
      },
    });

    await logActivity("CREATE_ADMIN_USER", "USERS", `Created admin user: ${newUser.email} with role ${newUser.role}`, session.id, session.name);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isActive: newUser.isActive,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, email, role, isActive, password } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    // Role check: non-superadmins can only edit themselves, cannot promote themselves or deactivate themselves
    if (session.role !== "SUPERADMIN" && session.id !== id) {
      return NextResponse.json({ success: false, error: "Permission denied to edit other users" }, { status: 403 });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase().trim();
    if (session.role === "SUPERADMIN" && role) updateData.role = role;
    if (session.role === "SUPERADMIN" && typeof isActive === "boolean") updateData.isActive = isActive;
    if (password && password.length >= 6) {
      updateData.passwordHash = await hashPassword(password);
    }

    const updated = await prisma.adminUser.update({
      where: { id },
      data: updateData,
    });

    await logActivity("UPDATE_ADMIN_USER", "USERS", `Updated admin user: ${updated.email}`, session.id, session.name);

    return NextResponse.json({
      success: true,
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        isActive: updated.isActive,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (session.role !== "SUPERADMIN") {
      return NextResponse.json({ success: false, error: "Only Superadmin can delete accounts" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    if (id === session.id) {
      return NextResponse.json({ success: false, error: "Cannot delete your own account" }, { status: 400 });
    }

    await prisma.adminUser.delete({
      where: { id },
    });

    await logActivity("DELETE_ADMIN_USER", "USERS", `Deleted admin user ID: ${id}`, session.id, session.name);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
