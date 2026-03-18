import { Routes } from '@angular/router';

// IMPORTS DE LAS VISTAS (MVC - VIEWS)
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { CryptosComponent } from '../views/cryptos/cryptos.component';
import { StocksComponent } from '../views/stocks/stocks.component';

/**
 * 🛣️ SISTEMA DE RUTAS (app.routes.ts)
 * 
 * En Angular, las rutas asocian una URL con un Componente. 
 * 'path' es lo que el usuario escribe, 'component' es lo que Angular pinta.
 */
export const routes: Routes = [
  /**
   * 🏠 RUTA RAÍZ: Pantalla de Bienvenida (Dashboard)
   * Se muestra cuando entras a la URL base de tu App.
   */
  { path: '', component: DashboardComponent },

  /** 
   * 🪙 RUTA CRIPTOS: Monitor de monedas 
   */
  { path: 'cryptos', component: CryptosComponent },

  /** 
   * 📈 RUTA STOCKS: Mercado de valores (Nasdaq) 
   */
  { path: 'stocks', component: StocksComponent },
  
  /** 
   * 🛠️ COMODÍN (**): Redirección de seguridad
   * Si el usuario escribe una URL que NO existe, lo mandamos a la HOME para no perderlo.
   */
  { path: '**', redirectTo: '' }
];
