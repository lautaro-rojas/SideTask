import * as vscode from 'vscode';
// Importamos la función que lee la config (¡la necesitaremos!)
import { scanWorkspace, getKeywordRulesFromConfig } from './scanner';
import { TodoItem } from './types';

export class TodoTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

  // --- El sistema de refresco (sin cambios) ---
  private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

  public refresh(): void {
    // Al refrescar, limpiamos los datos y disparamos el evento
    this.todoDataByFile.clear();
    this.todoDataByKeyword.clear();
    this._onDidChangeTreeData.fire();
  }
  // --- Fin del sistema de refresco ---

  // --- Almacenes de datos para AMBOS modos de agrupación ---
  private todoDataByFile: Map<string, TodoItem[]> = new Map();
  private todoDataByKeyword: Map<string, TodoItem[]> = new Map();

  // --- Helper para leer el interruptor de Emojis ---
  private shouldShowEmojis(): boolean {
    return vscode.workspace.getConfiguration('sidetask')
      .get<boolean>('tree.showEmojis', true); // Default a 'true'
  }

  /**
   * Helper para leer la configuración de agrupación actual.
   */
  private getGroupBySetting(): 'file' | 'keyword' {
    return vscode.workspace.getConfiguration('sidetask')
      .get<'file' | 'keyword'>('tree.groupBy', 'file'); // Default a 'file'
  }

  /**
   * Helper que escanea el workspace y llena AMBOS mapas de agrupación.
   */
  private async scanAndGroupTodos(): Promise<void> {
    // Limpiar datos antiguos
    this.todoDataByFile.clear();
    this.todoDataByKeyword.clear();

    const allTodos = await scanWorkspace();

    // Llenar ambos mapas
    for (const todo of allTodos) {
      // 1. Agrupar por Archivo
      const filePath = todo.uri.fsPath;
      if (!this.todoDataByFile.has(filePath)) {
        this.todoDataByFile.set(filePath, []);
      }
      this.todoDataByFile.get(filePath)!.push(todo);

      // 2. Agrupar por Palabra Clave
      const keyword = todo.keyword.toUpperCase();
      if (!this.todoDataByKeyword.has(keyword)) {
        this.todoDataByKeyword.set(keyword, []);
      }
      this.todoDataByKeyword.get(keyword)!.push(todo);
    }
  }


  /**
   * El método principal que VS Code llama para obtener los ítems.
   * Ahora es un "enrutador" que delega a otras funciones.
   */
  async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {

    // Si no hay 'element', estamos pidiendo la raíz.
    if (!element) {
      // Escaneamos y agrupamos (solo si los mapas están vacíos)
      if (this.todoDataByFile.size === 0 && this.todoDataByKeyword.size === 0) {
        await this.scanAndGroupTodos();
      }

      // Leemos la configuración para decidir qué mostrar
      const groupBy = this.getGroupBySetting();
      if (groupBy === 'file') {
        return this.getRootFileItems();
      } else { // groupBy === 'keyword'
        return this.getRootKeywordItems();
      }
    }

    // Si SÍ hay 'element', estamos pidiendo hijos.
    // Usamos 'contextValue' para saber qué tipo de hijo es.
    if (element.contextValue === 'file') {
      return this.getTodoItemsForFile(element);
    }

    if (element.contextValue === 'keyword') {
      return this.getTodoItemsForKeyword(element);
    }

    return []; // No debería llegar aquí
  }

  /**
   * Requerido por la interfaz (sin cambios).
   */
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  // --- FUNCIONES HELPER PRIVADAS ---

  /**
   * Devuelve los ítems raíz para el modo "Agrupar por Archivo".
   * (Esta es tu lógica antigua)
   */
  private getRootFileItems(): vscode.TreeItem[] {
    const fileItems: vscode.TreeItem[] = [];
    const showEmojis = this.shouldShowEmojis();

    for (const filePath of this.todoDataByFile.keys()) {
      const fileUri = vscode.Uri.file(filePath);
      const relativePath = vscode.workspace.asRelativePath(fileUri);
      const label = showEmojis ? `📁 ${relativePath}` : relativePath;

      const treeItem = new vscode.TreeItem(
        label,
        vscode.TreeItemCollapsibleState.Collapsed
      );

      // Obtenemos los todos para saber cuántos hay
      const todos = this.todoDataByFile.get(filePath);
      if (todos) {
        treeItem.description = `${todos.length}`; // Muestra el número (ej. "3")
      }

      treeItem.iconPath = new vscode.ThemeIcon('file');
      treeItem.resourceUri = fileUri; // Importante para encontrar a los hijos
      treeItem.contextValue = 'file';  // Identificador de tipo

      fileItems.push(treeItem);
    }
    return fileItems;
  }

  /**
   * Devuelve los ítems raíz para el modo "Agrupar por Palabra Clave".
   * (Esta es la nueva lógica)
   */
  private getRootKeywordItems(): vscode.TreeItem[] {
    const keywordItems: vscode.TreeItem[] = [];
    const showEmojis = this.shouldShowEmojis();

    // Intentamos ordenar las palabras clave según la configuración
    const keywordRules = getKeywordRulesFromConfig();

    // Iteramos sobre 'keywordRules' (los objetos) para poder acceder a 'rule.emoji'
    for (const rule of keywordRules) {
      const keyword = rule.text.toUpperCase();

      // Solo mostrar la palabra clave si encontramos TODOs para ella
      if (this.todoDataByKeyword.has(keyword)) {

        // Ahora 'rule' SÍ existe y podemos usar 'rule.emoji'
        const label = showEmojis && rule.emoji ? `${rule.emoji} ${keyword}` : keyword;

        const treeItem = new vscode.TreeItem(
          label, // Usamos el label que acabamos de crear
          vscode.TreeItemCollapsibleState.Collapsed
        );

        const todos = this.todoDataByKeyword.get(keyword);
        if (todos) {
           treeItem.description = `${todos.length}`; // Muestra el número
        }
        
        treeItem.contextValue = 'keyword'; // Identificador de tipo
        keywordItems.push(treeItem);
      }
    }
    return keywordItems;
  }

  /**
   * Devuelve los ítems hijo para un Archivo.
   * (Esta es tu lógica antigua, sin cambios)
   */
  private getTodoItemsForFile(fileElement: vscode.TreeItem): vscode.TreeItem[] {
    const filePath = fileElement.resourceUri?.fsPath;
    const showEmojis = this.shouldShowEmojis();

    if (filePath && this.todoDataByFile.has(filePath)) {
      const todosInFile = this.todoDataByFile.get(filePath)!;

      return todosInFile.map(todo => {
        const label = showEmojis && todo.style.emoji
          ? `${todo.style.emoji} ${todo.lineText}`
          : todo.lineText;

        const treeItem = new vscode.TreeItem(
          label,
          vscode.TreeItemCollapsibleState.None
        );

        treeItem.contextValue = 'todoItem';
        treeItem.description = `Line ${todo.lineNumber + 1}`;
        treeItem.tooltip = `Line ${todo.lineNumber + 1}: ${todo.lineText}`;
        treeItem.command = {
          command: 'sidetask.openFile',
          title: 'Open file',
          arguments: [todo]
        };
        return treeItem;
      });
    }
    return [];
  }

  /**
   * Devuelve los ítems hijo para una Palabra Clave.
   * (Esta es la nueva lógica)
   */
  private getTodoItemsForKeyword(keywordElement: vscode.TreeItem): vscode.TreeItem[] {
    const labelText = keywordElement.label as string;
    const keyword = labelText.split(' ').pop()!;
    const showEmojis = this.shouldShowEmojis();

    if (keyword && this.todoDataByKeyword.has(keyword)) {
      const todosForKeyword = this.todoDataByKeyword.get(keyword)!;

      return todosForKeyword.map(todo => {
        const relativePath = vscode.workspace.asRelativePath(todo.uri);

        // Formato de etiqueta: "src/cart.cs: // TODO: Considerar..."
        const baseLabel = `${relativePath}: ${todo.lineText}`;
        const label = showEmojis && todo.style.emoji
          ? `${todo.style.emoji} ${baseLabel}`
          : baseLabel;

        const treeItem = new vscode.TreeItem(
          label,
          vscode.TreeItemCollapsibleState.None
        );

        treeItem.contextValue = 'todoItem';
        treeItem.description = `Line ${todo.lineNumber + 1}`;
        treeItem.tooltip = `${relativePath} (Line ${todo.lineNumber + 1})\n${todo.lineText}`;
        treeItem.command = {
          command: 'sidetask.openFile',
          title: 'Open file',
          arguments: [todo]
        };

        return treeItem;
      });
    }
    return [];
  }
}