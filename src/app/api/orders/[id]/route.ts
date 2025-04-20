// src/app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // 1. Extract the order ID from the URL
    const url = new URL(request.url);
    const segments = url.pathname.split('/'); // ['','api','orders','42']
    const id = parseInt(segments[segments.length - 1], 10);

    // 2. Fetch the order
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    return NextResponse.json({ message: 'Failed to fetch order' }, { status: 500 });
  }
}
