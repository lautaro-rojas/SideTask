# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Notion Integration:** Add the ability to create cards in Notion.
- **AI Integration:** Add the ability to make queries to the AI within the extension.

### Changed

### Removed

## [v0.2.1] - 2025-10-27
This section documents all changes prepared for version v0.2.1.

### Added

### Fixed
- **Images in README:** Images in readme fixed.

### Changed

## [v0.2.0] - 2025-10-27
This section documents all changes prepared for version v0.2.0.

### Added
- **Keyword Configuration:** Added the `sidetask.keywords` setting (defaulting to `["TODO", "FIXME", "HACK"]`) to allow users to customize search terms.

### Fixed

### Changed

## [v0.1.2] - 2025-10-24
This section documents all changes prepared for version v0.1.2.

### Added

### Fixed

### Changed
- **Icon:** Changed the marketplace icon.

## [v0.1.1] - 2025-10-24
This section documents all changes prepared for version v0.1.1.

### Added
- **Spanish README:** Added a README file in Spanish (`README.es.md`).

### Fixed
- **README:** Updated the main README information.

### Changed
- **Icon:** Changed the marketplace icon.

### Removed

## [v0.1.0] - 2025-10-22
This section documents all changes prepared for version v0.1.0.

### Added

- **Main View:** Added a new icon to the Activity Bar with a Tree View for "Project TODOs".
- **Workspace Scanner:** Scans all project files for keywords (`TODO:`, `FIXME:`, `HACK:`), ignoring `node_modules`.
- **Logical Grouping:** Displays found TODOs in the Tree View, grouped by the file they belong to.
- **Quick Navigation (Click-to-Go):** Clicking a TODO item in the view opens the file and jumps the cursor to the corresponding line.
- **Manual Refresh:** Added a "Refresh TODOs" button (🔄 icon) to the view's header to force a re-scan.
- **Automatic Refresh:** The TODOs view now refreshes automatically whenever a file is saved in the editor (`onDidSaveTextDocument`).
- **Settings Panel:** Added a "SideTask TODO Tracker" section in the VS Code Settings.

### Fixed

### Changed

### Removed

[unreleased]: https://github.com/lautaro-rojas/SideTask
[v0.2.1]: https://github.com/lautaro-rojas/SideTask
[v0.2.0]: https://github.com/lautaro-rojas/SideTask
[v0.1.2]: https://github.com/lautaro-rojas/SideTask
[v0.1.1]: https://github.com/lautaro-rojas/SideTask
[v0.1.0]: https://github.com/lautaro-rojas/SideTask