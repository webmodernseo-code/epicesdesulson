import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Déconnexion réussie",
  });

  response.cookies.delete("sulson_session");
  response.cookies.delete("userRole");

  return response;
}
