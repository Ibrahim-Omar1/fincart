'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <AlertTriangle className='mb-4 h-12 w-12 text-destructive' />
      <h2 className='mb-4 text-2xl font-bold'>Something went wrong!</h2>
      <p className='mb-2 max-w-md text-muted-foreground'>
        We apologize for the inconvenience. An unexpected error occurred.
      </p>
      {error.message && process.env.NODE_ENV === 'development' && (
        <p className='mb-6 max-w-md rounded border p-2 text-sm text-destructive'>
          {error.message}
        </p>
      )}
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
