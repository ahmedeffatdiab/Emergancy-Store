import React from 'react'
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from '../../../utility/ProductsInterfce'
import Image from 'next/image';
import StarRating from '../../components/StarRanking/page';
import { Eye } from 'lucide-react';
import AddToCart from '../productDetails/AddToCart';
import AddLoveButton from '../components/AddLoveButton';

interface Props{
    product:Product;
}
const CardComponent = ({product}:Props) => {
      function truncateText(text:string) {
        if (text.length <= 15) {
            return text;
        } else {
            return text.substring(0, 15) + "...";
        }
    }
  return (
      <Card className=" my-6">
        {product?.imageUrls[0] ? (
      <Image width={400} height={200}
        src={product.imageUrls[0]}
        alt="product"
        className="object-contain h-[180px] w-auto"
      />
    ) : (
      <div className="flex justify-center items-center h-[200px]">
        <i className="fa-solid fa-spinner fa-spin text-gray-500 text-xl"></i>
      </div>
    )}

    <CardContent className="w-full space-y-3">
      <Link href={`/productDetails/${product._id}`}>
        <CardTitle className="text-base font-semibold hover:underline">
          {truncateText(product.title)}
        </CardTitle>
      </Link>

      <StarRating rating={product.rating} />

      <div className="text-sm text-muted-foreground">{product.category}</div>

      <div className="flex items-center space-x-2">
        {product.discount ? (
          <>
            <p className="text-primary font-bold">
              ${Math.ceil(product.price - (product.price * product.price) / 100)}
            </p>
            <p className="text-sm line-through text-gray-500">
              ${product.price}
            </p>
          </>
        ) : (
          <p className="text-primary font-bold">${product.price}</p>
        )}
      </div>
      <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <AddLoveButton product={product}/>
            <Link href={`/productDetails/${product._id}`} aria-label="Preview product">
              <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      <AddToCart _id={product._id} title={product.title} price={product.price}/>
    </CardContent>
  </Card>
  )
}

export default CardComponent
