// Universal Product Image Resolver & Fallback Handler for Dashboard

export function getSafeProductImage(
  src?: string | null,
  code?: string | null,
  name?: string | null
): string {
  if (src && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("blob:") || src.startsWith("data:"))) {
    return src;
  }

  const cleanCode = (code || "").toUpperCase();
  const cleanName = (name || "").toLowerCase();
  const cleanSrc = (src || "").toLowerCase();

  if (cleanCode.includes("301") || cleanName.includes("poulet") || cleanSrc.includes("poulet")) {
    return "/images/products/epice-poulet-recto.jpg";
  }
  if (cleanCode.includes("302") || cleanName.includes("viande") || cleanSrc.includes("viande")) {
    return "/images/products/epice-viande-recto.jpg";
  }
  if (cleanCode.includes("303") || cleanName.includes("poisson") || cleanSrc.includes("poisson")) {
    return "/images/products/epice-poisson-recto.jpg";
  }
  if (
    cleanCode.includes("304") ||
    cleanName.includes("gourmande") ||
    cleanName.includes("secret") ||
    cleanSrc.includes("gourmande")
  ) {
    return "/images/products/epice-gourmande-recto.jpg";
  }
  if (cleanCode.includes("305") || cleanName.includes("pack") || cleanSrc.includes("pack")) {
    return "/images/products/pack-4-saveurs-sulson.jpg";
  }

  if (src && src.startsWith("/")) {
    return src;
  }
  if (src && !src.startsWith("/")) {
    return `/images/products/${src}`;
  }

  return "/images/products/pack-4-saveurs-sulson.jpg";
}

export function handleProductImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  code?: string | null,
  name?: string | null
) {
  const target = e.currentTarget;
  const cleanCode = (code || "").toUpperCase();
  const cleanName = (name || "").toLowerCase();

  if (cleanCode.includes("301") || cleanName.includes("poulet")) {
    target.src = "/images/products/epice-poulet-recto.jpg";
  } else if (cleanCode.includes("302") || cleanName.includes("viande")) {
    target.src = "/images/products/epice-viande-recto.jpg";
  } else if (cleanCode.includes("303") || cleanName.includes("poisson")) {
    target.src = "/images/products/epice-poisson-recto.jpg";
  } else if (cleanCode.includes("304") || cleanName.includes("gourmande") || cleanName.includes("secret")) {
    target.src = "/images/products/epice-gourmande-recto.jpg";
  } else {
    target.src = "/images/products/pack-4-saveurs-sulson.jpg";
  }
}
