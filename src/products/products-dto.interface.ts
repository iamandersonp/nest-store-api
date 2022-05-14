export interface CreateProductsDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
}

export interface UpdateProductsDto {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
}
