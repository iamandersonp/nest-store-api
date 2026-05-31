/* istanbul ignore file */
/**
 * @interface EmailPort
 * @description Contrato para envío de emails desacoplado de la infraestructura.
 * @memberof common/domain/ports
 */
export interface EmailPort {
  /**
   * Envía un email simple.
   * @param to Destinatario
   * @param subject Asunto
   * @param body Cuerpo del mensaje
   */
  sendMail(to: string, subject: string, body: string): Promise<void>;
}

/**
 * InjectionToken para EmailPort.
 */
export const EMAIL_PORT = Symbol('EMAIL_PORT');
