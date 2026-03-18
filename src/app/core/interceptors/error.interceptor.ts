import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * 🛠️ INTERCEPTOR: errorInterceptor
 * 
 * Este interceptor captura todos los errores de las peticiones HTTP (404, 500, etc.)
 * de forma centralizada. Es ideal para mostrar Toasts globales o loggear errores.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      // 📝 Log centralizado del error
      console.error('🚀 [HTTP Error Interceptor]:', {
        url: req.url,
        status: err.status,
        message: err.message
      });

      // Podrías añadir lógica de:
      // - Redirect si es 401
      // - Mostrar notificación si es 500
      
      return throwError(() => err);
    })
  );
};
