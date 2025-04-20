// src/app/api/products/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, price, imageUrl } = body

  if (!name || !price || !imageUrl) {
    return NextResponse.json(
      { message: 'Missing fields' },
      { status: 400 }
    )
  }

  try {
    const newProduct = await prisma.product.create({
      data: { name, price, imageUrl },
    })
    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('POST /api/products error:', error)
    return NextResponse.json(
      { message: 'Failed to create product' },
      { status: 500 }
    )
  }
}
