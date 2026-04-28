import { InjectionToken } from '@nestjs/common';

// Definimos el Token para la DI
export const CATEGORIES_SERVICE_PORT: InjectionToken = Symbol('CATEGORIES_SERVICE_PORT');
