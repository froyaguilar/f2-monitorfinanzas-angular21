import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * 🏠 COMPONENTE: DashboardComponent
 * Representa la pantalla de bienvenida del sistema.
 * 
 * Se ha separado el HTML y el CSS en archivos independientes para 
 * mantener un código más limpio y profesional (Separation of Concerns).
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {}
