export class UpdateBrandCommand {
  readonly name?: string;
  readonly image?: string;

  constructor(props: Partial<UpdateBrandCommand>) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
