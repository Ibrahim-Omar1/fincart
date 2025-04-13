import { type Product } from '@/types/product';

const API_URL = 'https://api.escuelajs.co/api/v1';

export async function getProducts(page = 0, limit = 10) {
	const offset = page * limit;
	const response = await fetch(
		`${API_URL}/products?offset=${offset}&limit=${limit}`,
		{
			next: {
				revalidate: 3600, // Cache for 1 hour
			},
		},
	);

	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}

	return response.json() as Promise<Product[]>;
}

export async function getProductsCount() {
	const response = await fetch(`${API_URL}/products`, {
		next: {
			revalidate: 3600, // Cache for 1 hour
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch products count');
	}

	const products = (await response.json()) as Product[];
	return products.length;
}
