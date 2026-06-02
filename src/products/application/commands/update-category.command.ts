export class UpdateCategoryCommand {
  readonly name?: string;

  constructor(props: Partial<UpdateCategoryCommand>) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
