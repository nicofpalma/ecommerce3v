# 3v Juegos - Tu Zona de Juegos

Este proyecto es un sitio web que ofrece distintos videojuegos para los usuarios. Este sitio permite agregar juegos al carrito, registrarse e iniciar sesión. Todo el manejo de usuarios y carrito de hace con LocalStorage y SessionStorage.
Los juegos se cargan dinámicamente a través de una [API pública de juegos, llamada jsonfakery.](https://jsonfakery.com/games).
Toda la web es responsive. Se usaron algunas características de bootstrap como la navbar, toasts de errores y mensajes de éxito, y algunas clases css que ayudan con el responsive.

---

## **Características Principales**

- **Registro y Login**: Permite a los usuarios registrarse y acceder con su usuario y contraseña (guardado en LocalStorage, y al iniciar sesión se crea una sesión con SessionStorage).
- **Inicio**: Donde se cargan los juegos, se ven reseñas, un mapa de google maps simulando la ubicación y un formulario de contacto.
- **Exploración de Juegos**: Los usuarios pueden navegar y ver detalles sobre los juegos disponibles. Las "ofertas" se calculan a través de un algoritmo que ideé a través de la información que dispone la API, como cantidad de reseñas, cantidad de categorías y géneros que contiene, entre otros. Los juegos "nuevos", son juegos que tienen 5 años o menos desde la fecha que fueron publicados.
- **Carrito de Compras**: Gestión dinámica del carrito, incluyendo incremento/disminución de cantidades y eliminación de juegos.

---

## **Tecnologías Utilizadas**

### Frontend
- **HTML** y **CSS**: Para estructura y estilos de la web.
- **JavaScript**: Para las interacciones dinámicas y gestión de datos.
- **Bootstrap 5**: Utilizado para algunos componentes y clases css predefinidas que facilitan la programación de algunos componentes.

### Backend
- **LocalStorage/SessionStorage**: Simula un backend ligero para almacenar datos como usuarios, juegos y carrito de compras.

### Hosting
- **Netlify**: Implementación de la web con soporte para redirecciones y optimización automática. La web está desplegada en [https://3vjuegos.netlify.app/](https://3vjuegos.netlify.app/).


## **Estructura del Proyecto**

```
/
├── assets/
│   └── img/               # Imágenes  
├── js/
│   ├── utils.js           # Funciones que se usan en varias secciones
│   ├── register-login.js  # Funciones de registro y login
│   ├── carrito.js         # Funciones de carrito de compras
│   └── index.js           # Funciones para el index
├── index.html             # Página principal
├── carrito.html           # Página del carrito
├── registro.html          # Página de registro
├── login.html             # Página de login
└── README.md              # Esta documentación
```

## **Autor**

**Nicolás Fernández Palma**

2024. Todos los derechos reservados.
