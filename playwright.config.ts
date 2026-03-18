import { defineConfig, devices } from '@playwright/test';

/**
 * CONFIGURACIÓN DE PLAYWRIGHT PARA ANGULAR
 * 
 * Este archivo le dice a Playwright cómo probar tu aplicación.
 */
export default defineConfig({
  testDir: './tests',
  /* Ejecutar tests en archivos en paralelo */
  fullyParallel: true,
  /* Reintentar fallos en el servidor CI */
  retries: process.env.CI ? 2 : 0,
  /* Opt-out del reportero por defecto si el servidor CI lo pide */
  reporter: 'html',
  /* Configuración global para los tests */
  use: {
    /* Dirección base donde corre tu app con 'ng serve' */
    baseURL: 'http://localhost:4200',
    /* Capturar trazas de errores para debuggear */
    trace: 'on-first-retry',
  },

  /* Probar en navegadores que ya tienes instalados en tu PC */
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
