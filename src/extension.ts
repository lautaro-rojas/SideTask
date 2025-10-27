// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TodoTreeProvider } from './TodoTreeProvider';
import { TodoItem } from './types';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sidetask" is now active!');

	// 1. Creamos una instancia de nuestro proveedor
	const todoTreeProvider = new TodoTreeProvider();

	// 2. Registramos el proveedor de datos para nuestra vista.
	// El 'todo-tracker-view' DEBE COINCIDIR EXACTAMENTE con el 'id'
	// que pusimos en la sección 'views' de package.json.
	vscode.window.registerTreeDataProvider(
		'todo-tracker-view',
		todoTreeProvider
	);
	// 3. Registramos el comando para abrir archivos y navegar a la línea
	// Aquí registramos el comando 'sidetask.openFile'
	const openFileCommand = vscode.commands.registerCommand('sidetask.openFile', (todo: TodoItem) => {

		// 1. Abrir el documento
		vscode.window.showTextDocument(todo.uri, {

			// 2. Mover el cursor y centrar la vista en la línea
			selection: new vscode.Selection(
				new vscode.Position(todo.lineNumber, 0), // Inicio de la línea
				new vscode.Position(todo.lineNumber, 0)  // Fin (mismo punto)
			)
		});
	});

	const refreshCommand = vscode.commands.registerCommand('sidetask.refresh', () => {
		// Simplemente llama al método 'refresh' de nuestra instancia
		todoTreeProvider.refresh();
	});

	const autoRefresh = vscode.workspace.onDidSaveTextDocument(() => {
		todoTreeProvider.refresh();
	});

	const configChange = vscode.workspace.onDidChangeConfiguration(e => {
    // Comprobamos si el cambio en la configuración afecta a nuestras 'keywords'
    if (e.affectsConfiguration('sidetask.keywords')) {
      // Si es así, refrescamos el proveedor
      todoTreeProvider.refresh();
    }
  });

	// No olvides añadir el nuevo comando a las 'subscriptions'
	// para que se libere al desactivar la extensión.
	context.subscriptions.push(openFileCommand);
	context.subscriptions.push(refreshCommand);
	context.subscriptions.push(autoRefresh);
	context.subscriptions.push(configChange);
}

// This method is called when your extension is deactivated
export function deactivate() { }
