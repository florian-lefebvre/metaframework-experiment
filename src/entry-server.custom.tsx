/** @jsxImportSource jsx-test */

import { html } from "hono/html";
import { App } from "./App.custom";

export async function render(_url: string) {
  const body = await html`${(<App name="Vite" />)}`;

  // const comp = <App name="Vite" />;
  // console.dir(comp.tag(comp.props).children)
  // const body = "<div>test</div>"

  return {
    html: body,
  };
}
