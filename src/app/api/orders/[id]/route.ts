import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: order.id,
      buyerName: order.buyerName,
      buyerContact: order.buyerContact,
      deliveryAddress: order.deliveryAddress,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching order' }, { status: 500 });
  }
}
