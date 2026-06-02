export class CreateProductCommand {
  readonly name!: string;
  readonly description!: string;
  readonly price!: number;
  readonly stock!: number;
  readonly image!: string;
  readonly brandId!: number;
  readonly categoryId!: number;

  constructor(props: CreateProductCommand) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
