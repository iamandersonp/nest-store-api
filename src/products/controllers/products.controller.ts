import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from '../dtos/products-dto.interface';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // @Get()
  // getProducts(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return this.productsService.findAll();
  // }

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  getOne(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductsDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductsDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
