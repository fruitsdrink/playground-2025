import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { CreateProductRequest, Product } from '@repo/types';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() data: CreateProductRequest): Product {
    return this.service.create(data);
  }

  @Get()
  findList(): Product[] {
    return this.service.findList();
  }
}
