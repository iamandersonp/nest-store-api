/**
 * Interface to hold the base crud operations
 *
 * @export
 * @interface CrudService
 * @template T - Type of the data
 * @template C - Create DTO
 * @template U - Update DT0
 */
export interface BasseCrudService<T, C extends object, U extends object> {
  /**
   * Find All elements
   *
   * @return {*}  {(T[] | Promise<T[]>)}
   * @memberof CrudService
   */
  findAll(): T[] | Promise<T[]>;

  /**
   * Find one by id
   *
   * @param {number} id
   * @return {*}  {(T | Promise<T>)}
   * @memberof CrudService
   */
  findOne(id: number): T | Promise<T>;

  /**
   * Create a new element
   *
   * @param {C} payload
   * @return {*}  {(T | Promise<T>)}
   * @memberof CrudService
   */
  create(payload: C): T | Promise<T>;

  /**
   * Update an existint element
   *
   * @param {number} id
   * @param {U} payload
   * @return {*}  {(T | Promise<T>)}
   * @memberof CrudService
   */
  update(id: number, payload: U): T | Promise<T>;

  /**
   * Delete an element
   *
   * @param {number} id
   * @return {*}  {(void | Promise<void>)}
   * @memberof CrudService
   */
  delete(id: number): void | Promise<void>;
}
