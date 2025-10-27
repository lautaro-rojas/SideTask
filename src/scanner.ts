// src/scanner.ts
import * as vscode from 'vscode';
import { TodoItem } from './types';
import { parseDocument } from './parser';

/**
 * Lee la configuración de VS Code para obtener las palabras clave.
 */
function getKeywordsFromConfig(): string[] {
    // 1. Obtenemos el objeto de configuración para 'sidetask'
    const config = vscode.workspace.getConfiguration('sidetask');

    // 2. Leemos la propiedad 'keywords' que definimos en package.json
    //    y proveemos un array vacío como valor por defecto si falla.
    return config.get<string[]>('keywords', []);
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

    // 1. Leer las palabras clave desde la configuración
    const keywords = getKeywordsFromConfig();
    if (keywords.length === 0) {
        vscode.window.showInformationMessage('No se han configurado palabras clave para SideTask.');
        return [];
    }
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

        // 2. Obtener el contenido completo del documento
        const fileContent = document.getText();

        // 3. Llamar a nuestro parser "puro"
        const parsedItems = parseDocument(fileContent, keywords);

        // 4. Convertir los ParsedItem "puros" en TodoItem "impuros" (con la URI)
        for (const item of parsedItems) {
            const todo: TodoItem = {
                uri: file,
                lineNumber: item.lineNumber,
                lineText: item.lineText,
                keyword: item.keyword
            };
            allTodoItems.push(todo);
        }
    }

    // 7. Devolver la lista completa de TODOs
    return allTodoItems;
}