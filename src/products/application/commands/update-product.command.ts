export class UpdateProductCommand {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly image?: string;
  readonly brandId?: number;
  readonly categoryId?: number;

  constructor(props: Partial<UpdateProductCommand>) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
