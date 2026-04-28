import { InjectionToken } from '@nestjs/common';

// Definimos el Token para la DI
export const BRANDS_SERVICE_PORT: InjectionToken = Symbol('BRANDS_SERVICE_PORT');
