'use client';

import { useState } from 'react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setOrder(null);
    setError('');

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error('Order not found');
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Track Your Order</h1>

      <form onSubmit={handleTrack} className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 border rounded p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          {loading ? 'Checking...' : 'Track'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {order && (
        <div className="p-4 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
          <p><strong>Name:</strong> {order.buyerName}</p>
          <p><strong>Contact:</strong> {order.buyerContact}</p>
          <p><strong>Address:</strong> {order.deliveryAddress}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p className="mt-2"><strong>Items:</strong></p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {order.items.map((item: any, i: number) => (
              <li key={i}>
                {item.name} × {item.quantity} (₹{item.price})
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-500">
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </main>
  );
}
