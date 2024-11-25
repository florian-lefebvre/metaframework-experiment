/** @jsxImportSource ./jsx */

import { jsxToString } from "./jsx/render";
import { App } from "./App";
import { renderToString } from "react-dom/server";

export async function render(_url: string) {
  const comp = <App name="Vite" />;
  const body = await jsxToString(comp, {
    react: renderToString,
  });
  // console.log({
  //   comp,
  //   body,
  //   test: comp.props.children
  // })

  return {
    html: body,
  };
}
