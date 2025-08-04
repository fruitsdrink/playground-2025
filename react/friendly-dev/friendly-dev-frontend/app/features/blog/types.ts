import type { StrapiImage } from "~/types";

export interface PostMeta {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  body: string;
  image: string;
}

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: StrapiImage;
}
