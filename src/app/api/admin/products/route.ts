// src/app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, price, imageUrl } = await req.json();
    if (!name || price == null || !imageUrl) {
      return NextResponse.json(
        { message: 'Missing required fields (name, price, imageUrl)' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: { name, price: Number(price), imageUrl },
    });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Failed to create product' },
      { status: 500 }
    );
  }
}
