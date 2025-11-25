import * as vscode from 'vscode';
import { KeywordRule, TodoItem } from './types';

// BUG: Comentario para testear el refresh entre ramas 

/**
 * Gestiona el resaltado (decoraciones) de los TODOs en los editores activos.
 */
export class Highlighter {

  // Un mapa para almacenar nuestros "tipos de decoración" (los estilos)
  // Clave: Nombre de la palabra clave (ej. "TODO")
  // Valor: El objeto de decoración de VS Code
  private decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();

  /**
   * Limpia y elimina todas las decoraciones y estilos antiguos.
   * Se llama cuando la configuración cambia.
   */
  public disposeDecorations(): void {
    for (const decoration of this.decorationTypes.values()) {
      decoration.dispose();
    }
    this.decorationTypes.clear();
  }

  /**
   * Crea los estilos de decoración basados en las reglas de la configuración.
   * @param rules Las reglas de KeywordRule[] leídas de la configuración.
   */
  public generateDecorationTypes(rules: KeywordRule[]): void {
    // Primero, limpiar cualquier estilo antiguo
    this.disposeDecorations();

    // Crear un nuevo tipo de decoración por cada regla
    for (const rule of rules) {
      // Validar que la regla tenga las propiedades necesarias
      if (!rule.text || !rule.color || !rule.backgroundColor) {
        continue;
      }

      const decorationType = vscode.window.createTextEditorDecorationType({
        // isWholeLine: true -> aplica el estilo a toda la línea
        isWholeLine: true,
        backgroundColor: rule.backgroundColor,
        color: rule.color,
      });

      // Guardamos el tipo de decoración, usando la palabra clave
      // en mayúsculas como clave
      this.decorationTypes.set(rule.text.toUpperCase(), decorationType);
    }
  }

  /**
   * Aplica las decoraciones a un editor de texto basándose en una lista
   * de TODOs encontrados.
   * @param editor El editor de texto activo.
   * @param todos La lista de TodoItem encontrados en ese documento.
   */
  public highlightEditor(editor: vscode.TextEditor, todos: TodoItem[]): void {

    // LIMPIAR TODAS LAS DECORACIONES ANTIGUAS ---
    // (Esta es la corrección del bug)
    // Primero, borramos todos los highlights existentes para
    // evitar "fantasmas" como el que reportaste.
    for (const decorationType of this.decorationTypes.values()) {
      editor.setDecorations(decorationType, []);
    }


    // --- PASO 2: Construir el nuevo mapa de decoraciones (lógica existente) ---
    const decorationsMap = new Map<vscode.TextEditorDecorationType, vscode.Range[]>();

    // 1. Agrupar los TODOs por su estilo
    for (const todo of todos) {
      const keyword = todo.keyword.toUpperCase();
      const decorationType = this.decorationTypes.get(keyword);

      if (!decorationType) {
        continue; // No hay estilo para esta palabra clave
      }

      if (!decorationsMap.has(decorationType)) {
        decorationsMap.set(decorationType, []);
      }

      // Creamos un "Rango" para la línea completa
      const range = new vscode.Range(
        new vscode.Position(todo.lineNumber, 0), // Inicio de la línea
        new vscode.Position(todo.lineNumber, 1000) // Fin de la línea
      );

      decorationsMap.get(decorationType)!.push(range);
    }

    // --- PASO 3: Aplicar las nuevas decoraciones (lógica existente) ---
    for (const [decorationType, ranges] of decorationsMap.entries()) {
      editor.setDecorations(decorationType, ranges);
    }
  }

  /**
   * Limpia todas las decoraciones de un editor.
   * Se usa cuando el interruptor "enabled" está en "false".
   * @param editor El editor de texto.
   */
  public clearHighlights(editor: vscode.TextEditor): void {
    // Para limpiar, simplemente aplicamos un array vacío a todos
    // los tipos de decoración que conocemos.
    for (const decorationType of this.decorationTypes.values()) {
      editor.setDecorations(decorationType, []);
    }
  }
}