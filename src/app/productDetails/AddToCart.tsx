"use client"
import React from 'react';
import { useCart } from '@/context/CartContext'
import { usePurchaseAlert } from '@/context/PurchaseAlertContext';
import { ShoppingCart } from 'lucide-react';
interface AddToCartType{
    _id:string,
    title:string,
    price:number
}
const AddToCart = ({_id,title,price}:AddToCartType) => {
    const {addToCart}=useCart();
    const {showPurchaseAlert}=usePurchaseAlert();
    const handleAddToCart = async() => {
    const res=await addToCart(_id, title, price);
    if(res!=false){
      showPurchaseAlert("🎉 product added to cart!")
    }
  };
  return (
    <button onClick={handleAddToCart}
        className="px-6 flex items-center gap-x-2 py-2 bg-blue-600 text-white rounded hover:cursor-pointer hover:bg-blue-700 mt-4">
        Add to <ShoppingCart/>
    </button>
  )
}

export default AddToCart
