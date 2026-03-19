import { Component, signal, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AnalysisService } from '../../services/analysis.service';

/**
 * SentimentAnalysisComponent - VISTA de Análisis de Sentimiento
 *
 * Esta vista conecta dos tecnologías clave de Angular:
 *
 *   REACTIVE FORMS → Gestionan el INPUT del usuario (asset, comment)
 *     - Validaciones declarativas (required, minLength)
 *     - Estado del formulario (valid, invalid, touched, pristine)
 *
 *   SIGNALS → Gestionan el ESTADO de la UI (loading, success, feed)
 *     - isAnalyzing: muestra spinner y desactiva botón
 *     - successMessage: mensaje temporal tras guardar
 *     - analyses: el feed de análisis en tiempo real desde el servicio
 *
 *   GROQ IA → El backend determina Bullish/Bearish/Neutral + % confianza
 *
 * Flujo completo:
 *   1. Usuario escribe asset + comment en el formulario
 *   2. submitAnalysis() llama al AnalysisService
 *   3. El servicio hace POST al backend Spring Boot
 *   4. Spring llama a Groq IA y guarda en MongoDB
 *   5. El Signal se actualiza y el feed se refresca automáticamente
 */
@Component({
  selector: 'app-sentiment-analysis',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.css'
})
export class SentimentAnalysisComponent implements OnInit {

  // ============================================================
  // DEPENDENCIAS
  // ============================================================
  private analysisSvc = inject(AnalysisService);

  // ============================================================
  // SIGNALS: Estado de la UI (Output)
  // ============================================================

  /** Verdadero mientras el backend/IA está procesando */
  isAnalyzing = signal(false);

  /** Mensaje de éxito o error temporal */
  successMessage = signal('');

  /** Feed reactivo: cuando el servicio actualiza, la UI se refresca sola */
  readonly analyses = this.analysisSvc.analyses;

  // ============================================================
  // REACTIVE FORMS: Estado del formulario (Input)
  // ============================================================

  /**
   * FormGroup agrupa controles relacionados.
   * Validators.required y Validators.minLength son síncronos.
   */
  analysisForm = new FormGroup({
    asset:   new FormControl('', [Validators.required, Validators.minLength(2)]),
    comment: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  // ============================================================
  // CICLO DE VIDA
  // ============================================================

  /**
   * ngOnInit: carga el historial de análisis desde MongoDB al entrar.
   * Solo carga una vez al inicializar, eficiente.
   */
  async ngOnInit(): Promise<void> {
    await this.analysisSvc.loadAnalyses();
  }

  // ============================================================
  // ACCIONES
  // ============================================================

  /**
   * Envía el formulario al backend:
   *   1. Activa el spinner (Signal)
   *   2. POST al backend → Groq IA → MongoDB
   *   3. El feed Signal se actualiza automáticamente
   *   4. Muestra mensaje de éxito y limpia el formulario
   */
  async submitAnalysis(): Promise<void> {
    if (this.analysisForm.invalid) return;

    this.isAnalyzing.set(true);
    this.successMessage.set('');

    const { asset, comment } = this.analysisForm.value;

    try {
      const result = await this.analysisSvc.saveAnalysis(asset!, comment!);
      this.successMessage.set(
        `¡IA determinó: ${result.sentiment} con ${result.confidence}% de confianza! ✅`
      );
      this.analysisForm.reset();
      setTimeout(() => this.successMessage.set(''), 6000);
    } catch (error) {
      this.successMessage.set('❌ Error al conectar con el servidor. ¿Está corriendo Spring Boot?');
      console.error('Error al guardar análisis:', error);
    } finally {
      // Siempre desactivamos el spinner, incluso si hay error
      this.isAnalyzing.set(false);
    }
  }

  // ============================================================
  // HELPERS DE PRESENTACIÓN
  // ============================================================

  /**
   * Devuelve la clase CSS según el sentimiento.
   * Mantenemos la lógica de presentación aquí, no en el template.
   */
  getSentimentClass(sentiment: string): string {
    if (sentiment === 'Bullish') return 'bullish';
    if (sentiment === 'Bearish') return 'bearish';
    return 'neutral';
  }

  /**
   * Devuelve el emoji según el sentimiento.
   */
  getSentimentEmoji(sentiment: string): string {
    if (sentiment === 'Bullish') return '🚀';
    if (sentiment === 'Bearish') return '📉';
    return '⚖️';
  }
}
