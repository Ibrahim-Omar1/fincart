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
  totalItems: number;
  pageSize?: number;
  baseUrl?: string;
  siblingCount?: number;
}

/**
 * Server Component for product pagination
 * Handles pagination logic and rendering on the server side
 */
export default function ProductPagination({
  currentPage,
  totalItems,
  pageSize = 12,
  baseUrl = '/',
  siblingCount = 2,
}: ProductPaginationProps) {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Add first page
    items.push(1);

    // Add ellipsis after first page if needed
    if (leftSiblingIndex > 2) {
      items.push('ellipsis');
    }

    // Add sibling pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(i);
      }
    }

    // Add ellipsis before last page if needed
    if (rightSiblingIndex < totalPages - 1) {
      items.push('ellipsis');
    }

    // Add last page if not already included
    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  };

  const getPageUrl = (page: number) => {
    // Server-side URL generation
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    return `${baseUrl}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  };

  if (totalPages <= 1) return null;

  const paginationItems = generatePaginationItems();

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
