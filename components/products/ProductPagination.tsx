'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

/**
 * ProductPagination is a component that displays a pagination for a list of products.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @param baseUrl - The base URL of the page.
 * @returns A pagination component.
 */
export default function ProductPagination({
  currentPage,
  totalPages,
  baseUrl = '/',
}: ProductPaginationProps) {
  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    // Show first page, last page, and pages around current page
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      paginationItems.push(i);
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      paginationItems.push('ellipsis');
    }
  }

  const getPageUrl = (page: number) => {
    const url = new URL(baseUrl, 'http://placeholder');
    url.searchParams.set('page', page.toString());
    return `${url.pathname}${url.search}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {paginationItems.map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href={getPageUrl(item as number)}
                isActive={currentPage === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
