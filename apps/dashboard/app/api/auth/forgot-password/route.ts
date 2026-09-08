import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHmac } from "node:crypto";
import { getSessionSecret } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre adresse email." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const secret = getSessionSecret();

    // Check if it's the master admin or a registered user in Neon DB
    const isMaster =
      cleanEmail === "admin@epicesdesulson.com" ||
      cleanEmail === "contact@epicesdesulson.com" ||
      cleanEmail === "admin";

    let userExists = isMaster;

    if (!userExists) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });
        if (dbUser && (dbUser.role === "ADMIN" || dbUser.role === "MASTER_ADMIN")) {
          userExists = true;
        }
      } catch (err) {
        console.error("Database check error during password reset:", err);
      }
    }

    // Always respond with success to avoid email enumeration
    if (!userExists) {
      return NextResponse.json({
        success: true,
        message: "Si cette adresse est enregistrée, les instructions ont été envoyées.",
      });
    }

    // Generate signed reset token valid for 1 hour
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const payload = JSON.stringify({ email: cleanEmail, exp });
    const encoded = Buffer.from(payload).toString("base64url");
    const signature = createHmac("sha256", secret).update(encoded).digest("base64url");
    const resetToken = `${encoded}.${signature}`;

    const host = req.headers.get("host") || "admin.epicesdesulson.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const resetUrl = `${protocol}://${host}/set-new-password?token=${resetToken}`;

    await sendPasswordResetEmail({
      to: cleanEmail,
      resetUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Instructions de réinitialisation envoyées avec succès.",
    });
  } catch (error) {
    console.error("Error in forgot-password API:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    );
  }
}
