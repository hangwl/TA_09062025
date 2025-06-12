import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { BookVolume } from '../../../types/google-books-volume';

interface GoogleApiErrorDetail {
  domain?: string;
  reason?: string;
  message?: string;
  extendedHelp?: string;
}

interface GoogleApiError {
  errors?: GoogleApiErrorDetail[];
  code?: number;
  message?: string;
}

interface BookError {
  id: string;
  error: string;
  details?: GoogleApiError | { message?: string };
}

type BookData = BookVolume | BookError;

async function fetchBookDetails(volumeId: string): Promise<BookData> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/books?volumeId=${volumeId}`;
    console.log(`Fetching book details from: ${apiUrl}`);
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`API Error (${response.status}):`, errorData);
      return { 
        id: volumeId, 
        error: `Failed to load book details. Status: ${response.status}`,
        details: errorData
      };
    }
    const data = await response.json();
    return data as BookVolume;
  } catch (error) {
    console.error('Network or other error fetching book details:', error);
    return { 
      id: volumeId, 
      error: 'Failed to fetch book details due to a network or server error.' 
    };
  }
}

export default async function BookDetailPage({ params: promisedParams }: { params: Promise<{ volumeId: string }> }) {
  const { volumeId } = await promisedParams;
  const bookData = await fetchBookDetails(volumeId);

  // Handle error / missing data
  if ('error' in bookData) { // Type guard for BookError
    console.error(`BookDetailPage Error for ${volumeId}: ${bookData.error}`, bookData.details);
    // Check if the error indicates a "not found" scenario (e.g., API returned 404)
    if (bookData.error.includes("Status: 404")) {
        notFound(); // Triggers Next.js 404 page
    }
    // For other errors, throw a generic error to be caught by Next.js error boundary
    throw new Error(bookData.error); 
  }
  
  // At this point, bookData is BookVolume, and volumeInfo is guaranteed by the type.
  const { volumeInfo } = bookData;

  return (
    <div className="container mx-auto px-2 pb-2">
      <div className="mt-6 md:grid md:grid-cols-3 md:auto-rows-auto md:gap-x-8 md:gap-y-4">
        {/* Sidebar / Top section */}
        <aside className="md:top-6 md:col-span-1 md:col-start-1 md:row-start-1 w-full">
          <div className="flex flex-row flex-wrap md:flex-col gap-4 items-start w-full h-full">
            {/* Mobile cover */}
            <div className="relative flex-none w-36 h-52 bg-muted rounded md:hidden">
              {volumeInfo.imageLinks ? (
                <Image
                  src={(volumeInfo.imageLinks.large || volumeInfo.imageLinks.medium || volumeInfo.imageLinks.small || volumeInfo.imageLinks.thumbnail || volumeInfo.imageLinks.smallThumbnail || '').replace(/^http:/, 'https:')}
                  alt={`Cover of ${volumeInfo.title}`}
                  fill
                  className="object-contain rounded"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                  <BookIcon size={48} />
                </div>
              )}
            </div>

            {/* md+ cover */}
            {volumeInfo.imageLinks ? (
              <Image
                src={(volumeInfo.imageLinks.large || volumeInfo.imageLinks.medium || volumeInfo.imageLinks.small || volumeInfo.imageLinks.thumbnail || volumeInfo.imageLinks.smallThumbnail || '').replace(/^http:/, 'https:')}
                alt={`Cover of ${volumeInfo.title}`}
                width={160}
                height={240}
                className="object-contain rounded flex-none hidden md:block md:w-full"
                sizes="(min-width: 768px) 300px, 40vw"
              />
            ) : (
              <div className="hidden md:flex items-center justify-center w-full h-[240px] bg-muted rounded text-muted-foreground">
                <BookIcon size={64} />
              </div>
            )}

            <div className="flex-1 w-full flex flex-col md:px-4 min-h-0">
              <h1 className="text-xl md:text-2xl font-bold md:mt-4 text-left">
                {volumeInfo.title || 'No Title'}
              </h1>

              {volumeInfo.authors && (
                <p className="mt-1 text-sm italic text-muted-foreground text-left">
                  {volumeInfo.authors.join(', ')}
                </p>
              )}

              <div className="mt-3 md:mt-4 space-y-1 text-sm text-muted-foreground">
                {volumeInfo.publisher && <p><strong>Publisher:</strong> {volumeInfo.publisher}</p>}
                {volumeInfo.publishedDate && <p><strong>Date:</strong> {volumeInfo.publishedDate}</p>}
                {volumeInfo.pageCount && volumeInfo.pageCount > 0 && <p><strong>Pages:</strong> {volumeInfo.pageCount}</p>}
                {volumeInfo.industryIdentifiers && (
                  <p>
                    <strong>ISBN:</strong> {volumeInfo.industryIdentifiers.map(id => id.identifier).join(', ')}
                  </p>
                )}
              </div>

              {(volumeInfo.previewLink || volumeInfo.canonicalVolumeLink) && (
                <div className="mt-4 hidden md:flex gap-3 md:items-start">
                  {volumeInfo.previewLink && (
                    <Button variant="outline" className="flex-1 justify-center" asChild>
                      <a
                        href={volumeInfo.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google Books Preview"
                      >
                        <Image src="/google-g.svg" alt="Google Books" width={20} height={20} />
                      </a>
                    </Button>
                  )}
                  {volumeInfo.canonicalVolumeLink && (
                    <Button variant="outline" className="flex-1 justify-center" asChild>
                      <a
                        href={volumeInfo.canonicalVolumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google Play Books"
                      >
                        <Image src="/google-play.svg" alt="Google Play Books" width={20} height={20} />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Icons Row - visible only on small screens */}
        {(volumeInfo.previewLink || volumeInfo.canonicalVolumeLink) && (
          <div className="flex gap-3 mt-4 col-span-3 md:hidden">
            {volumeInfo.previewLink && (
              <Button variant="outline" className="flex-1 justify-center" asChild>
                <a href={volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" aria-label="Google Books Preview">
                  <Image src="/google-g.svg" alt="Google Books" width={20} height={20} />
                </a>
              </Button>
            )}
            {volumeInfo.canonicalVolumeLink && (
              <Button variant="outline" className="flex-1 justify-center" asChild>
                <a href={volumeInfo.canonicalVolumeLink} target="_blank" rel="noopener noreferrer" aria-label="Google Play Books">
                  <Image src="/google-play.svg" alt="Google Play Books" width={20} height={20} />
                </a>
              </Button>
            )}
          </div>
        )}

        {/* Description & details */}
        <section className="mt-8 md:mt-0 prose max-w-none md:col-start-2 md:col-span-2 md:row-start-1">
          {volumeInfo.categories && (
            <div className="flex flex-wrap gap-2 mb-4">
              {volumeInfo.categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          )}
          {/* subtitle */}
          {volumeInfo.subtitle && (
            <p className="text-muted-foreground mb-4">{volumeInfo.subtitle}</p>
          )}
          {volumeInfo.description ? (
            <div dangerouslySetInnerHTML={{ __html: volumeInfo.description }} />
          ) : (
            <p className="text-muted-foreground">No description available.</p>
          )}
        </section>
      </div>
    </div>
  );
}

// Revalidate page data every 1 hour
export const revalidate = 3600;