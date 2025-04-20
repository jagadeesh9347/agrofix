'use client';

import { useCart } from '@/context/CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-32 w-full object-cover rounded-xl mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">₹{product.price}</p>
      <button
        className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
