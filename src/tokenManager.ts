import * as vscode from "vscode";

const KEY = "rubberDuckerToken";
const ID_TOKEN_KEY = "idToken";

export class TokenManager {
  static globalState: vscode.Memento;

  static setToken(token: string) {
    return this.globalState.update(KEY, token);
  }

  static getToken(): string | undefined {
    return this.globalState.get(KEY);
  }

  static setIdToken(token: string) {
    return this.globalState.update(ID_TOKEN_KEY, token);
  }

  static getIdToken() {
    return this.globalState.get(ID_TOKEN_KEY);
  }
}
