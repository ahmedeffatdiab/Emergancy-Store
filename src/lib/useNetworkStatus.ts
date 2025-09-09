import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);

      if (!online) {
        toast.warning("⚠️ You are offline. Some features may not work.");
      } else {
        toast.success("✅ You are back online!");
      }
    };

    updateStatus(); // Initial check

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return isOnline;
}
