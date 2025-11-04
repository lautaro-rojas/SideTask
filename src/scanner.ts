// src/scanner.ts
import * as vscode from 'vscode';
import { TodoItem, KeywordRule } from './types'
import { parseDocument } from './parser';

/**
 * Lee la configuración de VS Code para obtener las KeywordRules.
 */
export function getKeywordRulesFromConfig(): KeywordRule[] {
    const config = vscode.workspace.getConfiguration('sidetask');

    // Leemos 'keywordRules' (el nuevo nombre que definimos)
    // y proveemos un array vacío como valor por defecto.
    return config.get<KeywordRule[]>('keywordRules', []);
}

// Nuestra expresión regular para buscar las palabras clave.
// \b -> Límite de palabra (para no encontrar 'MYTODO')
// (TODO|FIXME|HACK) -> Nuestras palabras clave (Grupo 1)
// : -> Seguido de dos puntos
// (.*) -> Captura el resto de la línea (Grupo 2)
// /i -> Ignora mayúsculas/minúsculas
const TODO_REGEX = /\b(TODO|FIXME|HACK):(.*)/i;

export async function scanWorkspace(): Promise<TodoItem[]> {

    const allTodoItems: TodoItem[] = [];

    // 1. Leer las REGLAS desde la configuración
    const keywordRules = getKeywordRulesFromConfig();
    if (keywordRules.length === 0) {
        // No mostramos un mensaje, simplemente no encontramos nada.
        // El usuario puede no querer usar la extensión.
        return [];
    }

    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');

    for (const file of files) {
        let document;
        try {
            document = await vscode.workspace.openTextDocument(file);
        } catch (error) {
            console.error(`Error opening document ${file.fsPath}`, error);
            continue;
        }

        const fileContent = document.getText();

        // 2. Llamar a nuestro parser "puro"
        const parsedItems = parseDocument(fileContent, keywordRules); // <-- Le pasamos las reglas

        // 3. Convertir los ParsedItem "puros" en TodoItem "impuros" (con la URI)
        for (const item of parsedItems) {
            const todo: TodoItem = {
                uri: file,
                lineNumber: item.lineNumber,
                lineText: item.lineText,
                keyword: item.keyword,
                style: item.style // <-- AÑADIDO: Traspasamos el estilo
            };
            allTodoItems.push(todo);
        }
    }

    // 7. Devolver la lista completa de TODOs
    return allTodoItems;
}