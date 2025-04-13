import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<div className='container flex min-h-[70vh] flex-col items-center justify-center px-4 text-center'>
			<h2 className='mb-4 text-4xl font-bold'>404</h2>
			<p className='mb-2 text-xl'>Page Not Found</p>
			<p className='mb-8 max-w-md text-muted-foreground'>
				The page you are looking for doesn't exist or has been moved.
			</p>
			<Button asChild>
				<Link href='/'>Return Home</Link>
			</Button>
		</div>
	);
}
