'use client';

import { useCallback, useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  pageSize?: number;
}

export function usePagination({
  initialPage = 1,
  pageSize = 10,
}: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const offset = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    offset,
    nextPage,
    previousPage,
    goToPage,
  };
}
