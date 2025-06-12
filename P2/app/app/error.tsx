'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function GlobalError({
  error
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-[80vh] flex flex-col items-center justify-center text-center py-10">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-red-500">Oops</h1>
        <p className="max-w-md text-red-700 mt-4">
          An unexpected error occurred.
        </p>
      </div>
      <Image
        src="/confused-travolta.gif"
        alt="Confused Travolta"
        width={280}
        height={280}
        sizes="(max-width: 640px) 160px, 280px"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded w-40 md:w-72 z-0"
        priority
      />
    </main>
  );
}
