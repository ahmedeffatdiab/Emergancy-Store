import { getProduct } from '../../../../utility/ProductsApi';
import { Product } from '../../../../utility/ProductsInterfce';

import RecommendedProducts from '../RecommendedProducts';
import ImageZoom from '../ImageZoom';
import AddToCart from '../AddToCart';
import AddLoveButton from '@/app/components/AddLoveButton';
import ProductReviews from '../ProductReviews';

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const product: Product = await getProduct(decodedId);

  return (
    <section className="container mx-auto">
      <div>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="w-full md:w-1/2">
            <ImageZoom product={product} />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-2xl font-semibold text-blue-600">{product.title}</p>
            <p className="text-gray-700">{product.datialOfProduct}</p>
            <span className="inline-block px-3 py-1 text-sm text-white bg-gray-700 rounded">
              {product.category}
            </span>
            <div className="text-yellow-400 text-4xl">
              {'★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)}
            </div>
            <div className="flex items-center space-x-4 text-xl font-semibold">
              {product.discount ? (
                <>
                  <span className="text-red-600">
                    ${Math.ceil(product.price - (product.price * product.discount) / 100)}
                  </span>
                  <del className="text-gray-500 text-lg">${product.price}</del>
                </>
              ) : (
                <span className="text-gray-800">${product.price}</span>
              )}
            </div>

            <AddLoveButton product={product} />
            <AddToCart title={product.title} _id={product._id} price={product.price} />
            <ProductReviews product={product} />
          </div>
        </div>
        <RecommendedProducts categ={product.category} title={product.title} />
      </div>
    </section>
  );
};

export default Page;
