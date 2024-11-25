import { html } from "hono/html";
import { App } from "./App.custom";

export async function render(_url: string) {
  const body = await html`${<App name="Vite" />}`;

  return {
    html: body,
  };
}
