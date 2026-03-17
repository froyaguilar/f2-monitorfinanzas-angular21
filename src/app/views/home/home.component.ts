/**
 * Componente de la vista de inicio (Home).
 * Contiene la lógica y el diseño principal de la página de bienvenida.
 */
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly title = signal('angular21');
}
