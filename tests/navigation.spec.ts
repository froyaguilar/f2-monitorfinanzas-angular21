import { test, expect } from '@playwright/test';

/**
 * 🕵️ TEST E2E: Navegación Inteligente (MVC Dashboard)
 * 
 * Verificamos el flujo completo de la App Financial v21. 
 * Usamos los roles semánticos (heading, link) para máxima robustez.
 */
test.describe('Dashboard Financiero MVC v21', () => {

  test('debe navegar del Dashboard a Cryptos y luego a Stocks con datos reales', async ({ page }) => {
    // 1. Ir a la raíz (Esperamos a que la red esté tranquila)
    await page.goto('/', { waitUntil: 'networkidle' });

    // ✅ MEJOR PRÁCTICA (getByRole): Más robusto que un selector CSS genérico
    const dashboardTitle = page.getByRole('heading', { name: /Monitor de Finanzas/i });
    await expect(dashboardTitle).toBeVisible({ timeout: 10000 });

    // 2. Acción: Entrar al panel de Criptomonedas
    await page.getByText(/Ir al Panel Cripto/i).click();
    await expect(page).toHaveURL(/.*cryptos/);
    await expect(page.getByRole('heading', { name: /Criptomonedas/i })).toBeVisible();

    // 3. Verificación de Datos (Integración con API)
    const btcSymbol = page.locator('#price-usd-btc');
    await expect(btcSymbol).toBeVisible({ timeout: 15000 });
    await expect(btcSymbol).not.toHaveText('$0.00');

    // 4. Navegación Global a Stocks (desde el Shell)
    await page.getByRole('link', { name: /stocks/i }).click();
    await expect(page).toHaveURL(/.*stocks/);
    await expect(page.getByRole('heading', { name: /Mercado de Valores/i })).toBeVisible();

    // 5. Verificación de Lógica Financiera (NVDA)
    await expect(page.locator('text=NVIDIA Corp')).toBeVisible();
    await expect(page.locator('text=$180.74')).toBeVisible();

    console.log('✅ TEST SUPERADO TRAS CORRECCIÓN ZONELESS.');
  });

});
