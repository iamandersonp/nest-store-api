export interface CreateOrdersDto {
  readonly customerId: number;
  readonly date: string;
  readonly total: number;
}

export interface UpdateOrdersDto {
  readonly customerId?: number;
  readonly date?: string;
  readonly total?: number;
}
