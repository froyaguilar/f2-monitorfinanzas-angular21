import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { CryptoItem, StockItem } from '../models/financial.model';

/**
 * 🛠️ SERVICIO: CryptoService
 * 
 * Este servicio implementa un sistema de CACHE y carga bajo demanda.
 * Evita peticiones repetitivas innecesarias y agrupa la lógica para refrescar.
 */
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly http = inject(HttpClient);
  private readonly URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cosmos&vs_currencies=usd,mxn';

  // Almacén privado para la cache de datos
  private cache = signal<CryptoItem[]>([]);
  private error = signal<boolean>(false);
  private loaded = false;

  // Exponemos la señal como de "Solo lectura" para proteger la integridad de los datos (MVC-Model)
  cryptos = this.cache.asReadonly();
  hasError = this.error.asReadonly();

  /**
   * 🛒 CARGA: Solo solicita datos si la cache está vacía (Optimización)
   */
  loadCryptos() {
    if (this.loaded) return;
    this.fetchData().subscribe();
  }

  /**
   * 🔄 REFRESCAR: Fuerza la recarga de los datos (Petición HTTP bajo demanda)
   */
  refreshCryptos() {
    this.fetchData().subscribe();
  }

  /**
   * 🛰️ FETCH: Petición HTTP cruda con operadores de transformación
   */
  private fetchData() {
    return this.http.get<any>(this.URL).pipe(
      map(data => [
        { id: 'btc', name: 'Bitcoin', symbol: 'BTC', usd: data.bitcoin.usd, mxn: data.bitcoin.mxn },
        { id: 'eth', name: 'Ethereum', symbol: 'ETH', usd: data.ethereum.usd, mxn: data.ethereum.mxn },
        { id: 'atom', name: 'Cosmos (Atom)', symbol: 'ATOM', usd: data.cosmos.usd, mxn: data.cosmos.mxn }
      ]),
      tap(data => {
        this.cache.set(data);
        this.error.set(false);
        this.loaded = true;
      }),
      catchError(err => {
        this.error.set(true);
        return of([]); 
      })
    );
  }
}
