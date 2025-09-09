"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteProduct, getProducts } from "../../../../utility/ProductsApi";
import { useEffect, useState } from "react";
interface Product {
  _id: string;
  title: string;
  price: number;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("userToken");
    if (!token) return;
    setLoadingIds((prev) => [...prev, id]);
    await deleteProduct(id, token);
    setLoadingIds((prev) => prev.filter((i) => i !== id));
    await fetchData(); 
  };
  if (loading) return <p>Loading products...</p>;
  return (
    <table className="w-full table-auto border-separate border-spacing-y-2">
      <thead>
        <tr>
          <th>#</th>
          <th className="text-center w-2/4 whitespace-normal break-words">Title</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod, idx) => (
          <tr key={prod._id} className="text-center">
            <td>{idx + 1}</td>
            <td className="w-2/4 whitespace-normal break-words text-center">{prod.title}</td>
            <td>${prod.price}</td>
            <td className="space-x-2">
              <Link href={`/dashboard/manage-products/Edit-product/${prod._id}`}>
                <Button variant="default">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleDelete(prod._id)}
                disabled={loadingIds.includes(prod._id)}
              >
                {loadingIds.includes(prod._id) ? "Deleting..." : "Delete"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
