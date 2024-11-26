import { Renderer } from "../jsx/render";
import { renderToString } from "vue/server-renderer";
import { createSSRApp, h } from "vue";

// https://github.com/withastro/astro/blob/main/packages/integrations/vue/server.js

export const vueRenderer: Renderer = {
  check: (Component, props, children) => {
    return !!Component["ssrRender"] || !!Component["__ssrInlineRender"];
  },
  render: async (Component, props, children) => {
    return await renderToString(
      createSSRApp({
        render: () => h(Component, props, () => children),
      })
    );
  },
};
