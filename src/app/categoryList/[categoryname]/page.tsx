import React from 'react';
import { Product } from '../../../../utility/ProductsInterfce';
import { getProductsByQuery } from '../../../../utility/ProductsApi';
import Card from '../../components/Card';
export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ categoryname: string }>;
};

export default async function Page({ params }: PageProps) {
  const { categoryname } = await params;
  
  const decoded = decodeURIComponent(categoryname);
  const products: Product[] = await getProductsByQuery(decoded);

  return (
    <div className="container mx-auto px-4 py-6">
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-4">
          {products.map((product, idx) => (
            <Card product={product} key={idx} />
          ))}
        </div>
      ) : (
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-gray-500 bg-red-100 p-3 rounded text-lg">
            No products found.
          </p>
        </div>
      )}
    </div>
  );
}
