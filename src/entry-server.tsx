/** @jsxImportSource ./jsx */

import { jsxToString } from "jsx-async-runtime";
import { App } from "./App";

export async function render(_url: string) {
  const comp = <App name="Vite" />;
  const body = await jsxToString(comp);
  console.log({
    comp,
    body,
    test: comp.props.children
  })

  return {
    html: body,
  };
}
