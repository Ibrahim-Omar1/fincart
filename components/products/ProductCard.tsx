'use client';

import Image from 'next/image';
import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { type Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard is a component that displays a product card.
 * @param product - The product to display.
 * @returns A product card.
 */
function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className='flex flex-col overflow-hidden transition-shadow hover:shadow-lg'>
      <CardHeader className='p-0'>
        <div className='relative aspect-square'>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </CardHeader>
      <CardContent className='flex-1 p-4'>
        <Badge variant='secondary' className='mb-2'>
          {product.category.name}
        </Badge>
        <h3 className='mb-2 line-clamp-1 text-lg font-semibold'>
          {product.title}
        </h3>
        <p className='line-clamp-2 text-sm text-muted-foreground'>
          {product.description}
        </p>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        <p className='text-lg font-bold'>${product.price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
}

export default memo(ProductCard);
