import {
  type ApiError,
  type Product,
  type ProductFilters,
} from '@/types/product';

const API_URL = 'https://api.escuelajs.co/api/v1';

/**
 * Custom error class for API errors
 */
export class ProductApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ProductApiError';
  }
}

/**
 * Handles API response and errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new ProductApiError(error.statusCode, error.message);
  }
  return response.json();
}

/**
 * Convert filters to URLSearchParams
 */
function createSearchParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.title) {
    params.set('title', filters.title);
  }
  if (filters.price) {
    params.set('price', filters.price.toString());
  }
  if (filters.price_min) {
    params.set('price_min', filters.price_min.toString());
  }
  if (filters.price_max) {
    params.set('price_max', filters.price_max.toString());
  }
  if (filters.categoryId) {
    params.set('categoryId', filters.categoryId.toString());
  }
  if (filters.offset) {
    params.set('offset', filters.offset.toString());
  }
  if (filters.limit) {
    params.set('limit', filters.limit.toString());
  }

  return params;
}

/**
 * Get products with filtering and pagination
 */
export async function getProducts(
  filters: ProductFilters = {},
): Promise<Product[]> {
  const params = createSearchParams(filters);
  const response = await fetch(`${API_URL}/products?${params}`, {
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: ['products'],
    },
  });

  return handleResponse<Product[]>(response);
}

/**
 * Get total number of products
 */
export async function getProductsCount(): Promise<number> {
  const response = await fetch(`${API_URL}/products`, {
    next: {
      revalidate: 3600,
      tags: ['products-count'],
    },
  });

  const products = await handleResponse<Product[]>(response);
  return products.length;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  categoryId: number,
  filters: Omit<ProductFilters, 'categoryId'> = {},
): Promise<Product[]> {
  const params = createSearchParams({ ...filters, categoryId });
  const response = await fetch(`${API_URL}/products?${params}`, {
    next: {
      revalidate: 3600,
      tags: [`category-${categoryId}`],
    },
  });

  return handleResponse<Product[]>(response);
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    next: {
      revalidate: 3600,
      tags: [`product-${id}`],
    },
  });

  return handleResponse<Product>(response);
}

/**
 * Search products by title
 */
export async function searchProducts(
  query: string,
  filters: Omit<ProductFilters, 'title'> = {},
): Promise<Product[]> {
  const params = createSearchParams({ ...filters, title: query });
  const response = await fetch(`${API_URL}/products?${params}`, {
    next: {
      revalidate: 60, // Cache search results for 1 minute
      tags: ['product-search'],
    },
  });

  return handleResponse<Product[]>(response);
}
