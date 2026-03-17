/**
 * Configuración global de la aplicación.
 * Define los proveedores necesarios para el funcionamiento de la aplicación Angular,
 * incluyendo la configuración de rutas y otros servicios globales.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
