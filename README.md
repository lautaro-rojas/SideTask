# SideTask - All in one smart TODO Manager

<p align="center">
  <img src="https://github.com/lautaro-rojas/SideTask/blob/main/images/SideTask-Logo.png?raw=true" alt="SideTask Logo" width="128" />
  <br/>
  <strong>Your entire codebase's TODO list, in one place.</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LautaroRojas.sidetask">
    <img src="https://img.shields.io/visual-studio-marketplace/v/LautaroRojas.sidetask?style=for-the-badge&label=Marketplace&color=blue" alt="Marketplace Version"/>
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LautaroRojas.sidetask">
    <img src="https://img.shields.io/visual-studio-marketplace/d/LautaroRojas.sidetask?style=for-the-badge&label=Installs" alt="Marketplace Installs"/>
  </a>
</p>

**SideTask** is a powerful VS Code extension that finds all the TODOs, FIXMEs, and other task comments scattered across your project and brings them into one organized view in your activity bar.

Stop losing track of pending tasks and technical debt. If it's in your code, it's on your list.

## Features (v0.3.0)

### NEW 🎆
* **✨ Custom Highlighting:** Define your own keywords (like `NOTE`, `BUG`) and give them custom colors.
* **🎛️ Advanced Filtering:** Filter tasks by keyword.

### Already implemented
* **🌲 Unified Tree View:** See all found tasks in a clean, collapsible tree view, neatly organized by file.
* **⌨️ Default Keywords:** Automatically scans your project for `TODO:`, `FIXME:`, and `HACK:`.
* **🖱️ Click-to-Go:** Instantly jump to the exact line of any task in your code just by clicking on it in the side panel.
* **🔄 Manual Refresh:** A simple "Refresh" button in the view's title bar to re-scan your workspace at any time.
* **🔄 Automatic Refresh:** The extension will re-scan your workspace each time you save a file (ctrl+s).
* **⌨️ Your oun Keywords:** Automatically scan your project for any word you choose.

## Getting Started
1. Install the **SideTask** extension from the VS Code Marketplace.
2. Open a project.
3. Click on the new **SideTask icon** in your Activity Bar (the sidebar on the left).
4. The panel will automatically populate with all the tasks found in your code.
5. Click any task to jump straight to the file!

## How can I add my word and configure the colors?
1. Go to File -> Preferences -> Settings (or keyboard shortcut ctrl+,).
  ![SideTask File -> Preferences -> Settings image](https://github.com/lautaro-rojas/SideTask/blob/main/images/SideTask-FilePrefSett-en.png?raw=true)
2. Search "SideTask".
3. Go to the option SideTask: Keywords.
4. Click the button "Add Item".
  ![SideTask config keywords image](https://github.com/lautaro-rojas/SideTask/blob/main/images/SideTask-ConfigKeywords-en.png?raw=true)
5. Write your favourite word.

## What's Next? (Roadmap)
SideTask is just getting started. Our goal is to make this the *ultimate* task management tool for developers, right inside the editor. Here is what's planned:

* **⚡ Smart Snippets:** Quickly create new TODO items with snippets. Type TODO and press Tab autocomplete // TODO: [ ].
* **⚡ Keyboard shortcuts:** Quickly create new TODO items with keyboard shortcuts.
* **💡 Icons:** Display a different icon for each keyword type:
  * 🎯 TODO
  * 🐞 BUG
  * 🔧 FIXME
  * 💡 IDEA
  * 🗒️ NOTE
  * ⚙️ REFACTOR
* **Enriched Syntax:** The extension learns to "read" the contents of the TODO. The parser recognizes special patterns:
  - **Tags:** `// TODO: Fix this #bug #ui`.
  - **Dates:** `// REFACTOR: Clean this @due:2025-12-01`.
  - **Status:** `// TODO: Implement function @done`  vs `// TODO: Implement function @pending`.
* **Markdown Support (`.todo`):** Allows you to manage tasks in dedicated `.md` or `.todo` files. It recognizes Markdown task syntax and adds them to the tree view.
* **Right-Click Menu:** Context Actions.
* **🚀 [PRO] Integrations:** Connect SideTask to your favorite tools like **Notion**, **Jira**, and **Trello** to turn code comments into a card.
* **🚀 [PRO] AI Integrations:** Connect SideTask to your favorite AI like **Chat GPT**.

## Support the Project
This is an indie project built with ❤️. If you find SideTask useful, please consider supporting its development:

* Leave a ⭐️⭐️⭐️⭐️⭐️ rating on the [Marketplace](https://marketplace.visualstudio.com/items?itemName=LautaroRojas.sidetask).
* Report bugs or request features on our [GitHub Issues](https://github.com/lautaro-rojas/SideTask/issues).
* [Buy me a coffee!](https://buymeacoffee.com/lautarorojas) 

## License

This extension is licensed under the [MIT License](LICENSE.md).
