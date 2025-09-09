"use client";

import Link from "next/link";
import CartRow from "./CartRow";
import { useCartLogic } from "../../../../utility/cartLogic";
import { CartItem } from "../../../../utility/cart";
import { Button } from "@/components/ui/button";

interface Props {
  items: CartItem[];
  total: number;
  token: string;
  refresh: () => void;
}

export default function CartTable({ items, total, token, refresh }: Props) {
  const {
    modifiedItems,
    updatedQuantities,
  } = useCartLogic(items, token, refresh);

  return (
    <>
      <table className="w-full border border-separate border-spacing-y-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-center px-4 py-2">#</th>
            <th className="text-center px-4 py-2">Name</th>
            <th className="text-center px-4 py-2">Price</th>
            <th className="text-center px-4 py-2">Quantity</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const qty = updatedQuantities[item.id] ?? item.quantity;
            return (
              <CartRow key={idx} index={idx} item={item} quantity={qty} isModified={!!modifiedItems[item.id]} />
              );
          })}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <Link href="/checkout" >
          <Button className="cursor-pointer">Checkout ${total}</Button>
        </Link>
      </div>
    </>
  );
}
