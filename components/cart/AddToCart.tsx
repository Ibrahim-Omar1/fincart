'use client';
import { Check, ShoppingCart } from 'lucide-react';

import { Button } from '../ui/button';

import { useCartStore } from '@/lib/store';
import { type Product } from '@/types/product';

const AddToCart = ({ product }: { product: Product }) => {
	const { addToCart, items } = useCartStore();

	const isInCart = items.some(item => item.id === product.id);

	const handleAddToCart = () => {
		addToCart(product);
	};
	return (
		<Button onClick={handleAddToCart} disabled={isInCart} size='sm'>
			{isInCart ? (
				<>
					<Check className='mr-1 h-4 w-4' /> Added
				</>
			) : (
				<>
					<ShoppingCart className='mr-1 h-4 w-4' /> Add to Cart
				</>
			)}
		</Button>
	);
};

export default AddToCart;
