
import api from "@/lib/axios";
import {AxiosError} from "axios";

export async function fetchProductsCount(): Promise<number> {
  try {
    const res = await api.get("/getProducts");
    return res.data.dataLength ?? 0;
  } catch (error) {
    console.error("❌ Failed to fetch product count:", error);
    return 0;
  }
}

export async function fetchUsersCount(): Promise<number> {
  try {
    const res = await api.get("/auth/getUsersNumber");
    return res.data.length ?? 0;
  } catch (error) {
    console.error("❌ Failed to fetch users count:", error);
    return 0;
  }
}

export async function fetchOrders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  if (!token) return [];

  try {
    const res = await api.get("/getOrders", {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    return res.data.data || [];
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 404) {
      console.warn("No orders found (404 returned by API).");
      return [];
    }

    console.error("Error fetching orders:", err.message);
    return [];
  }
}