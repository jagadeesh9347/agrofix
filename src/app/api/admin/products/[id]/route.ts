// src/app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    // 1. Extract ID from the URL
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const id = parseInt(segments[segments.length - 1], 10);

    // 2. Parse body
    const { name, price, imageUrl } = await request.json();
    if (!name || price == null || !imageUrl) {
      return NextResponse.json(
        { message: 'Missing required fields (name, price, imageUrl)' },
        { status: 400 }
      );
    }

    // 3. Update product
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

export async function DELETE(request: NextRequest) {
  try {
    // 1. Extract ID from the URL
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const id = parseInt(segments[segments.length - 1], 10);

    // 2. Delete product
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
