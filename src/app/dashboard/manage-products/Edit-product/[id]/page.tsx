'use client';
import { useEffect, useState, useCallback } from "react";
import { getProduct } from "@/../utility/ProductsApi";
import { Product } from "@/../utility/ProductsInterfce";
import { useParams } from "next/navigation";
import Image from "next/image";
import { usePurchaseAlert } from "@/context/PurchaseAlertContext";
import api from "@/lib/axios";

type ReplacedImages = (File | null)[];

const EditProductClient = () => {
  const params = useParams();
  const id = params.id as string;
  const { showPurchaseAlert } = usePurchaseAlert();

  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [replacedImages, setReplacedImages] = useState<ReplacedImages>([]);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProduct(id);
      setProductData(data);
      setLoading(false);
    } catch (err: unknown) {
      setError("Failed to load product");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReplacedImages((prev) => {
      const newReplacedImages = [...prev];
      newReplacedImages[index] = file;
      return newReplacedImages;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (productData) {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !productData) return <p>{error}</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", productData.title);
    formData.append("category", productData.category);
    formData.append("datialOfProduct", productData.datialOfProduct);
    formData.append("price", String(productData.price));
    formData.append("discount", String(productData.discount));

    const indexes = Object.keys(replacedImages);
    indexes.forEach((index) => {
      const image = replacedImages[parseInt(index)];
      if (image) {
        formData.append("images", image);
      }
    });

    formData.append("imageIndexes", JSON.stringify(indexes));

    try {
       await api.post(`/edit-products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      });
      showPurchaseAlert("👍 Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      showPurchaseAlert("⚠️ Product update failed!");
    }
  };

  return (
    <div className="p-6 w-3/4 shadow-gray-400 mx-auto rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit product</h1>
      <form onSubmit={handleSubmit} className="space-y-3 w-full mx-auto rounded-lg">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Product Title </label>
          <input id="title" name="title" value={productData.title} onChange={handleInputChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter product title" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700"> Category</label>
          <input id="category" name="category" value={productData.category} onChange={handleInputChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter product category" />
        </div>
        <div>
          <label htmlFor="datialOfProduct" className="block text-sm font-medium text-gray-700"> Details of Product </label>
          <textarea id="datialOfProduct" name="datialOfProduct" value={productData.datialOfProduct} onChange={handleInputChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter product details"/>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700"> Price </label>
          <input id="price" type="number" name="price" value={productData.price} onChange={handleInputChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter price" />
        </div>
        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700"> Discount </label>
          <input id="discount" type="number" name="discount" value={productData.discount} onChange={handleInputChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter discount"/>
        </div>
        <div className="mb-3 flex flex-wrap gap-3">
          {productData?.imageUrls?.map((url, index) => (
            <div key={index} className="relative">
              <label htmlFor={`image-${index}`} className="cursor-pointer">
                <Image src={ replacedImages[index] ? URL.createObjectURL(replacedImages[index] as File) : url }
                  alt={`product-${index}`} width={100} height={100} className="rounded object-cover border border-gray-300" />
              </label>
              <input id={`image-${index}`} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, index)} />
            </div>
          ))}
        </div>
        <button type="submit" className="px-6 py-2 bg-gray-600 cursor-pointer text-white rounded-md hover:bg-blue-600 focus:outline-none" >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductClient;
