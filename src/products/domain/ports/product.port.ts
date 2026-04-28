import { InjectionToken } from '@nestjs/common';

// Definimos el Token para la DI
export const PRODUCTS_SERVICE_PORT: InjectionToken = Symbol('PRODUCTS_SERVICE_PORT');
