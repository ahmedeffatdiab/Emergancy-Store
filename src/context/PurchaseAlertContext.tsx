"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { X } from 'lucide-react';

interface AlertContextType {
  showPurchaseAlert: (message?: string) => void;
}

const PurchaseAlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const PurchaseAlertProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // triggers animation reset
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const showPurchaseAlert = (
    message = "✅ Product purchased successfully!"
  ) => {
    setAlertMessage(message);
    setVisible(true);
    setProgressKey((prev) => prev + 1); // restart animation

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
   const hideAlert = () => {
    // if (timeoutId) clearTimeout(timeoutId);
    setVisible(false);
  };

  return (
    <PurchaseAlertContext.Provider value={{ showPurchaseAlert }}>
    {children}

      {visible && (
        <div className="fixed top-4 right-4 z-50 max-w-[90vw] bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity animate-fade-in-out overflow-hidden inline-flex items-center space-x-2">
          <p className="my-2 whitespace-nowrap">{alertMessage}</p>

          <button
            onClick={hideAlert}
            className="text-black font-medium text-xl hover:text-gray-200"
            aria-label="Close"
          >
            <X />
          </button>

          <div
            key={progressKey}
            className="absolute bottom-0 left-0 w-full h-[4px] bg-white animate-progress-bar"
          />
        </div>
      )}    
    </PurchaseAlertContext.Provider>
  );
};

export const usePurchaseAlert = () => {
  const context = useContext(PurchaseAlertContext);
  if (!context) {
    throw new Error(
      "usePurchaseAlert must be used within PurchaseAlertProvider"
    );
  }
  return context;
};
