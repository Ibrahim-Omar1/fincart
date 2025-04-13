import { Skeleton } from '../ui/skeleton';

/**
 * ProductGridSkeleton is a component that displays a grid of product cards with skeleton loading
 * indicators. It is used to indicate that the products are loading.
 * @returns A grid of product cards with skeleton loading indicators.
 */
function ProductGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className='space-y-4'>
          <Skeleton className='aspect-square rounded-lg' />
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      ))}
    </div>
  );
}
export default ProductGridSkeleton;
