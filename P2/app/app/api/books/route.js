import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q');
  const volumeId = searchParams.get('volumeId');
  // const download = searchParams.get('download');
  const filter = searchParams.get('filter');
  const startIndex = searchParams.get('startIndex');
  // const maxResults = searchParams.get('maxResults');
  const printType = searchParams.get('printType');
  // const orderBy = searchParams.get('orderBy');

  let googleApiUrl;
  const apiParams = new URLSearchParams();

  if (volumeId) {
    // If a specific volumeId is provided, use that endpoint
    googleApiUrl = `https://www.googleapis.com/books/v1/volumes/${volumeId}`;
  } else if (query) {
    // Otherwise, perform a search
    googleApiUrl = `https://www.googleapis.com/books/v1/volumes`;
    apiParams.append('q', query);

    // Add optional parameters if they are provided
    // if (download) apiParams.append('download', download);
    if (filter) apiParams.append('filter', filter);
    if (startIndex) apiParams.append('startIndex', startIndex);
    // if (maxResults) apiParams.append('maxResults', maxResults);
    if (printType) apiParams.append('printType', printType);
    // if (orderBy) apiParams.append('orderBy', orderBy);
  } else {
    return NextResponse.json(
      { error: 'A search query (q) or a volume ID (volumeId) is required.' },
      { status: 400 }
    );
  }

  const fullGoogleApiUrl = `${googleApiUrl}?${apiParams.toString()}`;

  try {
    console.log(`Fetching from Google Books API: ${fullGoogleApiUrl}`);
    const response = await axios.get(fullGoogleApiUrl);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching from Google Books API:', error.response ? error.response.data : error.message);
    const statusCode = error.response ? error.response.status : 500;
    const errorData = error.response ? error.response.data : { message: 'An unexpected error occurred.' };
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch data from Google Books API.', 
        details: errorData
      },
      { status: statusCode }
    );
  }
}
