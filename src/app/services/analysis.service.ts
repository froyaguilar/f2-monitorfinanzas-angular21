import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AnalysisItem } from '../models/financial.model';

/**
 * AnalysisService - Servicio de Análisis de Sentimiento
 *
 * Responsabilidad: gestionar el estado reactivo del feed de análisis
 * y comunicarse con el backend Spring Boot.
 *
 * Arquitectura de Signals:
 *   - _analyses (private): el estado interno, solo se modifica aquí
 *   - analyses (public readonly): lo que los componentes leen de forma reactiva
 *
 * La UI se actualiza automáticamente cuando cualquier Signal cambia.
 * Esto es parte de la Detección de Cambios "Zoneless" de Angular 21.
 */
@Injectable({
  providedIn: 'root'  // Singleton: una sola instancia para toda la app
})
export class AnalysisService {

  /** URL base del backend Spring Boot */
  private readonly API_URL = 'http://localhost:8080/api/v1/analyses';

  // ============================================================
  // ESTADO REACTIVO: Signals
  // ============================================================

  /** Feed privado de análisis. Solo se modifica dentro del servicio. */
  private _analyses = signal<AnalysisItem[]>([]);

  /** Feed público: los componentes se suscriben a este Signal. */
  readonly analyses = this._analyses.asReadonly();

  /**
   * Inyección de HttpClient por constructor.
   * Angular lo resuelve automáticamente gracias a provideHttpClient()
   * registrado en app.config.ts.
   */
  constructor(private http: HttpClient) {}

  /**
   * Carga todos los análisis desde MongoDB al iniciar la vista.
   * Llamado desde el componente en ngOnInit.
   */
  async loadAnalyses(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<AnalysisItem[]>(this.API_URL)
      );
      // Actualizamos el Signal: el feed se refresca automáticamente
      this._analyses.set(data);
    } catch (error) {
      console.error('❌ Error cargando análisis del backend:', error);
    }
  }

  /**
   * Envía el comentario al backend Spring Boot, que:
   *   1. Llama a Groq IA para determinar el sentimiento y porcentaje
   *   2. Guarda el resultado en MongoDB
   *   3. Devuelve el análisis completo
   *
   * Luego actualizamos el Signal para que el feed se refresque solo.
   *
   * @param asset   El símbolo del activo (ej: "BTC", "AAPL")
   * @param comment El comentario del usuario sobre el activo
   * @returns El AnalysisItem guardado con el sentimiento determinado por IA
   */
  async saveAnalysis(asset: string, comment: string): Promise<AnalysisItem> {
    // POST al backend → Groq analiza → MongoDB guarda → retorna resultado
    const newAnalysis = await firstValueFrom(
      this.http.post<AnalysisItem>(this.API_URL, { asset, comment })
    );

    // Añadimos al INICIO del Signal (los más recientes primero)
    this._analyses.update(prev => [newAnalysis, ...prev]);

    return newAnalysis;
  }
}
