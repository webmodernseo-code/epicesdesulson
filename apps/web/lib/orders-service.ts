// Orders Domain Service for Les Épices de Sulson
import { ProductsService } from "./products-service";

export interface CreateOrderItemInput {
  productId: string;
  formatLabel: string;
  quantity: number;
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
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "UNPAID" | "PENDING" | "PAID" | "FAILED";
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
        !input.shippingStreet?.trim() || !input.shippingCity?.trim() || !input.shippingPostal?.trim()) {
      throw new Error("Les coordonnées de livraison sont incomplètes.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.customerEmail.trim())) {
      throw new Error("L'adresse email est invalide.");
    }

    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of input.items) {
      // Always verify prices on the server side (never trust client payload)
      if (typeof item.productId !== "string" || typeof item.formatLabel !== "string") {
        throw new Error("Article invalide.");
      }
      const rawId = item.productId.match(/^(SUL-\d+|\d+)/i)?.[1] || item.productId;
      const product = await ProductsService.getProductById(rawId);
      if (!product) {
        throw new Error(`Produit introuvable (ID: ${item.productId})`);
      }

      const selectedFormat = product.formats.find((format) => format.label.toLowerCase() === item.formatLabel.toLowerCase());
      if (!selectedFormat) throw new Error(`Format invalide pour ${product.title}.`);
      const unitPrice = selectedFormat.price;
      const quantity = Math.floor(Number(item.quantity));
      if (!Number.isFinite(quantity) || quantity < 1 || quantity > 99) {
        throw new Error("La quantité doit être comprise entre 1 et 99.");
      }
      const rowTotal = parseFloat((unitPrice * quantity).toFixed(2));

      calculatedSubtotal += rowTotal;
      validatedItems.push({
        productId: product.code,
        productName: product.title,
        formatLabel: item.formatLabel || "50g",
        quantity,
        unitPrice,
        totalPrice: rowTotal,
      });
    }

    // Discount Calculation (SULSON10 = -10%)
    let discountAmount = 0;
    if (input.couponCode && input.couponCode.trim().toUpperCase() === "SULSON10") {
      discountAmount = parseFloat((calculatedSubtotal * 0.1).toFixed(2));
    }

    // Free shipping over 50 EUR
    const shippingCost = calculatedSubtotal >= 50 ? 0 : 4.90;
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
