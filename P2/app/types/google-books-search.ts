import {
  AccessInfo,
  ImageLinks,
  IndustryIdentifier,
  PanelizationSummary,
  ReadingModes,
  SaleInfo,
} from "./google-books.common";

export interface GoogleBooksApiResponse {
  kind: string;
  totalItems: number;
  items: BookSearchResult[];
}

export interface BookSearchResult {
  kind: "books#volume";
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: {
    textSnippet: string;
  };
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks; // Uses the common ImageLinks
  averageRating?: number;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}