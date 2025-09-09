import axios from "@/lib/axios";
import {Product} from "@/../utility/ProductsInterfce"
export async function getProduct(id: string): Promise<Product> {
  try {
    const res = await axios.get(`/getProductById/${id}`, {
      headers: {
        "Cache-Control": "no-store", 
      },
    });

    if (!res.data?.data) {
      throw new Error("Product not found");
    }

    return res.data.data as Product;
  } catch (error) {
    console.error("❌ Failed to fetch product:", error);
    throw new Error("Unable to fetch product");
  }
}

export async function getRecommendedProducts(
  categ: string,
  title: string
): Promise<Product[]> {
  try {
    const res = await axios.get(`/getDataByQuery/${categ}`);

    const currentTitle = (title ?? '').trim().toLowerCase();

    const filtered = res.data.data.filter(
      (item: Product) => item.title.trim().toLowerCase() !== currentTitle
    );

    const uniqueByTitle = filtered.filter(
      (item: Product, index: number, self: Product[]) =>
        index ===
        self.findIndex(
          (t) => t.title.trim().toLowerCase() === item.title.trim().toLowerCase()
        )
    );

    const sorted = uniqueByTitle
      .sort((a: Product, b: Product) => b.rating - a.rating)
      .slice(0, 4);

    return sorted;
  } catch (error) {
    console.error("❌ Failed to fetch recommended products:", error);
    return [];
  }
}

export async function getProductsByQuery(query: string): Promise<Product[]> {
  try {
    const res = await axios.get(`/getDataByQuery/${query}`);
    return res.data.data as Product[];
  } catch (error) {
    console.error("❌ Failed to fetch products by query:", error);
    return [];
  }
}

export async function getProducts() {
  try {
    const res = await axios.get("/getProducts");
    return res.data.data as Array<{ _id: string; title: string; price: number }>;
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return [];
  }
}

export async function deleteProduct(id: string, token: string): Promise<void> {
  try {
    await axios.get(`/deleteProduct/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("❌ Failed to delete product:", error);
    throw error;
  }
}