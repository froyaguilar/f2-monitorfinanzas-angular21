/**
 * Definición de las rutas principales de la aplicación.
 * Mapea las URL a los componentes de vista correspondientes siguiendo el patrón MVC.
 */
import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
