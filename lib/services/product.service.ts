import { type Product } from '@/types/product';

const API_URL = 'https://api.escuelajs.co/api/v1';

/**
 * getProducts is a function that fetches products from the API.
 * @param offset - The offset of the products to fetch.
 * @param limit - The limit of the products to fetch.
 * @returns A promise that resolves to an array of products.
 */
export async function getProducts(offset = 0, limit = 10): Promise<Product[]> {
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

  return response.json();
}

/**
 * getProductsCount is a function that fetches the total number of products from the API.
 * @returns A promise that resolves to the total number of products.
 */
export async function getProductsCount(): Promise<number> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products count');
  }
  const products = await response.json();
  return products.length;
}
