import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "customTheme.showPanel",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "customTheme",
        "Custom Theme",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "media")),
            vscode.Uri.file(path.join(context.extensionPath, "webview")),
          ],
        }
      );

      const styleUri = panel.webview.asWebviewUri(
        vscode.Uri.file(
          path.join(context.extensionPath, "webview", "style.css")
        )
      );
      const imageUri = panel.webview.asWebviewUri(
        vscode.Uri.file(
          path.join(context.extensionPath, "media", "background.jpg")
        )
      );

      const htmlPath = path.join(
        context.extensionPath,
        "webview",
        "index.html"
      );
      let htmlContent = fs.readFileSync(htmlPath, "utf8");

      htmlContent = htmlContent
        .replace("{{styleUri}}", styleUri.toString())
        .replace("{{imageUri}}", imageUri.toString());

      panel.webview.html = htmlContent;
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
