/**
 * Servicio de comunicación con la API.
 * Encapsula las llamadas HTTP y la lógica de obtención de datos.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  // Ejemplo de método para obtener datos
  getData() {
    return { status: 'success', data: [] };
  }
}
