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

### 🎭 Playwright
Garantizamos que el flujo real del usuario funcione perfectamente:
- Verificación de la **disponibilidad y carga de APIs externas** (CoinGecko).
- Pruebas de navegación real entre vistas (`/` y `/home`).
- Validación de **renders automáticos** tras cambios de estado en las señales.

**Para ejecutar las pruebas:**
```bash
npm run e2e
```

---

## 🛠️ Tecnologías Utilizadas
- **Angular 21** (Standalone Components + Signals)
- **Playwright** (E2E Testing en Chrome/Edge real)
- **Vitest** (Unit Testing de alto rendimiento)
- **Prettier** (Estilo de código impecable)

---
*Desarrollado con pasión para un aprendizaje profesional de Angular.*
