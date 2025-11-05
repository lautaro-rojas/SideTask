import * as vscode from 'vscode';
import { TodoTreeProvider } from './TodoTreeProvider';
import { TodoItem, KeywordRule } from './types'; // <-- TIPO ACTUALIZADO
import { Highlighter } from './highlighter'; // <-- IMPORTAR HIGHLIGHTER
import { parseDocument } from './parser'; // <-- IMPORTAR PARSER
import { getKeywordRulesFromConfig } from './scanner'; // <-- IMPORTAR FUNCIÓN

// --- Variable Global para el Highlighter ---
let highlighter: Highlighter;

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "sidetask" is now active!');

	// --- 1. Inicializar el Highlighter ---
	highlighter = new Highlighter();
	// Generar los estilos iniciales al activar
	updateDecorationStyles();


	// --- 2. Proveedor de la Vista de Árbol (Sin cambios) ---
	const todoTreeProvider = new TodoTreeProvider();
	vscode.window.registerTreeDataProvider(
		'todo-tracker-view',
		todoTreeProvider
	);

	// --- 3. Comandos ---
	const openFileCommand = vscode.commands.registerCommand('sidetask.openFile', (todo: TodoItem) => {
		vscode.window.showTextDocument(todo.uri, {
			selection: new vscode.Selection(
				new vscode.Position(todo.lineNumber, 0),
				new vscode.Position(todo.lineNumber, 0)
			)
		});
	});

	const refreshCommand = vscode.commands.registerCommand('sidetask.refresh', () => {
		todoTreeProvider.refresh();
		// Además de refrescar el árbol, también actualizamos el highlighting
		// del editor activo.
		triggerHighlightUpdate();
	});

	// --- 4. Listeners (Oyentes de eventos) ---

	// Al guardar un documento
	const autoRefresh = vscode.workspace.onDidSaveTextDocument(() => {
		todoTreeProvider.refresh();
		// (triggerHighlightUpdate() ya se llama en onDidChangeActiveTextEditor,
		// pero es bueno ser explícito si el documento guardado es el activo)
		if (vscode.window.activeTextEditor) {
			triggerHighlightUpdate(vscode.window.activeTextEditor);
		}
	});

	// Al cambiar la configuración
	const configChange = vscode.workspace.onDidChangeConfiguration(e => {
		let refreshTreeView = false;
		let updateStyles = false;

		if (e.affectsConfiguration('sidetask.keywordRules') || e.affectsConfiguration('sidetask.tree.groupBy')) {
			// Si cambian las reglas O el modo de agrupación,
			// hay que refrescar el árbol
			refreshTreeView = true;
		}

		if (e.affectsConfiguration('sidetask.keywordRules')) {
			// Si cambian las reglas, también hay que actualizar los estilos
			updateStyles = true;
		}
		if (e.affectsConfiguration('sidetask.highlight.enabled')) {
			// Si se (des)activa el highlight, también hay que actualizar los estilos
			updateStyles = true;
		}

		if (updateStyles) {
			// 1. Actualizar los estilos (generar nuevos tipos de decoración)
			updateDecorationStyles();
			// 2. Volver a aplicar el highlighting
			triggerHighlightUpdate();
		}
		if (refreshTreeView) {
			todoTreeProvider.refresh();
		}
	});

	// --- ¡NUEVO LISTENER! ---
	// Al cambiar de pestaña (editor activo)
	const activeEditorChange = vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			triggerHighlightUpdate(editor);
		}
	});

	// --- 5. Añadir todo a Subscriptions ---
	context.subscriptions.push(openFileCommand);
	context.subscriptions.push(refreshCommand);
	context.subscriptions.push(autoRefresh);
	context.subscriptions.push(configChange);
	context.subscriptions.push(activeEditorChange); // <-- AÑADIR NUEVO LISTENER

	// --- 6. Ejecutar el highlighting por primera vez ---
	if (vscode.window.activeTextEditor) {
		triggerHighlightUpdate(vscode.window.activeTextEditor);
	}
}

/**
 * Lee la configuración y le dice al Highlighter que genere
 * los nuevos tipos de decoración.
 */
function updateDecorationStyles() {
	const rules = getKeywordRulesFromConfig();
	highlighter.generateDecorationTypes(rules);
}

/**
 * Función principal que escanea el editor activo y aplica el resaltado.
 */
function triggerHighlightUpdate(editor?: vscode.TextEditor) {
	const activeEditor = editor || vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	const config = vscode.workspace.getConfiguration('sidetask');
	const isEnabled = config.get<boolean>('highlight.enabled', true);

	if (!isEnabled) {
		// Si está desactivado, limpiar highlights y salir
		highlighter.clearHighlights(activeEditor);
		return;
	}

	// Obtenemos las reglas (¡las necesitamos para el parser!)
	const rules = getKeywordRulesFromConfig();
	if (rules.length === 0) {
		highlighter.clearHighlights(activeEditor);
		return;
	}

	// Parseamos el documento ACTIVO
	const fileContent = activeEditor.document.getText();
	const parsedItems = parseDocument(fileContent, rules);

	// Convertimos ParsedItem a TodoItem (solo para el highlighter)
	const todos: TodoItem[] = parsedItems.map(item => ({
		uri: activeEditor.document.uri,
		lineNumber: item.lineNumber,
		lineText: item.lineText,
		keyword: item.keyword,
		style: item.style
	}));

	// Aplicamos el resaltado
	highlighter.highlightEditor(activeEditor, todos);
}