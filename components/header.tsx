import Link from 'next/link';

import Cart from './cart';

export default function Header() {
  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <Link href='/' className='text-xl font-bold'>
          NextShop
        </Link>

        <div className='flex items-center gap-4'>
          <Cart />
        </div>
      </div>
    </header>
  );
}
