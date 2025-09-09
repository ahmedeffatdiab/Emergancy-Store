import React from 'react';
import { getRecommendedProducts } from '../../../utility/ProductsApi';
import { Product } from "../../../utility/ProductsInterfce";
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '../../components/StarRanking/page';
import { Eye} from 'lucide-react';
import AddToCart from './AddToCart';
import AddLoveButton from '../components/AddLoveButton';
interface Props {
  categ: string;
  title: string;
}
const RecommendedProducts = async ({ categ, title }: Props) => {
  const recommendedProducts: Product[] = await getRecommendedProducts(categ, title);
  const truncateText = (text:string) => {
    return text.length <= 25 ? text : text.substring(0, 25) + '...';
  };
  return (
    <div>
      <div className="py-6">
        <h1 id="new-products-heading" className="font-arial text-xl font-bold mb-2">Recommanded Products</h1>
        <hr className="border-t-3 dark:bg-white border-gray-300" />
      </div>

      <div>
        {recommendedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts.map((ele, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300" >
              {ele?.imageUrls?.[0] ? (
                <div className="h-[200px] w-full flex justify-center items-center overflow-hidden rounded-t-lg pt-4">
                  <Image src={ele.imageUrls[0]} alt={ele.title} width={200} height={200} className="object-contain h-[180px] w-auto" />
                </div>
              ) : (
                <div className="flex justify-center items-center h-[200px]">
                  <i className="fa-solid fa-spinner fa-spin text-gray-500"></i>
                </div>
              )}

              <div className="p-4 ">
                <Link href={`/productDetails/${ele._id}`}>
                  <h5 className="text-md font-semibold text-gray-900 hover:underline">
                    {truncateText(ele.title)}
                  </h5>
                </Link>
                <div className='my-2'>
                  <StarRating  rating={ele.rating}  />
                </div>
                <p className="text-sm text-gray-600">{ele.category}</p>
                <div className="mt-2">
                  {ele.discount && ele.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-red-600">
                        ${Math.ceil(ele.price - (ele.price * ele.discount) / 100)}
                      </p>
                      <del className="text-sm text-gray-500">${ele.price}</del>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-gray-800">${ele.price}</p>
                  )}
                </div>
                <div>
                  <AddLoveButton product={ele}/>
                  <Link href={`/productDetails/${ele._id}`} aria-label="View product">
                    <button className="bg-white p-2 rounded mx-2 h-8 w-8  shadow hover:bg-gray-100">
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                  </Link>
                </div>
                <AddToCart _id={ele._id} title={ele.title} price={ele.price} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No available data</p>
      )}
    </div>
    </div>
  );
};

export default RecommendedProducts;
