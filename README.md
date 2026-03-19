# 🚀 Angular 21 + Playwright: Dashboard Cripto Profesional

Este proyecto es una implementación avanzada de **Angular v21** que sigue el patrón de arquitectura **MVC (Modelo-Vista-Controlador)** para una organización de código escalable y profesional.

## 🏗️ Estructura del Proyecto (MVC)

El proyecto está organizado de la siguiente manera:
- **`src/app/core/`**: Configuración global, interceptores y rutas. (El "motor" de la aplicación).
- **`src/app/models/`**: Definición de datos y tipos.
- **`src/app/services/`**: Lógica de negocio y llamadas a APIs externas.
- **`src/app/views/`**: Componentes autónomos (Standalone) que actúan como la interfaz de usuario.

---

## 💎 Características Principales

### 📈 Signals Reactivas y Computed (Angular 21)
- Utilizamos **Angular Signals** para un manejo del estado ultra-rápido y eficiente.
- Implementación de **`computed()`** para la conversión automática de divisas (USD a MXN) sin procesos redundantes.
- Uso del **`CurrencyPipe`** para un formateo de moneda profesional y localizado.

---

## 🛡️ Estrategia de Pruebas (Inteligentes)

Hemos reemplazado los tests unitarios tradicionales y frágiles por **Pruebas de Integración y End-to-End (E2E)** potentes:

### 🎭 Playwright & End-to-End (E2E)
**¿Qué es E2E?**
Las pruebas **End-to-End (Extremo a Extremo)** simulan el comportamiento real de un usuario en el navegador. A diferencia de las pruebas unitarias que prueban funciones aisladas, el E2E verifica que TODO el sistema funcione: desde la llamada a la API hasta que los datos aparecen pintados en la pantalla con el estilo correcto.

**Implementación:**
- **Localización:** Los tests residen en la carpeta `tests/` en la raíz del proyecto.
- **Flujos verificados:** 
    - Navegación entre vistas (Home -> Cryptos -> Stocks).
    - Carga real de datos desde APIs externas.
    - **Visual Testing:** Verificación de que el diseño Navy Minimalista y los estados de error se vean correctamente (e.g. `error-visual.spec.ts`).

**Para ejecutar las pruebas:**
```bash
# Ejecutar todas las pruebas en segundo plano
npx playwright test

# Ejecutar una prueba específica viendo el navegador (Headed)
npx playwright test tests/error-visual.spec.ts --headed
```

---

## 🛠️ Tecnologías Utilizadas
- **Angular 21** (Standalone Components + Signals)
- **Playwright** (E2E Testing en Chrome/Edge real)
- **Vitest** (Unit Testing de alto rendimiento)
- **Prettier** (Estilo de código impecable)

---
*Desarrollado con pasión para un aprendizaje profesional de Angular.*
