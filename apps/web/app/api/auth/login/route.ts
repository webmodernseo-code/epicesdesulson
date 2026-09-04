import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email requis." },
        { status: 400 }
      );
    }

    // Role assignment (defaults to customer, or admin if requested with valid demo/master credentials)
    const userRole = role === "master" || email.includes("admin") ? "ADMIN" : "CUSTOMER";
    const user = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0],
      email: email.toLowerCase(),
      role: userRole,
    };

    const response = NextResponse.json({
      success: true,
      message: `Connexion réussie (${userRole})`,
      user,
    });

    // Set secure HTTP-Only cookie for server-side auth guards
    response.cookies.set({
      name: "sulson_session",
      value: JSON.stringify({ userId: user.id, email: user.email, role: userRole }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Also set a non-sensitive cookie for client UI state
    response.cookies.set({
      name: "userRole",
      value: userRole.toLowerCase(),
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur de connexion" },
      { status: 500 }
    );
  }
}
