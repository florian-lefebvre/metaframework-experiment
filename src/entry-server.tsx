/** @jsxImportSource ./jsx */

import { jsxToString } from "./jsx/render";
import { App } from "./App";
import { reactRenderer } from "./renderers/react";
import { vueRenderer } from "./renderers/vue";
import style from "./style.css?inline"

function Layout({
  children,
  head,
}: {
  children?: JSX.Element;
  head?: JSX.Element;
}) {
  return (
    <>
      {`<!doctype html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Vite App</title>
          <style>{style}</style>
          {/* <link rel="stylesheet" href={style} /> */}
          {head}
        </head>
        <body>
          <div id="app">{children}</div>
        </body>
      </html>
    </>
  );
}

export async function render(_url: string) {
  return {
    html: await jsxToString(
      <Layout>
        <App name="Vite" />
      </Layout>,
      [reactRenderer, vueRenderer]
    ),
  };
}
