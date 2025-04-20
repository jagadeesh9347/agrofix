// POST new order
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { buyerName, buyerContact, deliveryAddress, items } = body;

  const newOrder = await prisma.order.create({
    data: {
      buyerName,
      buyerContact,
      deliveryAddress,
      items,
      status: 'Pending',
    },
  });

  return NextResponse.json(newOrder);
}

// GET all orders (admin)
export async function GET() {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}
