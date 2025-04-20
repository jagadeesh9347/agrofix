// src/app/api/admin/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    const { name, price, imageUrl } = await req.json();
    if (!name || price == null || !imageUrl) {
      return NextResponse.json(
        { message: 'Missing required fields (name, price, imageUrl)' },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name, price: Number(price), imageUrl },
    });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
