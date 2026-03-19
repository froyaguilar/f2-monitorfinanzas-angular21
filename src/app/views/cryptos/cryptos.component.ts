import { Component, inject, computed, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';

/**
 * 🪙 COMPONENTE: CryptosComponent
 * Consume los datos del CryptoService y maneja el refresco bajo demanda.
 */
@Component({
  selector: 'app-cryptos',
  standalone: true,
  /**
   * 🛠️ UTILIDADES DE UI (Pipes)
   * CurrencyPipe: Transforma números en formato de moneda local/extranjera.
   */
  imports: [CurrencyPipe],
  templateUrl: './cryptos.component.html',
  styleUrl: './cryptos.component.css'
})
export class CryptosComponent implements OnInit {
  /**
   * 💉 INYECCIÓN: CryptoService
   */
  private readonly cryptoSvc = inject(CryptoService);

  /**
   * 📊 SEÑALES REACTIVAS
   * cryptos: Lista base en USD.
   * rate: Tasa de cambio actual.
   */
  private rawCoins = this.cryptoSvc.cryptos;
  private rate = this.cryptoSvc.exchangeRate;

  /**
   * 💰 CONVERSIÓN DINÁMICA (COMPUTED)
   * ¡Aquí ocurre la magia! No guardamos el MXN en la base de datos ni en el model.
   * Se calcula al vuelo solo cuando rawCoins o rate cambian. 
   * Sin procesos redundantes y 100% reactivo.
   */
  allCoins = computed(() => {
    return this.rawCoins().map(coin => ({
      ...coin,
      mxn: coin.usd * this.rate()
    }));
  });

  /**
   * ⏳ ESTADO: Determina si estamos cargando (0), éxito (1) o error (-1)
   */
  loadStatus = computed(() => {
    if (this.cryptoSvc.hasError()) return -1;
    return this.allCoins().length > 0 ? 1 : 0;
  });

  /**
   * 🔄 INICIALIZACIÓN: Cargamos las criptomonedas al entrar (Lazy-loading)
   */
  ngOnInit() {
    this.cryptoSvc.loadCryptos();
  }

  /**
   * 🟢 ACCIÓN: Permite al usuario forzar el refresco de los precios
   */
  onRefresh() {
    this.cryptoSvc.refreshCryptos();
  }
}
