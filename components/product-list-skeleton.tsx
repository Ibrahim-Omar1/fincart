import { Skeleton } from '@/components/ui/skeleton';

export default function ProductListSkeleton() {
  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='space-y-3'>
            <Skeleton className='h-[200px] w-full rounded-lg' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
            <div className='flex items-center justify-between pt-2'>
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-9 w-24' />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className='flex items-center justify-center gap-2 py-4'>
        <Skeleton className='h-9 w-9 rounded' />
        <Skeleton className='h-9 w-9 rounded' />
        <Skeleton className='h-9 w-9 rounded' />
        <Skeleton className='h-9 w-9 rounded' />
        <Skeleton className='h-9 w-9 rounded' />
      </div>
    </div>
  );
}
