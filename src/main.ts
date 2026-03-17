/**
 * Punto de entrada de la aplicación Angular.
 * Este archivo inicializa y arranca la aplicación utilizando el componente 'App' 
 * y la configuración definida en 'appConfig'.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
