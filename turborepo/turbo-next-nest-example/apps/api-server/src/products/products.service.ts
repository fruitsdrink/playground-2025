import { Injectable } from '@nestjs/common';
import type { CreateProductRequest, Product } from '@repo/types';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];
  create(data: CreateProductRequest): Product {
    const product: Product = {
      ...data,
      id: Math.random().toString(36).substring(7),
    };
    this.products.push(product);
    console.log(this.products);
    return product;
  }

  findList(): Product[] {
    return this.products;
  }
}
