import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  const cssPath = path.join(context.extensionPath, "media", "background.css");
  const styleTag = `
    <style>
      body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-image: url('${vscode.Uri.file(
          path.join(context.extensionPath, "media", "background.jpg")
        ).with({ scheme: "vscode-resource" })}');
        background-size: cover;
        background-position: center;
        opacity: 0.15;
        pointer-events: none;
      }
    </style>
  `;

  const htmlPath = path.join(context.extensionPath, "media", "background.css");
  fs.writeFileSync(htmlPath, styleTag);

  vscode.window.showInformationMessage("Custom Background Theme activated!");
}

export function deactivate() {}
