import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout", "/order-successful", "/my-account"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
