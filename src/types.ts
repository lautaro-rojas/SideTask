import * as vscode from 'vscode';

/**
 * Define la estructura de un objeto de regla de palabra clave
 * (leído desde la configuración de VS Code).
 */
export interface KeywordRule {
  text: string;
  color: string;
  backgroundColor: string;
}

/**
 * Define la estructura de un TODO encontrado.
 * Ahora incluye el estilo que le corresponde.
 */
export interface TodoItem {
  uri: vscode.Uri;
  lineNumber: number;
  lineText: string;
  keyword: string;
  style: KeywordRule; // <-- AÑADIDO: Almacena el estilo completo
}