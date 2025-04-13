'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    if (currentPage > 3) {
      pageNumbers.push(1);
      // Add ellipsis if there's a gap
      if (currentPage > 4) {
        pageNumbers.push('ellipsis-start');
      }
    }

    // Show current page and neighbors
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      // Add ellipsis if there's a gap
      if (currentPage < totalPages - 3) {
        pageNumbers.push('ellipsis-end');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div className='flex items-center justify-center gap-2 py-4'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        aria-label='Previous page'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      <div className='flex items-center gap-1'>
        {pageNumbers.map((pageNumber, index) => {
          if (
            pageNumber === 'ellipsis-start' ||
            pageNumber === 'ellipsis-end'
          ) {
            return (
              <span
                key={`ellipsis-${index}`}
                className='text-muted-foreground px-2'
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? 'default' : 'outline'}
              onClick={() => handlePageChange(pageNumber as number)}
              aria-label={`Page ${pageNumber}`}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className='min-w-[2.5rem]'
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant='outline'
        size='icon'
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        aria-label='Next page'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}
