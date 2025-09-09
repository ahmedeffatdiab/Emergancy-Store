import axios from 'axios';
import { Product } from '../../../../utility/ProductsInterfce';
export interface CategoryData {
  clothes: Product[];
  shoes: Product[];
  accessories: Product[];
}

export async  function getMinimalProducts(): Promise<CategoryData> {
  try {
    const [clothesRes, shoesRes, accessoriesRes] = await Promise.all([
      axios.get('https://emergancy-api-kqk9.vercel.app/getDataByQuery/Clothes'),
      axios.get('https://emergancy-api-kqk9.vercel.app/getDataByQuery/Shoes'),
      axios.get('https://emergancy-api-kqk9.vercel.app/getDataByQuery/Accessories'),
    ]);

    return {
      clothes: clothesRes.data.data || clothesRes.data,
      shoes: shoesRes.data.data || shoesRes.data,
      accessories: accessoriesRes.data.data || accessoriesRes.data,
    };
  } catch (error) {
    console.error('Failed to fetch minimal products:', error);
    return {
      clothes: [],
      shoes: [],
      accessories: [],
    };
  }
}
