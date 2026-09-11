import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHmac } from "node:crypto";
import { getSessionSecret } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const MASTER_RECOVERY_EMAIL = "contact@epicesdesulson.com";

function getMasterRecoveryEmails() {
  const configured = process.env.ADMIN_RECOVERY_EMAILS
    ?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return configured?.length ? configured : [MASTER_RECOVERY_EMAIL];
}

export async function POST(req: Request) {
  try {
    const limit = rateLimit(`forgot-password:${getClientIp(req)}`, 5, 15 * 60 * 1000);
    if (!limit.success) {
      return NextResponse.json(
        { error: "Trop de demandes. Veuillez patienter avant de réessayer." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((limit.reset - Date.now()) / 1000)) } }
      );
    }
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
      cleanEmail === "contact@epicesdesulson.com";

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

    const configuredOrigin = process.env.NEXT_PUBLIC_DASHBOARD_URL?.replace(/\/$/, "");
    const origin = configuredOrigin || new URL(req.url).origin;
    const resetUrl = `${origin}/set-new-password?token=${encodeURIComponent(resetToken)}`;

    const recoveryEmails = isMaster ? getMasterRecoveryEmails() : [cleanEmail];
    const delivery = await sendPasswordResetEmail({
      recipients: recoveryEmails,
      resetUrl,
      accountEmail: cleanEmail,
    });
    if (!delivery.success) {
      console.error("Password reset email delivery failed:", delivery.error);
      return NextResponse.json(
        { error: "Le service email est indisponible. Aucun lien n’a été envoyé." },
        { status: 503 }
      );
    }

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
