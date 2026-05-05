"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return;
    }

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw", { scope: "/" });
        void registration.update();
      } catch {
        return;
      }
    };

    if (document.readyState === "complete") {
      void register();
      return;
    }

    const handleLoad = () => {
      void register();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}
