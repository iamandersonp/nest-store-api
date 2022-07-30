import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Products } from './products.interface';
import {
  CreateProductsDto,
  UpdateProductsDto,
} from './products-dto.interface';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Products[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 1000,
      stock: 100,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(
      (item: Products) => item.id === id,
    );
    if (!product) {
      throw new NotFoundException(
        `Product ${id} not Found`,
      );
    }
    return product;
  }

  create(payload: CreateProductsDto) {
    this.counterId++;
    const newProduct: Products = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductsDto) {
    const productId = this.findIndex(id);
    if (productId != 1) {
      const product = this.findOne(id);
      this.products[productId] = {
        ...product,
        ...payload,
      };
      return this.products[id];
    }
    return null;
  }

  delete(id: number) {
    const productId = this.findIndex(id);
    if (productId === -1) {
      throw new NotFoundException(
        `Product ${id} not Found`,
      );
    }
    this.products.slice(productId, 1);
  }

  private findIndex(id: number) {
    return this.products.findIndex(
      (item) => item.id === id,
    );
  }
}
