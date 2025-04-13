'use client';

import React, { useEffect } from 'react';

import { useCartStore } from '@/lib/store';

export default function CartProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { initializeCart } = useCartStore();

	// Initialize cart from localStorage on client side
	useEffect(() => {
		initializeCart();
	}, [initializeCart]);

	return <>{children}</>;
}
