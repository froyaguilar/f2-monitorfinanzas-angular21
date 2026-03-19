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
}

// Ejemplo: Una Acción SIEMPRE tendrá estos 4 campos
export interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
}
// Análisis de sentimiento guardado en MongoDB y enriquecido por Groq IA.
// Los campos coinciden EXACTAMENTE con el AnalysisResponse.java del backend.
export interface AnalysisItem {
  id: string;
  asset: string;
  comment: string;
  sentiment: string;    // "Bullish", "Bearish" o "Neutral" (determinado por Groq IA)
  confidence: number;   // Porcentaje de confianza: 0-100 (ej: 87)
  createdAt: string;    // ISO 8601 timestamp. Ej: "2026-03-19T22:15:00Z"
}

