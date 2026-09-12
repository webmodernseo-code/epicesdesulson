import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const input = await req.formData();
    const file = input.get("file");

    if (
      !(file instanceof File) ||
      !file.type.startsWith("image/") ||
      file.size > 10 * 1024 * 1024
    ) {
      return NextResponse.json(
        { error: "Image JPG, PNG, WEBP ou AVIF de 10 Mo maximum requise." },
        { status: 400 }
      );
    }

    // 1. Check Cloudinary config from Database
    let cloudName = "";
    let apiKey = "";
    let apiSecret = "";
    let uploadFolder = "les-epices-de-sulson/products";
    let isEnabled = true;

    try {
      const dbConfig = await prisma.mediaStorageConfig.findUnique({
        where: { provider: "cloudinary" },
      });
      if (dbConfig && dbConfig.isEnabled && dbConfig.cloudName && dbConfig.apiKey && dbConfig.apiSecret) {
        cloudName = dbConfig.cloudName;
        apiKey = dbConfig.apiKey;
        apiSecret = dbConfig.apiSecret;
        uploadFolder = dbConfig.uploadFolder || uploadFolder;
        isEnabled = true;
      }
    } catch {
      // Prisma DB query fallback
    }

    // 2. Fallback to Environment Variables if DB not configured
    if (!cloudName || !apiKey || !apiSecret) {
      cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
      apiKey = process.env.CLOUDINARY_API_KEY || "";
      apiSecret = process.env.CLOUDINARY_API_SECRET || "";
      uploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER || uploadFolder;
    }

    // 3. If Cloudinary credentials are valid, upload to Cloudinary API
    if (cloudName && apiKey && apiSecret && isEnabled) {
      const timestamp = Math.floor(Date.now() / 1000);
      const params = `folder=${uploadFolder}&timestamp=${timestamp}`;
      const signature = createHash("sha1")
        .update(`${params}${apiSecret}`)
        .digest("hex");

      const form = new FormData();
      form.set("file", file);
      form.set("folder", uploadFolder);
      form.set("timestamp", String(timestamp));
      form.set("api_key", apiKey);
      form.set("signature", signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: form }
      );

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.error?.message || "Échec du téléversement Cloudinary." },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        source: "cloudinary",
        data: {
          url: data.secure_url,
          publicId: data.public_id,
          width: data.width,
          height: data.height,
          format: data.format,
        },
      });
    }

    // 4. Fallback if Cloudinary is not configured yet (returns data URI with reminder)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    return NextResponse.json({
      success: true,
      source: "local_preview",
      warning: "Cloudinary n'est pas encore configuré. L'image a été chargée en mode prévisualisation. Configurez vos clés dans Réglages > Médias pour un stockage Cloudinary permanent.",
      data: {
        url: base64,
        publicId: `preview_${Date.now()}`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erreur interne lors du traitement de l'image." },
      { status: 500 }
    );
  }
}
