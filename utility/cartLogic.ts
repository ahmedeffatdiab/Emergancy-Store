"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios"; 

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const fetchCart = async (token: string) => {
  const { data } = await api.get("/getUserCart", {
    headers: { token: `Bearer ${token}` },
  });

  return data.cart as { selectedProduct: CartItem[]; totalPrice: number };
};

export const updateProductQuantity = async (productId: string, quantity: number, token: string) => {
  return api.get(`/saveProductChange/${productId}/${quantity}`, {
    headers: { token: `Bearer ${token}` },
  });
};
export const deleteProduct = async (productId: string, token: string) => {
  return api.get(`/deleteProductfromCart/${productId}`, {
    headers: { token: `Bearer ${token}` },
  });
};
export const useCartLogic = (cartItems: CartItem[], token: string, refresh: () => void) => {
  const [modifiedItems, setModifiedItems] = useState<Record<string, boolean>>({});
  const [updatedQuantities, setUpdatedQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setUpdatedQuantities(initialQuantities);
    setModifiedItems({});
  }, [cartItems]);

  const increaseQuantity = (productId: string, currentQuantity: number) => {
    setUpdatedQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? currentQuantity) + 1,
    }));
    setModifiedItems((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const decreaseQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity <= 1) return;
    setUpdatedQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? currentQuantity) - 1,
    }));
    setModifiedItems((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const saveChanges = async (id: string, qty: number) => {
    await updateProductQuantity(id, qty, token);
    refresh();
  };

  const removeProduct = async (id: string) => {
    await deleteProduct(id, token);
    refresh();
  };

  return {
    modifiedItems,
    updatedQuantities,
    increaseQuantity,
    decreaseQuantity,
    saveChanges,
    removeProduct,
  };
};
