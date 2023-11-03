import * as vscode from "vscode";
import * as cp from "child_process";

let statusBarItem: vscode.StatusBarItem | undefined;

export async function activate(context: vscode.ExtensionContext) {
  if (statusBarItem) {
    statusBarItem.dispose(); // Supprimer la barre de statut existante
  }
  try {
    const fetch = (await import("node-fetch")).default;
  } catch (error) {
    console.error("Error:", error as Error);
    vscode.window.showErrorMessage("KalifastGit - Failed to import node-fetch: " + (error as Error).message);
  }

  const token = vscode.workspace.getConfiguration("kalifastgit").get("token");
  const projectURL = vscode.workspace.getConfiguration("kalifastgit").get("projectURL");

  let branchName = "";
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    const rootPath = workspaceFolders[0].uri.fsPath;
    const gitCommand = "git rev-parse --abbrev-ref HEAD";

    try {
      const stdout = await execAsync(gitCommand, { cwd: rootPath });
      branchName = stdout.trim();
    } catch (error) {
      vscode.window.showErrorMessage("KalifastGit - Failed to get current branch");
    }
  } else {
    vscode.window.showErrorMessage("KalifastGit - No workspace folder found.");
  }

  async function makeAPICall() {
    const url = projectURL + "/api/" + token + "/LOGGED/LOGGED/LOGGED/USER/GETCURRENTSUBJECTID";
    const formData = new FormData();
    formData.append("json", "{}");

    const requestOptions = {
      method: "POST",
      body: formData
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      vscode.window.showInformationMessage("KalifastGit - Connected to subject : " + JSON.parse(result).data.subject_id) +
        " CurrentBranch: " +
        branchName; // Affichage d'un message de confirmation dans VS Code
      if (statusBarItem) {
        statusBarItem.dispose(); // Supprimer la barre de statut existante
      }
      statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
      if (!branchName) {
        statusBarItem.text = "No Workspace Folder Found.";
        statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
      } else {
        if ("S" + JSON.parse(result).data.subject_id !== branchName) {
          statusBarItem.text = "Kalifast pin S" + JSON.parse(result).data.subject_id + " CurrentBranch: " + branchName;
          statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
        } else {
          statusBarItem.text = "Same Branch";
        }
      }

      statusBarItem.show();
      context.subscriptions.push(statusBarItem);
    } catch (error) {
      vscode.window.showErrorMessage("KalifastGit - Check extension settings"); // Affichage d'un message d'erreur dans VS Code
    }
  }

  makeAPICall();
  const watcher = vscode.workspace.createFileSystemWatcher("**/*"); // Vous pouvez spécifier un chemin spécifique à surveiller

  watcher.onDidChange((e: vscode.Uri) => {
    if (statusBarItem) {
      statusBarItem.dispose(); // Supprimer la barre de statut existante
    }
    CreateStatusBar(context);
  });

  watcher.onDidCreate((e: vscode.Uri) => {
    if (statusBarItem) {
      statusBarItem.dispose(); // Supprimer la barre de statut existante
    }
    CreateStatusBar(context);
  });

  watcher.onDidDelete((e: vscode.Uri) => {
    if (statusBarItem) {
      statusBarItem.dispose(); // Supprimer la barre de statut existante
    }
    CreateStatusBar(context);
  });
}

export function deactivate() {
  // Lorsque l'extension est désactivée
  if (statusBarItem) {
    statusBarItem.dispose(); // Supprimer la barre de statut existante
  }
}

function execAsync(command: string, options: cp.ExecOptions): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    cp.exec(command, options, (error, stdout, stderr) => {
      if (statusBarItem) {
        statusBarItem.dispose(); // Supprimer la barre de statut existante
      }
      if (error || stderr) {
        reject(error || stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function CreateStatusBar(context: vscode.ExtensionContext) {
  if (statusBarItem) {
    statusBarItem.dispose(); // Supprimer la barre de statut existante
  }
  try {
    const fetch = (await import("node-fetch")).default;
  } catch (error) {
    console.error("Error:", error as Error);
    vscode.window.showErrorMessage("KalifastGit - Failed to import node-fetch: " + (error as Error).message);
  }

  const token = vscode.workspace.getConfiguration("kalifastgit").get("token");
  const projectURL = vscode.workspace.getConfiguration("kalifastgit").get("projectURL");

  let branchName = "";
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    const rootPath = workspaceFolders[0].uri.fsPath;
    const gitCommand = "git rev-parse --abbrev-ref HEAD";

    try {
      const stdout = await execAsync(gitCommand, { cwd: rootPath });
      branchName = stdout.trim();
    } catch (error) {
      vscode.window.showErrorMessage("KalifastGit - Failed to get current branch");
    }
  } else {
    vscode.window.showErrorMessage("KalifastGit - No workspace folder found.");
  }

  async function makeAPICall() {
    const url = projectURL + "/api/" + token + "/LOGGED/LOGGED/LOGGED/USER/GETCURRENTSUBJECTID";
    const formData = new FormData();
    formData.append("json", "{}");

    const requestOptions = {
      method: "POST",
      body: formData
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      vscode.window.showInformationMessage("KalifastGit - Connected to subject : " + JSON.parse(result).data.subject_id) +
        " CurrentBranch: " +
        branchName; // Affichage d'un message de confirmation dans VS Code
      if (statusBarItem) {
        statusBarItem.dispose(); // Supprimer la barre de statut existante
      }
      statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
      if (!branchName) {
        statusBarItem.text = "No Workspace Folder Found.";
        statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
      } else {
        if ("S" + JSON.parse(result).data.subject_id !== branchName) {
          statusBarItem.text = "Kalifast pin S" + JSON.parse(result).data.subject_id + " CurrentBranch: " + branchName;
          statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
        } else {
          statusBarItem.text = "Same Branch";
        }
      }

      statusBarItem.show();
      context.subscriptions.push(statusBarItem);
    } catch (error) {
      vscode.window.showErrorMessage("KalifastGit - Check extension settings"); // Affichage d'un message d'erreur dans VS Code
    }
  }

  makeAPICall();
}
