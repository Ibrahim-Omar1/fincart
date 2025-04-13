'use client';

import { ShoppingCart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCartStore } from '@/lib/store';

export default function Cart() {
  const { items, removeFromCart, clearCart, totalPrice, totalItems } =
    useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant='outline' size='icon' className='relative'>
        <ShoppingCart className='h-5 w-5' />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='relative'>
          <ShoppingCart className='h-5 w-5' />
          {totalItems > 0 && (
            <Badge className='absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center px-1'>
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Your Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center p-4 text-center'>
            <ShoppingCart className='mb-4 h-12 w-12 text-muted-foreground' />
            <h3 className='text-lg font-medium'>Your cart is empty</h3>
            <p className='mt-1 text-muted-foreground'>
              Start adding some products to your cart
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className='my-4 flex-1'>
              <div className='space-y-4 pr-4'>
                {items.map(item => (
                  <div key={item.id} className='flex items-center gap-4'>
                    <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md'>
                      <Image
                        src={
                          item.images[0] ||
                          '/placeholder.svg?height=64&width=64'
                        }
                        alt={item.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <h4 className='line-clamp-1 text-sm font-medium'>
                        {item.title}
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className='border-t pt-4'>
              <div className='mb-4 flex justify-between'>
                <span className='font-medium'>Total</span>
                <span className='font-bold'>${totalPrice.toFixed(2)}</span>
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  className='flex-1'
                  onClick={clearCart}
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Clear
                </Button>
                <Button className='flex-1'>Checkout</Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
