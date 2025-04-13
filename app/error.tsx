'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='flex min-h-[50vh] flex-col items-center justify-center px-4 text-center'>
			<h2 className='mb-4 text-2xl font-bold'>Something went wrong!</h2>
			<p className='mb-6 max-w-md text-muted-foreground'>
				We apologize for the inconvenience. An error occurred while trying to
				load the products.
			</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
