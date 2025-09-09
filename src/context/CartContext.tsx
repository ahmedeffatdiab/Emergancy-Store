'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode,} from 'react';
import axios,{ AxiosError } from 'axios';
import { useAuth } from './authContext';
import { useRouter } from 'next/navigation';
import {CartType} from "@/../utility/cart"
import api from '@/lib/axios';

interface CartContextType {
  cart: CartType | null;
  cartNum: number;
  fetchCart: () => Promise<void>;
  addToCart: (id: string, title: string, price: number) => Promise<string | false>;
  loading: boolean;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth(); 
  const [cart, setCart] = useState<CartType | null>(null);
  const [cartNum, setCartNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  const fetchCart = async () => {
    if (!token) {
      setCart(null);
      setCartNum(0);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get("/home/getCart", {
        headers: {
          token: `Bearer ${token}`,
        },
    });
      const cartData = res.data?.userCart;
      if (cartData?.selectedProduct?.length > 0) {
        setCart(cartData);
        setCartNum(cartData.totalQuantity || 0);
      } else {
        setCart({ selectedProduct: [], totalPrice: 0, totalQuantity: 0 });
        setCartNum(0);
      }
    } catch (err) {
       const axiosError = err as AxiosError;
    if (axios.isAxiosError(axiosError) && axiosError.response?.status === 404) {
      // ✅ Treat 404 as empty cart
      setCart({ selectedProduct: [], totalPrice: 0, totalQuantity: 0 });
      setCartNum(0);
      return;
    }

    console.error('Error fetching cart:', err);
    setCart({ selectedProduct: [], totalPrice: 0, totalQuantity: 0 });
    setCartNum(0);
    } finally {
      setLoading(false);
    }
  };
   const addToCart = async (
    id: string,
    title: string,
    price: number
  ): Promise<string | false> => {
    const token=localStorage.getItem("userToken");
    if(!token){
      router.push("/login");
      return false;
    }

    try {
      const res = await api.get(`/home/buyProduct/${id}/${title}/${price}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      await fetchCart(); 
    
      return res.data.message;
    } catch (err) {
      console.error('Error adding to cart:', err);
      return false;
    }
  };
  useEffect(() => {
    fetchCart(); // Auto-fetch on mount or token change
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, cartNum, fetchCart, loading ,addToCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
