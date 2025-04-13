import Image from 'next/image';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import AddToCart from './AddToCart';

import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
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

        <AddToCart product={product} />
      </CardFooter>
    </Card>
  );
}
