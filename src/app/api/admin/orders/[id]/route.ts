import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    const orderId = parseInt(context.params.id, 10);

    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ message: 'Failed to update status' }, { status: 500 });
  }
}
