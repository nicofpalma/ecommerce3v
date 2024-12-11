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
