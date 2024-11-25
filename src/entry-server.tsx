/** @jsxImportSource ./jsx */

import { jsxToString } from "./jsx/render";
import { App } from "./App";
import { renderToString as renderReactToString } from "react-dom/server";
import { renderToString as renderVueToString } from "vue/server-renderer"
import { createSSRApp, h } from "vue"

export async function render(_url: string) {
  const comp = <App name="Vite" />;
  const body = await jsxToString(comp, {
    react: (tag) => renderReactToString(tag.tag(tag.props) as any),
    vue: (tag) => {
      const app = createSSRApp({
        render: () => h(tag.tag(tag.props) as any, tag.props)
      })
      return renderVueToString(app)
    },
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
