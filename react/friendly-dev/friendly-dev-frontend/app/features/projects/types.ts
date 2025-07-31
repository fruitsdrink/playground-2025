import type { StrapiImage } from "~/types";

export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImage;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
}
