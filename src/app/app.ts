/**
 * Componente raíz de la aplicación (Shell).
 * Este componente es el encargado de arrancar la aplicación y servir como contenedor base.
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
