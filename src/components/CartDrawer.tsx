'use client';

import { useCart } from '@/context/CartContext';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    incrementQuantity,
    decrementQuantity,
    clearCart, // ✅ Added clearCart
  } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform z-50 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={toggleCart} className="p-2 hover:bg-gray-200 rounded">
          <FiX size={20} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="ml-3 flex-1">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <p className="font-semibold mb-4">Total: ₹{totalPrice.toFixed(2)}</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toggleCart();
              router.push('/checkout');
            }}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Checkout
          </button>
          <button
            onClick={clearCart}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
