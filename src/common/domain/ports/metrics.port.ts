export const METRICS_PORT = Symbol('METRICS_PORT');

export interface MetricsPort {
  /**
   * Registra una métrica con valor opcional y tags.
   * @param metric Nombre de la métrica
   * @param value Valor numérico (opcional)
   * @param tags Tags opcionales ({ clave: valor })
   */
  record(metric: string, value?: number, tags?: Record<string, string>): void;
}
