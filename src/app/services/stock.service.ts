import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { StockItem } from '../models/financial.model';

/**
 * 🛠️ SERVICIO: StockService
 * 
 * Este servicio intenta conectar con marketdata.app. 
 * Si falla (como se espera sin API Key), el errorInterceptor capturará el fallo.
 */
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly http = inject(HttpClient);
  
  // URL de API REAL (Provocará error 401/404 sin Key para probar interceptor)
  private readonly URL = 'https://api.marketdata.app/v1/stocks/quotes/AAPL,MSFT,GOOGL,AMZN,META,NVDA,TSLA/';

  private cache = signal<StockItem[]>([]);
  private error = signal<boolean>(false);
  private loaded = false;

  // Señales públicas de solo lectura
  stocksArr = this.cache.asReadonly();
  hasError = this.error.asReadonly();

  /**
   * 🛒 CARGA LAZY: Solo descarga si no hay nada en cache
   */
  loadStocks() {
    if (this.loaded) return;
    this.refreshStocks();
  }

  /**
   * 🔄 REFRESCAR: Petición HTTP real a la API externa
   */
  refreshStocks() {
    this.http.get<any>(this.URL).pipe(
      map(resp => {
        // Mapeo básico asumiendo estructura de marketdata.app
        // Si hay error, el map no se ejecutará.
        return resp.map((s: any) => ({
            name: s.symbol,
            symbol: s.symbol,
            price: s.last,
            change: s.change
        }));
      }),
      tap(data => {
        this.cache.set(data);
        this.error.set(false);
        this.loaded = true;
      }),
      catchError(err => {
        // ❌ ACTIVAMOS EL ESTADO DE ERROR (Para probar interceptor)
        this.error.set(true);
        return of([]);
      })
    ).subscribe();
  }
}
