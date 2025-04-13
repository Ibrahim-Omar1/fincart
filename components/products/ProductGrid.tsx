'use client';

import { memo } from 'react';

import ProductCard from './ProductCard';

import { type Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
}

/**
 * ProductGrid is a component that displays a grid of product cards.
 * @param products - The products to display.
 * @returns A grid of product cards.
 */
function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default memo(ProductGrid);
