export interface StrapiResponse<T> {
  data: T;
  meta?: StrapiListMeta;
  error?: StrapiError;
}

export interface StrapiListMeta {
  pagination?: StrapiPagination;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: StrapiImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiImageFormats {
  large: StrapiImageFormat;
  small: StrapiImageFormat;
  medium: StrapiImageFormat;
  thumbnail: StrapiImageFormat;
}

interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: StrapiErrorDetails;
}

interface StrapiErrorDetails {}
