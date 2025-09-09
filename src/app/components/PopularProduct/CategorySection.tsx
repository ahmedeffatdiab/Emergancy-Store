'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '../../../../utility/ProductsInterfce';

interface Props {
  title: string;
  products: Product[];
  loading: boolean;
}

const CategorySection = ({ title, products, loading }: Props) => {
  return (
    <div className="shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <p key={index}>Loading ......</p>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="space-y-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No data found</div>
      )}

      {!loading && products.length > 0 && (
        <div className="text-center mt-4">
          <Link href={`/categoryList/${title}`}>
            <button className="text-blue-600 hover:underline cursor-pointer">Show all →</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
