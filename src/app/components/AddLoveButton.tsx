'use client';
import { Button } from '@/components/ui/button';
import { useLove } from '@/context/LoveContext';
import { usePurchaseAlert } from '@/context/PurchaseAlertContext';
import React from 'react';
import { Product } from '../../../utility/ProductsInterfce';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AddLoveProps {
  product: Pick<Product, '_id'>;
}

const AddLoveButton = ({ product }: AddLoveProps) => {
  const { showPurchaseAlert } = usePurchaseAlert();
  const { addLove } = useLove();
  const router = useRouter();

  const handleAddLove = async () => {
    console.log("💖 Add to Love clicked");
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const message = await addLove(product._id);
    if (typeof message === 'string') {
        showPurchaseAlert(message);
    }
  };

  return (
    <Button
      onClick={handleAddLove}
      size="icon"
      variant="ghost"
      className="bg-white shadow h-8 w-8 cursor-pointer hover:bg-gray-100"
    >
      <Heart className="w-4 h-4 text-gray-700" />
    </Button>
  );
};

export default AddLoveButton;
