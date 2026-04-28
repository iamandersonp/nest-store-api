import { InjectionToken } from '@nestjs/common';

// Definimos el Token para la DI
export const CUSTOMERS_SERVICE_PORT: InjectionToken = Symbol('CUSTOMERS_SERVICE_PORT');
