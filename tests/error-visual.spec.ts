import { test, expect } from '@playwright/test';

/**
 * 🕵️ TEST E2E: Manejo de Errores y Estados Visuales (VisTest)
 * 
 * Verificamos que cuando la API de Stocks falla (por URL incorrecta o falta de API Key),
 * el sistema muestra el mensaje de error estilizado correctamente gracias al interceptor.
 */
test.describe('Dashboard Financiero - Control de Errores', () => {

  test('Debe visualizar el estado de error al fallar la API de Stocks', async ({ page }) => {
    // 1. Cargamos la aplicación y vamos directo a la vista de Stocks
    await page.goto('/stocks');

    // 2. Esperamos a que el "Loader" desaparezca y aparezca el mensaje de error
    const errorMessage = page.locator('.status-msg.error');
    
    // Verificamos presencia física y texto esperado
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
    await expect(errorMessage).toContainText('No se pudo obtener la cotización');

    // 3. Comprobamos estilos visuales básicos (Minimalismo Navy / Rojo error)
    const errorColor = await errorMessage.evaluate((el) => window.getComputedStyle(el).color);
    // RGB(244, 63, 94) es el equivalente a la paleta Rose 500 que configuramos en CSS
    expect(errorColor).toBe('rgb(244, 63, 94)');

    // 4. Verificamos que el botón de "Actualizar" siga disponible para reintentar
    const refreshBtn = page.getByRole('button', { name: /actualizar/i });
    await expect(refreshBtn).toBeVisible();

    console.log('✅ VISUAL TEST: Mensaje de error detectado con estilos correctos.');
  });

});
