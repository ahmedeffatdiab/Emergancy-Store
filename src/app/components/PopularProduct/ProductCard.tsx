import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Product} from "../../../../utility/ProductsInterfce"
import StarRating from "../../../components/StarRanking/page";
import { useCart } from "@/context/CartContext";
import { usePurchaseAlert } from "@/context/PurchaseAlertContext";
import AddLoveButton from "../AddLoveButton";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  const {addToCart}=useCart();
  const {showPurchaseAlert}=usePurchaseAlert()
  const discountedPrice =
    item.discount && item.price
      ? Math.ceil(item.price - (item.price * item.discount) / 100)
      : null;

  const truncateTitle = (title: string) =>
    title.length > 20 ? `${title.slice(0, 20)}...` : title;
 const handleAddToCart = async() => {
    const res=await addToCart(item._id, item.title, item.price);
     if(res!=false){
      showPurchaseAlert("🎉 product added to cart!")
    }
  };
  return (
    <Card className="flex items-center flex-row gap-4 border-b pb-4 hover:shadow-md transition-shadow" aria-label={`Product card for ${item.title}`} >
    <Link href={`/cardItem/${item._id}`} className="w-2/4" aria-label={`View details for ${item.title}`}>
      <div className="relative h-[140px] w-[93%] mx-auto overflow-hidden rounded flex items-center justify-center">
        <Image src={item.imageUrls[0]} alt={item.title} fill className="object-contain" loading="lazy"/>
      </div>
    </Link>

      <CardContent className="flex-1 flex flex-col justify-between p-0 space-y-2">
        <div>
          <h4 className="font-medium text-sm line-clamp-2 text-gray-800 dark:text-white">
            {truncateTitle(item.title)}
          </h4>
          <p className="text-xs text-gray-400">{item.category}</p>
          <StarRating rating={item.rating} />

          <div className="mt-1 space-x-2">
            {discountedPrice !== null ? (
              <>
                <span className="text-sm font-bold text-red-600">
                  ${discountedPrice}
                </span>
                <span className="line-through text-xs text-gray-500">
                  ${item.price}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold">${item.price}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <AddLoveButton product={item}/>
            <Link href={`/productDetails/${item._id}`} aria-label="Preview product">
              <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Button onClick={handleAddToCart} className="mt-2 hover:cursor-pointer hover:bg-gray-700 w-fit gap-2 text-xs" variant="default" aria-label="Add to cart" >
          Add to <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
