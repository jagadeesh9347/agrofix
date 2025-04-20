import { PrismaClient } from '@/generated/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const items = await prisma.product.findMany(); // ✅ correct model name
    res.status(200).json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
