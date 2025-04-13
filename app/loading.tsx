import ProductListSkeleton from '@/components/product-list-skeleton';

export default function Loading() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Product Catalog</h1>
      <ProductListSkeleton />
    </main>
  );
}
