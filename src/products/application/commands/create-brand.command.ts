export class CreateBrandCommand {
  readonly name!: string;
  readonly image!: string;

  constructor(props: CreateBrandCommand) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
