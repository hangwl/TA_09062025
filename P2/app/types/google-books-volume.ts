import {
  AccessInfo,
  ImageLinks,
  IndustryIdentifier,
  PanelizationSummary,
  ReadingModes,
  SaleInfo,
} from "./google-books.common";

export interface BookVolume {
  kind: "books#volume";
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfoDetails;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  layerInfo?: LayerInfo;
}

export interface VolumeInfoDetails {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printedPageCount?: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: DetailedImageLinks; // Uses the extended DetailedImageLinks
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

// Extends the common ImageLinks to add more properties
export interface DetailedImageLinks extends ImageLinks {
  small?: string;
  medium?: string;
  large?: string;
}

interface LayerInfo {
  layers: {
    layerId: string;
    volumeAnnotationsVersion: string;
  }[];
}