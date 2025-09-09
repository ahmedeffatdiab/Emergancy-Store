"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "../../../../utility/cart";
import { useCart } from "@/context/CartContext";
import api from "@/lib/axios";

interface Props {
  index: number;
  item: CartItem;
  quantity: number;
  isModified: boolean;
}

export default function CartRow({index,item,quantity: initialQuantity,isModified,}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [modified, setModified] = useState(isModified);
  const {fetchCart}=useCart()

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    setModified(true);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setModified(true);
    }
  };

   async function saveProductChange() {
    
    console.log("Saving product", item.id, quantity);
    try {
      const res = await api.get(`/saveProductChange/${item.id}/${quantity}`, {
        headers: {
          token: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      if (res.data.message === 'Product quantity updated successfully') {
        fetchCart();
      }
    } catch (error) {
      console.error('Failed to save product changes:', error);
    }
  }
  const deleteOrder=async(productId:string)=>{
    try {
      const res = await api.get(`/deleteProductfromCart/${productId}`, {
  headers: {
    token: `Bearer ${localStorage.getItem('userToken')}`,
  },
});
      if (
        res.data.message === "Product removed successfully") {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }

  return (
    <tr className="my-5">
      <td className="px-4 py-3 text-center">{index + 1}</td>
      <td className="px-4 py-3 text-center">{item.name}</td>
      <td className="px-4 py-3 text-center">${item.price}</td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={decreaseQuantity} disabled={quantity <= 1}>
            -
          </Button>
          <span>{quantity}</span>
          <Button size="sm" onClick={increaseQuantity}>
            +
          </Button>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex gap-2">
          <Button onClick={()=>deleteOrder(item.id)} variant="destructive" size="sm">
            Delete
          </Button>
          <Button onClick={saveProductChange} size="sm" disabled={!modified || quantity === item.quantity}>
            Save
          </Button>
        </div>
      </td>
    </tr>
  );
}
