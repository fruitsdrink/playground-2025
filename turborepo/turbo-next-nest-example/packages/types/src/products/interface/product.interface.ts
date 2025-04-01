import { CreateProductRequest } from "../dto";

export interface Product extends CreateProductRequest {
  id: string;
}
