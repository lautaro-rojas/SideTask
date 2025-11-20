import * as vscode from 'vscode';
import { minimatch } from 'minimatch';

/**
 * Lee los patrones de exclusión desde la configuración.
 */
export function getExcludedPatterns(): string[] {
    return vscode.workspace.getConfiguration('sidetask')
        .get<string[]>('exclude', []);
}

/**
 * Comprueba si una ruta de archivo coincide con alguno de los patrones de exclusión.
 * @param filePath La ruta del sistema de archivos (fsPath)
 */
export function isExcluded(filePath: string): boolean {
    const excludedPatterns = getExcludedPatterns();

    // Convertimos la ruta absoluta a relativa al workspace para que el glob funcione bien
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));
    if (!workspaceFolder) {
        return false; // Si no es parte del workspace, no lo excluimos por defecto
    }

    // Obtenemos la ruta relativa (ej: "src/components/Button.ts")
    // Usamos asRelativePath pero nos aseguramos de que no devuelva la ruta absoluta si falla
    const relativePath = vscode.workspace.asRelativePath(filePath, false);

    for (const pattern of excludedPatterns) {
        // Usamos minimatch para ver si el path coincide con el patrón
        if (minimatch(relativePath, pattern, { dot: true })) {
            return true; // ¡Es un archivo excluido!
        }
    }

    return false;
}