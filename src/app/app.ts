/**
 * COMPONENTE RAÍZ DE LA APLICACIÓN (SHELL - LOGICA - TS)
 * 
 * Este es el componente principal que envuelve a toda la aplicación.
 */
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  /**
   * 🛠️ IMPORTACIONES DE NAVEGACIÓN (Directivas de Router)
   * RouterOutlet: Es el hueco/marcador donde se renderiza el componente de la ruta activa.
   * RouterLink: Directiva para crear enlaces que navegan sin recargar la página (SPA).
   * RouterLinkActive: Permite aplicar una clase CSS (como 'active') cuando la ruta coincide.
   */
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * 🔍 FUNCIÓN: onActivate
   * Esta función se ejecuta cada vez que el <router-outlet /> carga un componente.
   * Un uso muy común es volver el scroll al inicio de la página automáticamente.
   */
  onActivate(componentReference: any) {
    window.scrollTo(0, 0);
    console.log("🚀 Ahora viendo:", componentReference.constructor.name);

    // Si ves este alert, la función SÍ se está ejecutando en tu navegador.
    // alert("¡Componente " + componentReference.constructor.name + " cargado!");
  }
}
