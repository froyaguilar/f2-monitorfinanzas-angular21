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
   * 📊 SEÑALES: Obtenemos los datos reactivos del servicio
   */
  allCoins = this.cryptoSvc.cryptos;

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
