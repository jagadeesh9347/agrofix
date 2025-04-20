'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Order = {
  id: number;
  buyerName: string;
  buyerContact: string;
  deliveryAddress: string;
  status: string;
  createdAt: string;
  items: any[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      fetchOrders(); // Refresh orders
    } else {
      alert('Failed to update status');
    }
  };

  const nextStatus = (current: string) => {
    if (current === 'Pending') return 'In Progress';
    if (current === 'In Progress') return 'Delivered';
    return null;
  };

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin: Orders</h1>
        <Link
          href="/admin/products"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Manage Products
        </Link>
      </div>

      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-xl shadow-md border"
            >
              <h2 className="text-xl font-semibold mb-1">
                Order #{order.id}
              </h2>
              <p><strong>Name:</strong> {order.buyerName}</p>
              <p><strong>Contact:</strong> {order.buyerContact}</p>
              <p><strong>Address:</strong> {order.deliveryAddress}</p>
              <p><strong>Status:</strong> {order.status}</p>

              {nextStatus(order.status) && (
                <button
                  onClick={() => updateStatus(order.id, nextStatus(order.status)!)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Mark as {nextStatus(order.status)}
                </button>
              )}

              <p className="mt-2">
                <strong>Items:</strong>
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} (₹{item.price})
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
