import Link from 'next/link';

import Cart from './products/cart';

export default function Header() {
	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
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
