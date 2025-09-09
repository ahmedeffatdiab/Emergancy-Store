"use client";

import { useNetworkStatus } from "@/lib/useNetworkStatus";

export default function NetworkListener() {
  useNetworkStatus(); 
  return null;
}
