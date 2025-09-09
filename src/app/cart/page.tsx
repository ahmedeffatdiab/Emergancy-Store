'use client';
import React from 'react';
import EmptyCartAlert from '../../app/components/cart/EmptyCartAlert';
import CartTable from '../../app/components/cart/CartTable';
import LoginPage from '../login/page';
import { useCart } from '@/context/CartContext';
import { CartItem } from '../../../utility/cart';
import ProtectedRoute from '../components/ProtectedRoute';

const Page = () => {
  const { cart, loading, fetchCart } = useCart();

  if (loading && !cart) return <div>Loading...</div>;
  if (!cart) return <LoginPage />;
  if (cart.selectedProduct.length === 0) return <EmptyCartAlert />;

  const items: CartItem[] = cart.selectedProduct.map((p) => ({
    id: p._id,
    name: p.name,
    price: p.price,
    quantity: p.quantity,
  }));

  return (
    <ProtectedRoute>
      <div className="container py-4 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Products Bought</h2>
        <CartTable
          items={items}
          total={cart.totalPrice}
          token="" 
          refresh={fetchCart}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
