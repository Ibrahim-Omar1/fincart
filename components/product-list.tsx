import { Suspense } from 'react';

import Pagination from './pagination';
import ProductCard from './product-card';

import type { Product } from '@/lib/types';

async function getProducts(
  page = 1,
  limit = 10,
  categoryId?: string,
  subcategory?: string,
  search?: string,
) {
  const offset = (page - 1) * limit;

  // Base URL for products
  let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

  // Add category filter if provided
  if (categoryId) {
    url = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=${offset}&limit=${limit}`;
  }

  // Add search filter if provided
  if (search) {
    url = `https://api.escuelajs.co/api/v1/products/?title=${search}&offset=${offset}&limit=${limit}`;
  }

  const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  let products = await res.json();

  // Client-side filtering for subcategories since the API doesn't support it
  if (subcategory && products.length > 0) {
    // Map subcategories to keywords to filter by
    const subcategoryKeywords = {
      caps: ['cap', 'hat'],
      tshirts: ['t-shirt', 'tee'],
      shorts: ['shorts', 'chino'],
      headphones: ['headphone', 'earbud'],
      controllers: ['controller', 'gaming'],
    };

    const keywords =
      subcategoryKeywords[subcategory as keyof typeof subcategoryKeywords] ||
      [];

    if (keywords.length > 0) {
      products = products.filter((product: Product) =>
        keywords.some(
          keyword =>
            product.title.toLowerCase().includes(keyword.toLowerCase()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase()),
        ),
      );
    }
  }

  return products;
}

// Get total count of products for pagination
async function getTotalProducts(categoryId?: string, search?: string) {
  // Base URL for counting all products
  let url = 'https://api.escuelajs.co/api/v1/products';

  // For category filtering
  if (categoryId) {
    url = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`;
  }

  // For search filtering
  if (search) {
    url = `https://api.escuelajs.co/api/v1/products/?title=${search}`;
  }

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return 0;
  }

  const products = await res.json();
  return Array.isArray(products) ? products.length : 0;
}

export default async function ProductList({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    categoryId?: string;
    subcategory?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = params?.page ? Number.parseInt(params.page) : 1;
  const categoryId = params?.categoryId;
  const subcategory = params?.subcategory;
  const search = params?.search;
  const limit = 10;

  // Fetch products with pagination
  const products: Product[] = await getProducts(
    currentPage,
    limit,
    categoryId,
    subcategory,
    search,
  );

  // Get total count for pagination
  const totalProducts = await getTotalProducts(categoryId, search);

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / limit);

  // Adjust for subcategory filtering (client-side)
  const hasSubcategoryFilter = Boolean(subcategory);

  const hasNoResults = products.length === 0;

  return (
    <div className='space-y-8'>
      {hasNoResults ? (
        <div className='bg-muted/20 rounded-lg border py-12 text-center'>
          <h3 className='text-lg font-medium'>No products found</h3>
          <p className='text-muted-foreground mt-1'>
            Try changing your search or filter criteria
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!hasNoResults && (
        <Suspense>
          <Pagination
            currentPage={currentPage}
            totalPages={
              hasSubcategoryFilter
                ? Math.max(1, Math.ceil(products.length / limit))
                : totalPages
            }
          />
        </Suspense>
      )}
    </div>
  );
}
