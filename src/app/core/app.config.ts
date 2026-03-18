/**
 * CONFIGURACIÓN GLOBAL DE LA APLICACIÓN (app.config.ts)
 */
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * 🚀 MODO ZONELESS (ESTABLE EN VERSION 21?)
     * Probamos si ya no es experimental.
     */
    provideZonelessChangeDetection(),

    /**
     * Sistema de rutas
     */
    provideRouter(routes),

    /**
     * Cliente HTTP con interceptor para manejo centralizado de errores.
     */
    provideHttpClient(
      withInterceptors([errorInterceptor])
    )
  ]
};
