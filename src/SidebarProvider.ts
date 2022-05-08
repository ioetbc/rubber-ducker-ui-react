import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { apiBaseUrl } from "./constants";
import { TokenManager } from "./tokenManager";
import { authenticate } from "./authenticate";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "logout": {
          TokenManager.setToken("");
          break;
        }
        case "authenticate": {
          authenticate(() => {
            webviewView.webview.postMessage({
              type: "token",
              value: TokenManager.getToken(),
            });
          });
          break;
        }

        case "getToken": {
          webviewView.webview.postMessage({
            type: "accessToken",
            value: TokenManager.getToken(),
          });
          break;
        }
        case "setIdToken": {
          webviewView.webview.postMessage({
            type: "setIdToken",
            value: TokenManager.setIdToken(data.value),
          });
          break;
        }
        case "getIdToken": {
          webviewView.webview.postMessage({
            type: "recieveRefreshToken",
            value: TokenManager.getIdToken(),
          });
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "sidebar.js")
    );
    // const styleMainUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
    // );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="" img-src https: data:; style-src 'unsafe-inline' ${
                  webview.cspSource
                }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
                <script nonce="${nonce}">
                    const tsvscode = acquireVsCodeApi()
                    const apiBaseUrl = ${JSON.stringify(apiBaseUrl)}
                </script>
			</head>
            <body>
            <div id="root"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}
