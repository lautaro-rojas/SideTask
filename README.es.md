# SideTask - Gestor todo en uno de TODOs Inteligente

<p align="center">
  <img src="https://github.com/lautaro-rojas/SideTask/blob/main/images/SideTask-Logo.png?raw=true" alt="Logo de SideTask" width="128" />
  <br/>
  <strong>Toda la lista de TODOs de tu código, en un solo lugar.</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LautaroRojas.sidetask">
    <img src="https://img.shields.io/visual-studio-marketplace/v/LautaroRojas.sidetask?style=for-the-badge&label=Marketplace&color=blue" alt="Versión del Marketplace"/>
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LautaroRojas.sidetask">
    <img src="https://img.shields.io/visual-studio-marketplace/d/LautaroRojas.sidetask?style=for-the-badge&label=Instalaciones" alt="Instalaciones del Marketplace"/>
  </a>
</p>

**SideTask** es una potente extensión para VS Code que encuentra todos los TODOs, FIXMEs y otros comentarios de tareas esparcidos por tu proyecto y los reúne en una vista organizada en tu barra de actividad.

Deja de perder el rastro de tareas pendientes y deuda técnica. Si está en tu código, está en tu lista.

---

## Características (v0.2.0)

Esta es la primera versión de SideTask, enfocada en las características esenciales para organizarte:

* **🌲 Vista de Árbol Unificada:** Mira todas las tareas encontradas en una vista de árbol limpia y colapsable, organizadas por archivo.
* **⌨️ Palabras Clave por Defecto:** Escanea automáticamente tu proyecto en busca de `TODO:`, `FIXME:` y `HACK:`.
* **⌨️ Palabras Clave Propias:** Escanea automáticamente tu proyecto en busca de la/s palabras que agregues en la configuración.
* **🖱️ Clic para Ir:** Salta instantáneamente a la línea exacta de cualquier tarea en tu código con solo un clic en el panel lateral.
* **🔄 Refresco Manual:** Un simple botón de "Refrescar" en la barra de título de la vista para volver a escanear tu espacio de trabajo en cualquier momento.
* **🔄 Refresco Automático:** La extensión va a re-escanear el proyecto cada vez que se guarda un archivo (ctrl+,).

<!--- 
![Captura de SideTask (Demo)](URL_DEL_GIF_O_IMAGEN_DE_TU_EXTENSION_AQUI)
*(Te recomiendo 100% que grabes un GIF corto mostrando la extensión en acción y reemplaces esta línea)*
--->
## Cómo Empezar

1.  Instala la extensión **SideTask** desde el Marketplace de VS Code.
2.  Abre un proyecto.
3.  Haz clic en el nuevo **ícono de SideTask** en tu Barra de Actividad (la barra lateral a la izquierda).
4.  El panel se poblará automáticamente con todas las tareas encontradas en tu código.
5.  ¡Haz clic en cualquier tarea para saltar directamente al archivo!

## ¿Cómo puedo agregar mi propia plabra?
1.  Ir a Archivo -> Preferencias -> Configuración (o atajo ctrl+,).
2.  Buscar "SideTask".
3.  Ir a la opción SideTask: Keywords.
4.  Seleccionar el botón "Agregar elemento".
5.  Escribir tu palabra.
![Captura configuarción palabras SideTask](https://raw.githubusercontent.com/lautaro-rojas/SideTask/main/images/SideTask-ConfigKeywords-es.png)

## ¿Qué Sigue? (Roadmap)

SideTask recién está comenzando. Nuestro objetivo es convertir esta en la herramienta de gestión de tareas *definitiva* para desarrolladores, directamente dentro del editor. Esto es lo que está planeado:

* **✨ Resaltado Personalizado:** Define tus propias palabras clave (como `NOTA:`, `BUG:`) y asígnales colores personalizados.
* **🎛️ Filtros Avanzados:** Filtra tareas por palabra clave, etiqueta o archivo.
* **⚡ Snippets Inteligentes:** Crea rápidamente nuevos ítems TODO con atajos de teclado.
* **🚀 [PRO] Integraciones:** Conecta SideTask con tus herramientas favoritas como **Notion**, **Jira** y **Trello** para convertir comentarios de código en tareas reales.
* **🚀 [PRO] Integraciones con IA:** Conecta SideTask con tu IA favoritas como **Chat GPT**.

## Apoya el Proyecto

Este es un proyecto *indie* construido con ❤️. Si encuentras útil SideTask, por favor considera apoyar su desarrollo:

* Deja una reseña de ⭐️⭐️⭐️⭐️⭐️ en el [Marketplace](https://marketplace.visualstudio.com/items?itemName=LautaroRojas.sidetask).
* Reporta errores o solicita características en nuestros [Issues de GitHub](https://github.com/lautaro-rojas/SideTask/issues).
* [¡Invítame un café!](https://buymeacoffee.com/lautarorojas)

## Licencia

Esta extensión está bajo la [Licencia MIT](LICENSE.md).
