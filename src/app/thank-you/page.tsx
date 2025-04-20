'use client';

import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-green-50 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Thank You for Your Order!</h1>
      <p className="text-gray-700 mb-6 max-w-md">
        We’ve received your order and are getting it ready for delivery. You’ll get a confirmation shortly.
      </p>

      <Link href="/" className="text-white bg-green-600 px-6 py-2 rounded-xl hover:bg-green-700 transition">
        Continue Shopping
      </Link>
    </main>
  );
}
