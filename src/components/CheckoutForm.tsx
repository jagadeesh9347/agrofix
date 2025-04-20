'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

type FormData = {
  buyerName: string;
  buyerContact: string;
  deliveryAddress: string;
};

export default function CheckoutForm() {
  const { cart, clearCart, toggleCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    buyerName: '',
    buyerContact: '',
    deliveryAddress: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.buyerName || !form.buyerContact || !form.deliveryAddress) return;

    setSubmitting(true);
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        items: cart.map(({ id, quantity }) => ({ productId: id, quantity })),
      }),
    });
    clearCart();
    toggleCart();
    router.push('/'); // or router.push(`/order/${newOrder.id}`) if you capture ID
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <div>
        <label className="block text-sm">Name</label>
        <input
          name="buyerName"
          value={form.buyerName}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Contact</label>
        <input
          name="buyerContact"
          value={form.buyerContact}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Delivery Address</label>
        <textarea
          name="deliveryAddress"
          value={form.deliveryAddress}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <p className="font-medium">Total: ₹{total.toFixed(2)}</p>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {submitting ? 'Placing Order…' : 'Place Order'}
      </button>
    </form>
  );
}
