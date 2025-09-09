import axios from "@/lib/axios";
import {Product} from "@/../utility/ProductsInterfce"

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get("/getNewProducts", {
      headers: { 'Cache-Control': 'no-store' }, 
    });

    return response.data.products || [];
  } catch (error) {
    console.error('❌ Failed to fetch the products:', error);
    return [];
  }
}
