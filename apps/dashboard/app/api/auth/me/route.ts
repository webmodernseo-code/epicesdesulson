import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = readSession(req);
  if (!session || !["ADMIN", "SUPER_ADMIN", "MASTER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true, adminEnabled: true },
  });
  if (!user?.adminEnabled || !["ADMIN", "SUPER_ADMIN", "MASTER_ADMIN"].includes(user.role)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}
