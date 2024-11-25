/** @jsxImportSource ./jsx-test */

import { html } from "hono/html";
import { App } from "./App";
import { renderToString } from "../node_modules/dom-expressions/src/server"

export async function render(_url: string) {
  // const body = await html`${(<App name="Vite" />)}`;

  const comp = <App name="Vite" />;
  console.log(comp)
  // console.log(renderToString(comp))
  const body = "<div>test</div>";
  // const body = renderToString()
  // console.log(body)

  return {
    html: body,
  };
}
