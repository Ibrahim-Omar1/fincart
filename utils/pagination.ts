interface PaginationParams {
  currentPage: number;
  totalItems: number;
  limit: number;
  hasSubcategoryFilter?: boolean;
  filteredItemsCount?: number;
}

interface PaginationResult {
  currentPage: number;
  totalPages: number;
  offset: number;
  limit: number;
}

export function calculatePagination({
  currentPage,
  totalItems,
  limit,
  hasSubcategoryFilter = false,
  filteredItemsCount = 0,
}: PaginationParams): PaginationResult {
  // Calculate offset for pagination
  const offset = (currentPage - 1) * limit;

  // Calculate total pages based on whether we have subcategory filtering
  const totalPages = hasSubcategoryFilter
    ? Math.max(1, Math.ceil(filteredItemsCount / limit))
    : Math.ceil(totalItems / limit);

  return {
    currentPage,
    totalPages,
    offset,
    limit,
  };
}
