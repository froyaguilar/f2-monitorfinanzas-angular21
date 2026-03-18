/**
 * 💹 MODELOS FINANCIEROS (src/app/models/financial.model.ts)
 * 
 * En MVC, el Modelo es el "PLANO" de tus datos. 
 * TypeScript usa interfaces para asegurar que nunca te equivoques de nombre.
 */

// Ejemplo: Una Cripto SIEMPRE tendrá estos 5 campos
export interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  usd: number;
  mxn: number;
}

// Ejemplo: Una Acción SIEMPRE tendrá estos 4 campos
export interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
}
