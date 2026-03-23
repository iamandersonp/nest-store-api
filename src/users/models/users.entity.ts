/**
 * Interface for Users
 *
 * @export
 * @interface Users
 */
export interface Users {
  /**
   * Id of the user
   *
   * @type {number}
   * @memberof Users
   */
  id: number;

  /**
   * First name of the user
   *
   * @type {string}
   * @memberof Users
   */
  firstName: string;

  /**
   * Last name of the user
   *
   * @type {string}
   * @memberof Users
   */
  lastName: string;

  /**
   * UserName of the user
   *
   * @type {string}
   * @memberof Users
   */
  userName: string;

  /**
   * Password of the user
   *
   * @type {string}
   * @memberof Users
   */
  password: string;

  /**
   * Role of the user
   *
   * @type {string}
   * @memberof Users
   */
  role: string;
}
