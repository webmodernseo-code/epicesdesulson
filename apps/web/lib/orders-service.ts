import { ProductsService, SULSON_CATALOGUE } from "./products-service";

export interface CreateOrderItemInput {
  id?: string | number;
  productId?: string | number;
  title?: string;
  productName?: string;
  formatLabel?: string;
  pack?: string;
  quantity?: number;
  currentPrice?: string | number;
  unitPrice?: number;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostal: string;
  shippingCountry?: string;
  couponCode?: string;
  items: CreateOrderItemInput[];
}

export interface OrderResponseModel {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  paymentStatus: "UNPAID" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  items: {
    productId: string;
    productName: string;
    formatLabel: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  createdAt: string;
}

// In-memory runtime cache for serverless fallback when DB is disconnected
const runtimeOrders = new Map<string, OrderResponseModel>();

export class OrdersService {
  static async createOrder(input: CreateOrderInput): Promise<OrderResponseModel> {
    if (!input.items || input.items.length === 0) {
      throw new Error("Le panier est vide.");
    }
    if (input.items.length > 50) throw new Error("Le panier contient trop d'articles.");
    if (!input.customerName?.trim() || !input.customerEmail?.trim() ||
        !input.shippingStreet?.trim()) {
      throw new Error("Les coordonnées de livraison sont incomplètes.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.customerEmail.trim())) {
      throw new Error("L'adresse email est invalide.");
    }

    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const rawItem of (input.items || []) as any[]) {
      if (!rawItem) continue;

      const rawIdString = String(rawItem.productId || rawItem.id || "").trim();
      const baseIdMatch = rawIdString.match(/^(SUL-\d+|\d+)/i)?.[1] || rawIdString.split("-")[0] || rawIdString || "301";
      
      const formatLabel = String(
        rawItem.formatLabel ||
        rawItem.pack ||
        (rawIdString.includes("-") ? rawIdString.split("-").slice(1).join("-") : "") ||
        "100g"
      ).trim();

      const quantity = Math.max(1, Math.min(99, Math.floor(Number(rawItem.quantity) || 1)));

      // Lookup product by ID, code, or title
      let product = await ProductsService.getProductById(baseIdMatch);
      if (!product) {
        const titleLower = String(rawItem.title || rawItem.productName || "").toLowerCase();
        product = SULSON_CATALOGUE.find((p) =>
          p.id === baseIdMatch ||
          p.code.toLowerCase() === baseIdMatch.toLowerCase() ||
          (titleLower && (titleLower.includes(p.title.toLowerCase()) || p.title.toLowerCase().includes(titleLower.replace(/\s*\(.*\)/, "").trim())))
        ) || SULSON_CATALOGUE[0];
      }

      let unitPrice = 5.99;
      let productName = rawItem.title || rawItem.productName || (product ? product.title : "Épice de Sulson");
      let productCode = product ? product.code : "SUL-301";

      if (product) {
        productCode = product.code;
        productName = product.title;
        const selectedFormat = product.formats.find(
          (f) => f.label.toLowerCase() === formatLabel.toLowerCase() ||
                 formatLabel.toLowerCase().includes(f.label.toLowerCase())
        ) || product.formats[0];

        unitPrice = selectedFormat ? selectedFormat.price : product.basePrice;
      } else if (rawItem.currentPrice) {
        const parsedPrice = parseFloat(String(rawItem.currentPrice).replace(/[^0-9.,]/g, "").replace(",", "."));
        if (!isNaN(parsedPrice) && parsedPrice > 0) {
          unitPrice = parsedPrice;
        }
      }

      const rowTotal = parseFloat((unitPrice * quantity).toFixed(2));
      calculatedSubtotal += rowTotal;

      validatedItems.push({
        productId: productCode,
        productName,
        formatLabel: formatLabel || "100g",
        quantity,
        unitPrice,
        totalPrice: rowTotal,
      });
    }

    if (validatedItems.length === 0) {
      throw new Error("Le panier ne contient aucun article valide.");
    }

    // Discount Calculation (Dynamic database coupon or fallback)
    let discountAmount = 0;
    if (input.couponCode && input.couponCode.trim()) {
      const codeClean = input.couponCode.trim().toUpperCase();
      try {
        if (process.env.DATABASE_URL) {
          const dbCoupon = await prisma.coupon.findUnique({
            where: { code: codeClean },
          });
          if (dbCoupon && dbCoupon.isActive) {
            const minOrder = dbCoupon.minOrderAmount ? Number(dbCoupon.minOrderAmount) : 0;
            const notExpired = !dbCoupon.expiresAt || new Date(dbCoupon.expiresAt) > new Date();
            if (calculatedSubtotal >= minOrder && notExpired) {
              const percent = Number(dbCoupon.discountPercent) / 100;
              discountAmount = parseFloat((calculatedSubtotal * percent).toFixed(2));
              prisma.coupon.update({
                where: { id: dbCoupon.id },
                data: { usageCount: { increment: 1 } },
              }).catch(() => {});
            }
          }
        }
      } catch {
        // Fallback
      }

      // Default fallback if DB is offline
      if (discountAmount === 0 && codeClean === "SULSON10") {
        discountAmount = parseFloat((calculatedSubtotal * 0.1).toFixed(2));
      }
    }

    // Shipping calculation:
    // France: 10.00 € (Offert dès 45 € d'achat)
    // Europe (hors France): 14.00 € (Réduit à 4.00 € dès 45 € et Offert dès 60 €)
    const countryNormalized = (input.shippingCountry || "France").trim().toLowerCase();
    const isFrance = countryNormalized === "france" || countryNormalized === "fr" || countryNormalized === "";

    let shippingCost = isFrance ? 10.00 : 14.00;
    if (isFrance) {
      if (calculatedSubtotal >= 45.00) {
        shippingCost = 0.00;
      }
    } else {
      if (calculatedSubtotal >= 60.00) {
        shippingCost = 0.00;
      } else if (calculatedSubtotal >= 45.00) {
        shippingCost = 4.00;
      }
    }

    const totalAmount = parseFloat(Math.max(0, calculatedSubtotal - discountAmount + shippingCost).toFixed(2));

    const orderNumber = `SUL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderResponseModel = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      orderNumber,
      customerName: input.customerName.trim(),
      customerEmail: input.customerEmail.trim().toLowerCase(),
      subtotal: calculatedSubtotal,
      shippingCost,
      discountAmount,
      totalAmount,
      status: "PENDING",
      paymentStatus: "UNPAID",
      items: validatedItems,
      createdAt: new Date().toISOString(),
    };

    // Save in runtime cache
    runtimeOrders.set(newOrder.id, newOrder);
    runtimeOrders.set(newOrder.orderNumber, newOrder);

    // Save in Prisma DB if available
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        const createdDbOrder = await prisma.order.create({
          data: {
            orderNumber: newOrder.orderNumber,
            customerName: newOrder.customerName,
            customerEmail: newOrder.customerEmail,
            customerPhone: input.customerPhone || null,
            shippingStreet: input.shippingStreet || "N/A",
            shippingCity: input.shippingCity || "N/A",
            shippingPostal: input.shippingPostal || "N/A",
            shippingCountry: input.shippingCountry || "France",
            subtotal: newOrder.subtotal,
            shippingCost: newOrder.shippingCost,
            discountAmount: newOrder.discountAmount,
            totalAmount: newOrder.totalAmount,
            status: "PENDING",
            paymentStatus: "UNPAID",
            paymentMethod: "stripe",
            items: {
              create: validatedItems.map((item) => ({
                productName: item.productName,
                formatLabel: item.formatLabel,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
              })),
            },
          },
        });
        if (createdDbOrder) {
          newOrder.id = createdDbOrder.id;
        }
      }
    } catch (dbErr) {
      console.warn("Prisma order persistence failed (fallback to runtime cache):", dbErr);
    }

    return newOrder;
  }

  static async getOrderById(id: string): Promise<OrderResponseModel | null> {
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        const dbOrder = await prisma.order.findFirst({
          where: {
            OR: [
              { id },
              { orderNumber: id },
              { stripeSessionId: id },
              { stripePaymentId: id },
            ],
          },
          include: {
            items: true,
          },
        });

        if (dbOrder) {
          return {
            id: dbOrder.id,
            orderNumber: dbOrder.orderNumber,
            customerName: dbOrder.customerName,
            customerEmail: dbOrder.customerEmail,
            subtotal: Number(dbOrder.subtotal),
            shippingCost: Number(dbOrder.shippingCost),
            discountAmount: Number(dbOrder.discountAmount),
            totalAmount: Number(dbOrder.totalAmount),
            status: dbOrder.status as any,
            paymentStatus: dbOrder.paymentStatus as any,
            items: dbOrder.items.map((i) => ({
              productId: i.productId || "SUL-301",
              productName: i.productName,
              formatLabel: i.formatLabel,
              quantity: i.quantity,
              unitPrice: Number(i.unitPrice),
              totalPrice: Number(i.totalPrice),
            })),
            createdAt: dbOrder.createdAt.toISOString(),
          };
        }
      }
    } catch (err) {
      console.warn("Prisma getOrderById failed, falling back to cache:", err);
    }
    return runtimeOrders.get(id) || null;
  }

  static async markOrderPaid(orderIdOrNumber: string, stripePaymentId?: string): Promise<OrderResponseModel | null> {
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        const updated = await prisma.order.updateMany({
          where: {
            OR: [
              { id: orderIdOrNumber },
              { orderNumber: orderIdOrNumber },
              { stripeSessionId: orderIdOrNumber },
              { stripePaymentId: orderIdOrNumber },
            ],
          },
          data: {
            status: "PAID",
            paymentStatus: "PAID",
            stripePaymentId: stripePaymentId || undefined,
          },
        });
        if (updated.count > 0) {
          return this.getOrderById(orderIdOrNumber);
        }
      }
    } catch (err) {
      console.warn("Prisma markOrderPaid failed, updating runtime cache:", err);
    }

    const order = runtimeOrders.get(orderIdOrNumber);
    if (!order) return null;

    order.paymentStatus = "PAID";
    order.status = "PAID";
    return order;
  }

  static async markOrderFailed(orderIdOrNumber: string): Promise<void> {
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        await prisma.order.updateMany({
          where: {
            OR: [
              { id: orderIdOrNumber },
              { orderNumber: orderIdOrNumber },
              { stripeSessionId: orderIdOrNumber },
            ],
          },
          data: {
            paymentStatus: "FAILED",
          },
        });
      }
    } catch (err) {
      console.warn("Prisma markOrderFailed error:", err);
    }

    const order = runtimeOrders.get(orderIdOrNumber);
    if (order) {
      order.paymentStatus = "FAILED";
    }
  }

  static async updatePaymentIntent(orderId: string, paymentIntentId: string): Promise<void> {
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        await prisma.order.updateMany({
          where: { id: orderId },
          data: {
            stripePaymentId: paymentIntentId,
            stripeSessionId: paymentIntentId,
          },
        });
      }
    } catch (err) {
      console.warn("Prisma updatePaymentIntent error:", err);
    }
  }

  static async listOrders(): Promise<OrderResponseModel[]> {
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        const dbOrders = await prisma.order.findMany({
          include: {
            items: true,
          },
          orderBy: { createdAt: "desc" },
          take: 50,
        });

        if (dbOrders && dbOrders.length > 0) {
          return dbOrders.map((o) => ({
            id: o.id,
            orderNumber: o.orderNumber,
            customerName: o.customerName,
            customerEmail: o.customerEmail,
            subtotal: Number(o.subtotal),
            shippingCost: Number(o.shippingCost),
            discountAmount: Number(o.discountAmount),
            totalAmount: Number(o.totalAmount),
            status: o.status as any,
            paymentStatus: o.paymentStatus as any,
            items: o.items.map((i) => ({
              productId: i.productId || "SUL-301",
              productName: i.productName,
              formatLabel: i.formatLabel,
              quantity: i.quantity,
              unitPrice: Number(i.unitPrice),
              totalPrice: Number(i.totalPrice),
            })),
            createdAt: o.createdAt.toISOString(),
          }));
        }
      }
    } catch (err) {
      console.warn("Prisma listOrders failed, falling back to runtime cache:", err);
    }

    const uniqueOrders = new Set(runtimeOrders.values());
    return Array.from(uniqueOrders);
  }
}
