import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, price, imageUrl } = body;

  if (!name || !price || !imageUrl) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: { name, price, imageUrl },
  });

  return NextResponse.json(newProduct);
}
