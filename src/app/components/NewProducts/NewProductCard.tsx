"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ShoppingCart } from "lucide-react";
import StarRating from "../../../components/StarRanking/page";
import { useCart } from "@/context/CartContext";
import { usePurchaseAlert } from "@/context/PurchaseAlertContext";
import AddLoveButton from "../AddLoveButton";

interface Product {
  _id: string;
  title: string;
  price: number;
  discount?: number;
  rating?: number;
  imageUrls: string[];
  category: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { showPurchaseAlert } = usePurchaseAlert();

  const hasDiscount = product.discount !== undefined && product.discount > 0;

  const discountedPrice = hasDiscount
    ? (product.price - (product.price * product.discount!) / 100).toFixed(2)
    : null;

  const handleAddToCart =async () => {
    const res=await addToCart(product._id, product.title, product.price);
    if(res!=false){
      showPurchaseAlert("🎉 product added to cart!")
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-md border">
      <div className="relative group aspect-[4/3] overflow-hidden">
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 z-20 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </Badge>
        )}
        <Image src={product.imageUrls[0]} alt={product.title} fill className="object-cover transition-opacity duration-300 group-hover:opacity-0"/>
        <Image src={product.imageUrls[1] || product.imageUrls[0]} alt={`${product.title} alternate view`} fill
          className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"/>

        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-6 group-hover:translate-x-0 z-30">         
          <AddLoveButton product={product}/>

          <Link href={`/productDetails/${product._id}`} >
            <Button size="icon" variant="ghost" className="bg-white shadow cursor-pointer hover:bg-gray-100">
              <Eye className="w-4 h-4 text-gray-700"  />
            </Button>
          </Link>
          <Button onClick={handleAddToCart} size="icon" variant="ghost" className="bg-white cursor-pointer shadow hover:bg-gray-100" >
            <ShoppingCart className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-1">
        <p className="text-xs text-blue-500 uppercase">{product.category}</p>
        <h2 className="font-semibold text-sm text-gray-800 dark:text-white line-clamp-2">
          {product.title}
        </h2>
        <StarRating rating={product.rating ?? 0} />
        <div className="flex items-center gap-2">
          {hasDiscount && discountedPrice ? (
            <>
              <p className="text-red-600 font-semibold">${discountedPrice}</p>
              <p className="line-through text-sm text-gray-400 dark:text-gray-300">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-gray-800 dark:text-gray-300 font-semibold">
              ${product.price}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
