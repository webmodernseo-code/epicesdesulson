import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = readSession(req);
  if (!session || !["ADMIN", "SUPER_ADMIN", "MASTER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.userId,
      email: session.email,
      role: session.role,
    },
  });
}
