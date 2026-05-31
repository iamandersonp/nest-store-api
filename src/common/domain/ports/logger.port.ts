/* istanbul ignore file */
/**
 * @interface LoggerPort
 * @description Contrato base para logging de infraestructura desacoplado.
 * @memberof common/domain/ports
 */
export interface LoggerPort {
  /**
   * Loguea mensaje de info.
   * @param message Mensaje
   * @param context Contexto opcional
   */
  info(message: string, context?: string): void;
  /**
   * Loguea advertencia.
   * @param message Mensaje
   * @param context Contexto opcional
   */
  warn(message: string, context?: string): void;
  /**
   * Loguea error.
   * @param message Mensaje
   * @param trace Traza de error opcional
   * @param context Contexto opcional
   */
  error(message: string, trace?: string, context?: string): void;
}

/**
 * InjectionToken para LoggerPort.
 */
export const LOGGER_PORT = Symbol('LOGGER_PORT');
