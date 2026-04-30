/**
 * Configuration Interface
 *
 * @export
 * @interface EnvConfig
 */
export interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
}
