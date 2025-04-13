import { Suspense } from 'react';

import ProductGrid from '@/components/products/ProductGrid';
import ProductGridSkeleton from '@/components/products/ProductGridSkeleton';
import ProductPagination from '@/components/products/ProductPagination';
import { getProducts, getProductsCount } from '@/lib/services/product.service';

interface HomeProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 12;
  const offset = (currentPage - 1) * pageSize;

  const productsPromise = getProducts(offset, pageSize);
  const totalPromise = getProductsCount();

  const [products, total] = await Promise.all([productsPromise, totalPromise]);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Our Products</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid products={products} />
      </Suspense>
      <div className='mt-8'>
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl='/'
        />
      </div>
    </main>
  );
}
