# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Markdown Support (`.todo`):** Allows you to manage tasks in dedicated `.md` or `.todo` files. It recognizes Markdown task syntax and adds them to the tree view.
    - Editing Commands: Enter creates a new [ ]. Tab indents the task.
    - Implements the functionality of [ ] or [x]. Recognizes Markdown task syntax and adds them to the tree view.
- **Enriched Syntax:** The extension learns to "read" the contents of the TODO. The parser now recognizes special patterns:
  - **Tags:** `// TODO: Fix this #bug #ui`
  - **Dates:** `// REFACTOR: Clean this @due:2025-12-01`
  - **Status:** `// TODO: Implement function @done`  vs `// TODO: Implement function @pending`

- **Snippets:** Quickly create new TODO items with snippets. Type TODO and press Tab autocomplete // TODO: [ ].
- **Keyboard shortcuts:** Quickly create new TODO items with keyboard shortcuts.
- **Icons:** Display a different icon for each keyword type.
- **Secure Authentication:** A system for users to securely store their API keys from external services (Notion, Jira). It uses the VS Code API's Secret Storage.
- **Notion Integration:** Add the ability to create cards in Notion.
    - Syncs TODOs with a Notion database.
    - One command (right-click on a TODO) -> "Send to Notion".
    - Configures to map keywords/tags to Notion properties.
    - Two-way synchronization. If you mark the task as "Done" in Notion, the code comment is updated to `// TODO: [x]`.
- **Jira Integration:** Add the ability to create cards in Jira.
- **Trello Integration:** Add the ability to create cards in Trello.
- **Google Tasks Integration:** Add the ability to create cards in Google Tasks.
- **Chat GPT Integration:** Add the ability to make queries to the AI within the extension.
- **Bug 1 - Settings UI:** The settings UI doesn't display the correct wording and colors. It shows "Edit in settings.json"
- **Right-Click Menu 2:** Context Actions: "Edit line".

### Changed

### Removed

<!--
## [v0.2.X] - 2025-10-2X
This section documents all changes prepared for version v0.2.X.

### Added

### Fixed

### Changed
-->


## [v0.3.0] - 2025-10-2X
This section documents all changes prepared for version v0.2.4.

### Added
- **Highlighting in the Editor:** Highlights the entire comment line within the code editor based on the keyword. The colors are customizable. Background and font color.
- **Filtering:** Filter tasks by keyword.
- **Right-Click Menu 1:** Context Actions like "Go to file", "Delete line", "Copy line".

### Fixed
- **Bug 2 - Color in deleted line:** When I delete the line from //TODO: ... which has a color, the line below rises and takes the color of the deleted line.

### Changed

## [v0.2.3] - 2025-10-28
This section documents all changes prepared for version v0.2.3.

### Added

### Fixed

### Changed
- **README:** Update README.md with images.

## [v0.2.2] - 2025-10-28
This section documents all changes prepared for version v0.2.2.

### Added
- **Video in README:** Video demo in README.md

### Fixed

### Changed
- **Extension dispay name:** Extension name displayed in the marketplace has been changed.
- **Extension description:** The language of the extension description displayed in the marketplace has been changed.
- **README:** Update README.md
- **CHANGELOG:** Update CHANGELOG.md

## [v0.2.1] - 2025-10-27
This section documents all changes prepared for version v0.2.1.

### Added

### Fixed
- **Images in README:** Images in README.md fixed.

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
[v0.3.0]: https://github.com/lautaro-rojas/SideTask
[v0.2.3]: https://github.com/lautaro-rojas/SideTask
[v0.2.2]: https://github.com/lautaro-rojas/SideTask
[v0.2.1]: https://github.com/lautaro-rojas/SideTask
[v0.2.0]: https://github.com/lautaro-rojas/SideTask
[v0.1.2]: https://github.com/lautaro-rojas/SideTask
[v0.1.1]: https://github.com/lautaro-rojas/SideTask
[v0.1.0]: https://github.com/lautaro-rojas/SideTask