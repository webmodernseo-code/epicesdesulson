"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// 20 minutes of inactivity before auto-logout
const INACTIVITY_TIMEOUT_MS = 20 * 60 * 1000;
const TAB_SESSION_KEY = "sulson_admin_active_tab";
const LAST_ACTIVITY_KEY = "sulson_last_activity";

export default function AutoLogoutGuard() {
  const router = useRouter();
  const isLoggingOutRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check if this browser tab/window has an active validated session
    const isTabActive = sessionStorage.getItem(TAB_SESSION_KEY);

    if (!isTabActive) {
      // User closed the tab/browser earlier or opened a brand new window -> Auto logout & redirect
      isLoggingOutRef.current = true;
      fetch("/api/auth/logout", { method: "POST" })
        .catch(() => undefined)
        .finally(() => {
          sessionStorage.clear();
          localStorage.removeItem("userRole");
          window.location.replace("/signin");
        });
      return;
    }

    // Set or refresh initial activity timestamp
    sessionStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());

    // 2. Inactivity tracking
    let lastRecordedActivity = Date.now();

    const handleUserActivity = () => {
      if (isLoggingOutRef.current) return;
      const now = Date.now();
      // Throttle updates to sessionStorage to once every 3 seconds
      if (now - lastRecordedActivity > 3000) {
        lastRecordedActivity = now;
        sessionStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
      }
    };

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    // 3. Periodic timer checking for inactivity (every 5 seconds)
    const interval = setInterval(() => {
      if (isLoggingOutRef.current) return;

      const storedLastActivity = Number(
        sessionStorage.getItem(LAST_ACTIVITY_KEY) || Date.now()
      );
      const elapsed = Date.now() - storedLastActivity;

      if (elapsed >= INACTIVITY_TIMEOUT_MS) {
        isLoggingOutRef.current = true;
        sessionStorage.clear();
        localStorage.removeItem("userRole");

        fetch("/api/auth/logout", { method: "POST" })
          .catch(() => undefined)
          .finally(() => {
            window.location.replace("/signin");
          });
      }
    }, 5000);

    return () => {
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
      clearInterval(interval);
    };
  }, [router]);

  return null;
}
