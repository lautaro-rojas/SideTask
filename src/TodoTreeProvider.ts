// src/TodoTreeProvider.ts
import * as vscode from 'vscode';
import { scanWorkspace } from './scanner';
import { TodoItem } from './types';

export class TodoTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

  // --- PASO 5: AÑADIR EL EVENT EMITTER ---
  // 1. Un emisor de eventos privado que SOLO nuestra clase puede disparar
  private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();

  // 2. Un evento público que VS Code "escuchará".
  //    (Esta es la implementación requerida por la interfaz TreeDataProvider)
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
  // --- FIN PASO 5 ---

  // Un mapa para almacenar nuestros TODOs agrupados por archivo
  // Clave: string (ruta del archivo, ej: '/path/to/file.ts')
  // Valor: TodoItem[] (lista de TODOs en ese archivo)
  private todoData: Map<string, TodoItem[]> = new Map();
  // --- PASO 5: AÑADIR UN MÉTODO DE ACTUALIZACIÓN ---
  // 3. Un método público que disparará el evento.
  //    Lo llamaremos desde nuestro comando en extension.ts
  public refresh(): void {
    // 4. Al disparar 'undefined', le decimos a VS Code que
    //    actualice el árbol desde la raíz.
    this._onDidChangeTreeData.fire();
  }
  // --- FIN PASO 5 ---


  // 'getChildren' es llamado para obtener los hijos de un elemento,
  // o los elementos raíz si 'element' es undefined.
  async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {

    if (element) {
      // --- Nivel 2: Mostrar TODOs de un archivo ---

      // Si 'element' existe, es un ítem de Archivo.
      // Obtenemos la ruta del archivo que guardamos en 'resourceUri'.
      const filePath = element.resourceUri?.fsPath;

      if (filePath && this.todoData.has(filePath)) {
        const todosInFile = this.todoData.get(filePath)!;

        // Convertimos cada TodoItem en un TreeItem
        return todosInFile.map(todo => {
          const treeItem = new vscode.TreeItem(
            todo.lineText, // La etiqueta es el texto de la línea
            vscode.TreeItemCollapsibleState.None // No tiene hijos
          );

          // --- Preparación para el Paso 4 ---
          // Añadimos datos útiles para el tooltip y para el comando
          treeItem.description = `Línea ${todo.lineNumber + 1}`; // (Las líneas en VS Code son base 1, la nuestra es base 0)
          treeItem.tooltip = `Línea ${todo.lineNumber + 1}: ${todo.lineText}`;

          // Este es el comando que se ejecutará al hacer clic.
          // Lo registraremos en el Paso 4.
          treeItem.command = {
            command: 'sidetask.openFile', // Nombre del comando
            title: 'Abrir Archivo',
            arguments: [todo] // ¡Le pasamos el objeto TodoItem completo!
          };

          return treeItem;
        });
      }
      return []; // No hay hijos

    } else {
      // --- Nivel 1: Mostrar Archivos ---

      // Si 'element' es undefined, estamos en la raíz.
      // 1. Limpiamos los datos antiguos
      this.todoData.clear();

      // 2. Ejecutamos el scanner (que creamos en el Paso 2)
      const allTodos = await scanWorkspace();

      // 3. Agrupamos los TODOs por archivo
      for (const todo of allTodos) {
        const filePath = todo.uri.fsPath;
        if (!this.todoData.has(filePath)) {
          this.todoData.set(filePath, []);
        }
        this.todoData.get(filePath)!.push(todo);
      }

      // 4. Creamos un TreeItem por cada archivo
      const fileItems: vscode.TreeItem[] = [];
      for (const filePath of this.todoData.keys()) {
        const fileUri = vscode.Uri.file(filePath);

        // Obtenemos la ruta relativa para una vista más limpia
        // ej: 'src/extension.ts' en lugar de 'C:\Users\Wally\...'
        const relativePath = vscode.workspace.asRelativePath(fileUri);

        const treeItem = new vscode.TreeItem(
          relativePath, // La etiqueta es la ruta relativa
          vscode.TreeItemCollapsibleState.Collapsed // Es colapsable (tiene hijos)
        );

        // ¡Crucial! Guardamos la URI completa aquí.
        // Así, cuando el usuario expanda este ítem, el bloque 'if (element)'
        // de arriba sabrá qué archivo buscar en 'this.todoData'.
        treeItem.resourceUri = fileUri;

        fileItems.push(treeItem);
      }
      return fileItems;
    }
  }

  // 'getTreeItem' es llamado para obtener la representación visual de un elemento (su etiqueta, ícono, etc.).
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    // Como ya construimos nuestros TreeItems completamente en 'getChildren',
    // aquí simplemente devolvemos el elemento tal cual.
    return element;
  }
}