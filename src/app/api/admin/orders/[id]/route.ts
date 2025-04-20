// src/app/api/admin/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    // 1. parse the new status from body
    const { status } = await request.json();

    // 2. extract the `id` segment from the URL
    const url = new URL(request.url);
    const segments = url.pathname.split('/');        // e.g. ['', 'api', 'admin', 'orders', '42']
    const idStr = segments[segments.length - 1];     // '42'
    const orderId = parseInt(idStr, 10);

    // 3. run your Prisma update
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating status:', err);
    return NextResponse.json(
      { message: 'Failed to update status' },
      { status: 500 }
    );
  }
}
