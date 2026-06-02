export class CreateCategoryCommand {
  readonly name!: string;

  constructor(props: CreateCategoryCommand) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
