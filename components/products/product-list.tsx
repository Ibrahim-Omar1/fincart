import ProductCard from './product-card';

import type { Product } from '@/types/api';

import { ProductsApi } from '@/services/api';

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
  const categoryId = params?.categoryId
    ? Number.parseInt(params.categoryId)
    : undefined;
  const search = params?.search;
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  // Fetch products with pagination and filters
  const response = await ProductsApi.getAll({
    limit,
    offset,
    categoryId,
    title: search,
  });

  const products = response.data;
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
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
