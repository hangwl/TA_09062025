
import { redirect } from 'next/navigation';
import { BookItem } from "./components/book-item";
import { SearchPagination } from "./components/search-pagination";
import { PrefetchNextPage } from "./components/prefetch-next-page";
import type { BookSearchResult } from '../../types/google-books-search';



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

interface SearchParams {
  q?: string;
  filter?: string;
  printType?: string;
  orderBy?: string;
  startIndex?: string;
}

interface SearchResults {
  items?: BookSearchResult[];
  totalItems?: number;
  error?: string;
  details?: GoogleApiError | { message?: string };
}

async function fetchSearchResults(searchParams: SearchParams): Promise<SearchResults> {
  const query = searchParams.q || '';
  if (!query) {
    return { items: [] };
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/books`;
  const params = new URLSearchParams({ q: query });

  if (searchParams.filter && searchParams.filter !== 'none') {
    params.append('filter', searchParams.filter);
  }
  if (searchParams.printType && searchParams.printType !== 'all') {
    params.append('printType', searchParams.printType);
  }
  if (searchParams.orderBy && searchParams.orderBy !== 'relevance') {
    params.append('orderBy', searchParams.orderBy);
  }
  if (searchParams.startIndex) {
    params.append('startIndex', searchParams.startIndex);
  }

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`, { next: { revalidate: 3600 } });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`API Error fetching search results (${response.status}):`, errorData);
      return { 
        error: `Failed to load search results. Status: ${response.status}`,
        details: errorData 
      };
    }
    const data = await response.json();
    return data as SearchResults;
  } catch (error) {
    console.error('Network or other error fetching search results:', error);
    return { error: 'Failed to fetch search results due to a network or server error.' };
  }
}

export default async function SearchPage({
  searchParams: promisedSearchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await promisedSearchParams;
  const searchResults = await fetchSearchResults(searchParams);
  const query = searchParams.q || '';
  const startIndexNum = parseInt(searchParams.startIndex || '0', 10);

  // If there's no query, redirect to homepage.
  if (!query) {
    redirect("/");
  }

  if (searchResults.error) {
    console.error(`Search Page Error: ${searchResults.error}`, searchResults.details);
    throw new Error(searchResults.error);
  }

  if (!searchResults.items || searchResults.items.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">No Results Found</h1>
        <p>No books found for &quot;{query}&quot;. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-lg md:text-3xl font-bold mb-6 break-words whitespace-normal max-w-full">Search Results for &quot;{query}&quot;</h1>
      <p className="mb-6 text-muted-foreground">
        Found {searchResults.totalItems || searchResults.items.length} results.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {searchResults.items.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
      <SearchPagination
        totalItems={searchResults.totalItems || 0}
        startIndex={startIndexNum}
        queryParams={{
          q: searchParams.q,
          filter: searchParams.filter,
          printType: searchParams.printType,
          orderBy: searchParams.orderBy,
        }}
      />
      <PrefetchNextPage
        startIndex={startIndexNum}
        queryParams={{
          q: searchParams.q,
          filter: searchParams.filter,
          printType: searchParams.printType,
          orderBy: searchParams.orderBy,
        }}
      />
    </div>
  );
}

// Revalidate page data every 1 hour
export const revalidate = 3600;
