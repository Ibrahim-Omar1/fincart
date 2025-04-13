import { Suspense } from 'react';

import CartProvider from '@/components/cart/cart-provider';
import ProductList from '@/components/products/product-list';
import ProductListSkeleton from '@/components/products/product-list-skeleton';

export default function Home({
	searchParams,
}: {
	searchParams?: Promise<{
		page?: string;
		categoryId?: string;
		subcategory?: string;
		search?: string;
	}>;
}) {
	return (
		<CartProvider>
			<main className='container mx-auto px-4 py-8'>
				<Suspense fallback={<ProductListSkeleton />}>
					<ProductList searchParams={searchParams} />
				</Suspense>
			</main>
		</CartProvider>
	);
}
