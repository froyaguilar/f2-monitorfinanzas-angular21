import { Component, inject, computed, OnInit } from '@angular/core';
import { CurrencyPipe, PercentPipe, NgClass } from '@angular/common';
import { StockService } from '../../services/stock.service';

/**
 * 📈 COMPONENTE: StocksComponent (Vista)
 * 
 * Este componente visualiza las acciones tecnológicas "Las 7 Magníficas"
 * y permite probar el REPORTE DE ERRORES gracias al interceptor HTTP.
 */
@Component({
  selector: 'app-stocks',
  standalone: true,
  /**
   * 🛠️ UTILIDADES DE UI (Pipes & Directives)
   * CurrencyPipe: Formatea números como moneda ($1,234.56).
   * PercentPipe: Formatea decimales como porcentajes (e.g. 0.025 -> 2.5%).
   * NgClass: Aplica clases CSS dinámicamente basadas en condiciones.
   */
  imports: [CurrencyPipe, PercentPipe, NgClass],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit {
  /**
   * 💉 INYECCIÓN: StockService (Model/Service)
   */
  private readonly stockSvc = inject(StockService);

  /**
   * 📦 STOCKS MARKET (SIGNAL)
   */
  stocks = this.stockSvc.stocksArr;

  /**
   * ⏳ ESTADO DE CARGA Y ERROR: Basado en las señales del servicio
   */
  loadStatus = computed(() => {
    if (this.stockSvc.hasError()) return -1; // 🚩 ERROR
    return this.stocks().length > 0 ? 1 : 0; // ⌛ CARGANDO O LISTO (1)
  });

  /**
   * 💰 VALOR TOTAL (SIGNAL COMPUTADA)
   * Ejemplo de transformación automática: Si la lista 'stocks' cambia, 
   * este valor se recalcula instantáneamente sin procesos manuales (MVC).
   */
  marketCapSum = computed(() => {
    return this.stocks().reduce((acc, stock) => acc + stock.price, 0);
  });

  /**
   * 🔄 INICIALIZACIÓN: Carga lazy de acciones
   */
  ngOnInit() {
    this.stockSvc.loadStocks();
  }

  /**
   * 🟢 ACCIÓN: Intentar reconectar con la bolsa de valores
   */
  onRefresh() {
    this.stockSvc.refreshStocks();
  }
}
