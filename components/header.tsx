import Link from 'next/link';
import Cart from './cart';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='text-xl font-bold'>
          NextShop
        </Link>

        <div className='flex items-center gap-4'>
          <ModeToggle />
          <Cart />
        </div>
      </div>
    </header>
  );
}
