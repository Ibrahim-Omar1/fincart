'use client';

import { Check, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import type { Product } from '@/lib/types';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCartStore } from '@/lib/store';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, items } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Card className='flex h-full flex-col overflow-hidden py-0 transition-shadow hover:shadow-lg'>
      <div className='relative aspect-square overflow-hidden'>
        <Image
          src={product.images[0] || '/placeholder.svg?height=300&width=300'}
          alt={product.title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
          className='object-cover transition-transform hover:scale-105'
          priority={false}
        />
      </div>

      <CardHeader className='p-4 pb-0'>
        <CardTitle className='line-clamp-1 text-lg'>{product.title}</CardTitle>
        <p className='text-muted-foreground text-sm'>{product.category.name}</p>
      </CardHeader>

      <CardContent className='flex-grow p-4 pt-2'>
        <p className='text-muted-foreground line-clamp-2 text-sm'>
          {product.description}
        </p>
      </CardContent>

      <CardFooter className='flex items-center justify-between p-4 pt-0'>
        <p className='text-lg font-bold'>${product.price.toFixed(2)}</p>

        <Button
          onClick={handleAddToCart}
          disabled={isInCart || isAdding}
          size='sm'
          variant={isInCart ? 'outline' : 'default'}
        >
          {isInCart ? (
            <>
              <Check className='mr-1 h-4 w-4' /> Added
            </>
          ) : (
            <>
              <ShoppingCart className='mr-1 h-4 w-4' /> Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
