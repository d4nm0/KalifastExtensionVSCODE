// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Création d'un nouvel élément dans la barre d'état
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = "Kalifast";
  statusBarItem.show();

  // Ajout de l'élément à la liste des éléments à nettoyer lors de la désactivation de l'extension
  context.subscriptions.push(statusBarItem);
  const token = vscode.workspace.getConfiguration("kalifastgit").get("token");
  const projectURL = vscode.workspace.getConfiguration("kalifastgit").get("projectURL");

  console.log("Token:", token);
  console.log("Project URL:", projectURL);
  console.log("extension activate");
}

// This method is called when your extension is deactivated
export function deactivate() {}
