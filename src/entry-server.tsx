/** @jsxImportSource ./jsx */

import { jsxToString } from "./jsx/render";
import { App } from "./App";
import { reactRenderer } from "./renderers/react";
import { vueRenderer } from "./renderers/vue";

export async function render(_url: string) {
  const comp = <App name="Vite" />;
  const body = await jsxToString(comp, [reactRenderer, vueRenderer]);

  return {
    html: body,
  };
}
