// src/scanner.ts
import * as vscode from 'vscode';
import { TodoItem } from './types';

// Nuestra expresión regular para buscar las palabras clave.
// \b -> Límite de palabra (para no encontrar 'MYTODO')
// (TODO|FIXME|HACK) -> Nuestras palabras clave (Grupo 1)
// : -> Seguido de dos puntos
// (.*) -> Captura el resto de la línea (Grupo 2)
// /i -> Ignora mayúsculas/minúsculas
const TODO_REGEX = /\b(TODO|FIXME|HACK):(.*)/i;

export async function scanWorkspace(): Promise<TodoItem[]> {

    console.log('Carpetas del workspace:', vscode.workspace.workspaceFolders);
    const allTodoItems: TodoItem[] = [];

    // 1. Encontrar todos los archivos en el workspace.
    // El primer patrón ('**/*') busca todo.
    // El segundo patrón ('**/node_modules/**') excluye node_modules.
    // Puedes añadir más exclusiones aquí (ej. '**/dist/**')
    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');

    // 2. Procesar cada archivo encontrado
    console.log('Archivos encontrados por findFiles:', files.length, files);
    for (const file of files) {
        let document;
        try {
            // 3. Abrir el documento (en memoria, no se muestra en el editor)
            document = await vscode.workspace.openTextDocument(file);
        } catch (error) {
            console.error(`Error opening document ${file.fsPath}`, error);
            continue; // Saltar al siguiente archivo si no se puede abrir
        }

        // 4. Leer el documento línea por línea
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);

            // 5. Probar nuestra RegExp en la línea
            const match = line.text.match(TODO_REGEX);

            if (match) {
                // 6. Si hay coincidencia, crear nuestro objeto TodoItem
                const todo: TodoItem = {
                    uri: file,
                    lineNumber: i, // 'i' es el número de línea (base 0)
                    lineText: line.text.trim(), // Texto limpio
                    keyword: match[1].toUpperCase() // 'match[1]' es (TODO|FIXME|HACK)
                };
                allTodoItems.push(todo);
            }
        }
    }

    // 7. Devolver la lista completa de TODOs
    return allTodoItems;
}