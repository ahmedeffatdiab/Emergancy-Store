"use client";
import React, { useEffect, useState } from "react";
import { useLove } from "@/context/LoveContext";
import { Product } from "@/../utility/ProductsInterfce";
import Card from "@/app/components/Card";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

function CardsLoves() {
  const [lovedProducts, setLovedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { userLoveObj } = useLove();
  const router = useRouter();

  useEffect(() => {
    async function fetchLovedProducts() {
      let token: string | null = null;

      try {
        token = localStorage.getItem("userToken");
      } catch (err) {
        console.error("Error reading token from localStorage", err);
      }

      if (!token) {
        router.push("/login");
        return;
      }

      if (!Array.isArray(userLoveObj) || userLoveObj.length === 0) {
        return;
      }

      setLoading(true);

      try {
        const res = await api.post(
    "/loved-products",
    { productIds: userLoveObj },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );

        setLovedProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching loved products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLovedProducts();
  }, [userLoveObj, router]);

  return (
    <div className="px-4 md:px-8 py-6">
      <h2 className="text-2xl font-semibold underline mb-4">
        Loved Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : lovedProducts.length > 0 ? (
          lovedProducts.map((product, index) => (
            <Card key={index} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">
            No loved products to display.
          </p>
        )}
      </div>
    </div>
  );
}

export default CardsLoves;
