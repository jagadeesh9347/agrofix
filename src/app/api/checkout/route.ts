// src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { buyerName, buyerContact, deliveryAddress, cart } = body;

    // Validate payload
    if (!buyerName || !buyerContact || !deliveryAddress) {
      return NextResponse.json(
        { message: 'Missing buyerName, buyerContact, or deliveryAddress' },
        { status: 400 }
      );
    }
    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { message: 'Cart is missing or empty' },
        { status: 400 }
      );
    }

    // Create the order first
    const order = await prisma.order.create({
      data: {
        buyerName,
        buyerContact,
        deliveryAddress,
        status: 'Pending',
      },
    });

    // Create order items
    const orderItems = cart.map((item: any) => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await prisma.orderItem.createMany({
      data: orderItems,
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json(
      { message: 'Failed to place order' },
      { status: 500 }
    );
  }
}
