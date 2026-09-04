// Zero-Dependency Notification Toast Helper for Epices de Sulson
export const toast = {
  success: (msg: string) => {
    if (typeof window !== "undefined") {
      // In-browser visual feedback or notification
      console.log("✅ [Sulson Notification] " + msg);
    }
  },
  error: (msg: string) => {
    if (typeof window !== "undefined") {
      console.warn("⚠️ [Sulson Alerte] " + msg);
    }
  },
  info: (msg: string) => {
    if (typeof window !== "undefined") {
      console.info("ℹ️ [Sulson Info] " + msg);
    }
  },
};
