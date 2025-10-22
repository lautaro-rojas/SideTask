// src/types.ts
import * as vscode from 'vscode';

export interface TodoItem {
  uri: vscode.Uri;      // La URI (ruta) completa del archivo
  lineNumber: number;   // El número de línea (empezando en 0)
  lineText: string;     // El texto completo de la línea
  keyword: string;      // La palabra clave encontrada (TODO, FIXME, etc.)
}