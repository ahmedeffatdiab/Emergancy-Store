"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "./authContext"; 
import api from "@/lib/axios";
interface LovedProduct {
  _id: string;
}


interface LoveContextType {
  userLoveCount: number;
  userLoveObj: LovedProduct[];
  getUserLoves: () => Promise<string | void>;
  addLove: (id: string) => Promise<string | false>;
}

const LoveContext = createContext<LoveContextType | undefined>(undefined);

interface LoveProviderProps {
  children: ReactNode;
}

export const LoveProvider: React.FC<LoveProviderProps> = ({ children }) => {
  const [userLoveCount, setUserLove] = useState<number>(0);
  const [userLoveObj, setUserLoveObj] = useState<LovedProduct[]>([]);
  const { token } = useAuth();

  const fetchUserLoves = async (token: string): Promise<string | void> => {
    try {
      const res = await api.get("home/getUserLoves", {
        headers: {
          token: `Bearer ${token}`,
        },
      });

      const { status, message, lovedProducts, lengthdata } = res.data;

      if (status === 200) {
        setUserLove(lengthdata || 0);
        setUserLoveObj(lovedProducts || []);
        return message;
      } else {
        setUserLove(0);
        setUserLoveObj([]);
        return message || "Failed to fetch loved products";
      }
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 404) {
        // No loved products yet
        setUserLove(0);
        setUserLoveObj([]);
        return "No loved products yet.";
      }

      console.error("Error fetching user loves:", err);
      setUserLove(0);
      setUserLoveObj([]);
      return "Error connecting to server";
    }
  };
  const getUserLoves = async (): Promise<string | void> => {
    if (!token) return;
    return await fetchUserLoves(token);
  };

  const addLove = async (id: string): Promise<string | false> => {
    if (!token) return false;

    try {
      const res = await api.get(`/getLoveProduct/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });

      await fetchUserLoves(token);
      return res.data.message;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 400) {
        return "💖 Product is already in your Preferred List!";
      }

      console.error("Error adding love:", err);
      return false;
    }
  };
  useEffect(() => {
    if (token) {
    fetchUserLoves(token);
  } else {
    setUserLove(0);
    setUserLoveObj([]);
  }
  }, [token]);

  return (
    <LoveContext.Provider
      value={{
        userLoveCount,
        userLoveObj,
        getUserLoves,
        addLove,
      }}
    >
      {children}
    </LoveContext.Provider>
  );
};
export const useLove = () => {
  const context = useContext(LoveContext);
  if (!context) {
    throw new Error("useLove must be used within a LoveProvider");
  }
  return context;
};