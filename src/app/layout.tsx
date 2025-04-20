import './globals.css';
import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { CartButton } from '@/components/CartButton';
import { CartDrawer } from '@/components/CartDrawer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <CartButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}