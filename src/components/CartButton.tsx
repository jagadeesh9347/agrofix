'use client';

import { useCart } from '@/context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

export function CartButton() {
  const { cart, toggleCart } = useCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition flex items-center justify-center"
    >
      <FiShoppingCart size={24} />
      {totalCount > 0 && (
        <span className="absolute top-1 right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalCount}
        </span>
      )}
    </button>
  );
}