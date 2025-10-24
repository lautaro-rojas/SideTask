# Change Log

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere al [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Vista Principal:** Se añade un nuevo ícono en la Barra de Actividad con una Vista de Árbol (Tree View) para "Project TODOs".
- **Escáner de Workspace:** Escanea todos los archivos del proyecto en busca de palabras clave (`TODO:`, `FIXME:`, `HACK:`), ignorando `node_modules`.
- **Agrupación Lógica:** Muestra los TODOs encontrados en la Vista de Árbol, agrupados por el archivo al que pertenecen.
- **Navegación Rápida (Click-to-Go):** Al hacer clic en un ítem de TODO en la vista, se abre el archivo y el cursor salta a la línea correspondiente.
- **Actualización Manual:** Se añade un botón de "Refrescar TODOs" (ícono 🔄) en la cabecera de la vista para forzar un re-escaneo.
- **Actualización Automática:** La vista de TODOs se refresca automáticamente cada vez que se guarda un archivo en el editor (`onDidSaveTextDocument`).
- **Panel de Configuración:** Se añade una sección "SideTask TODO Tracker" en la Configuración de VS Code.
- **README:** Información en los README y se agrega compatibilidad con Español e Inglés.
<!-- 
- **Ajuste de Palabras Clave:** Se añade la configuración `sidetask.keywords` (con `["TODO", "FIXME", "HACK"]` por defecto) para que el usuario pueda personalizar los términos de búsqueda.
-->
### Changed


### Removed

<!-- 
## [v0.2.0] - 2025-10-DD
Esta sección documenta todos los cambios preparados para la primera versión (v0.2.0).

### Added
- **Ajuste de Palabras Clave:** Se añade la configuración `sidetask.keywords` (con `["TODO", "FIXME", "HACK"]` por defecto) para que el usuario pueda personalizar los términos de búsqueda.

### Fixed

### Changed

### Removed
-->

## [v0.1.1] - 2025-10-24
Esta sección documenta todos los cambios preparados para la versión v0.1.1.

### Added
- **README.es:** Se añade un README en idioma Español.

### Fixed
- **README:** Se actualiza la información del README.

### Changed
- **Icon:** Se cambia el icono de la tienda.

### Removed

## [v0.1.0] - 2025-10-22
Esta sección documenta todos los cambios preparados para la versión v0.1.0.

### Added

- **Vista Principal:** Se añade un nuevo ícono en la Barra de Actividad con una Vista de Árbol (Tree View) para "Project TODOs".
- **Escáner de Workspace:** Escanea todos los archivos del proyecto en busca de palabras clave (`TODO:`, `FIXME:`, `HACK:`), ignorando `node_modules`.
- **Agrupación Lógica:** Muestra los TODOs encontrados en la Vista de Árbol, agrupados por el archivo al que pertenecen.
- **Navegación Rápida (Click-to-Go):** Al hacer clic en un ítem de TODO en la vista, se abre el archivo y el cursor salta a la línea correspondiente.
- **Actualización Manual:** Se añade un botón de "Refrescar TODOs" (ícono 🔄) en la cabecera de la vista para forzar un re-escaneo.
- **Actualización Automática:** La vista de TODOs se refresca automáticamente cada vez que se guarda un archivo en el editor (`onDidSaveTextDocument`).
- **Panel de Configuración:** Se añade una sección "SideTask TODO Tracker" en la Configuración de VS Code.

### Fixed

### Changed

### Removed

[unreleased]: https://github.com/lautaro-rojas/SideTask
[v0.2.0]: https://github.com/lautaro-rojas/SideTask
[v0.1.1]: https://github.com/lautaro-rojas/SideTask
[v0.1.0]: https://github.com/lautaro-rojas/SideTask