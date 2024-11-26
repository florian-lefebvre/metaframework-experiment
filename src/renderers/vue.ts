import { Renderer } from "../jsx/render";
import { renderToString } from "vue/server-renderer";
import { createSSRApp, defineComponent, h } from "vue";

// https://github.com/withastro/astro/blob/main/packages/integrations/vue/server.js

const StaticHtml = defineComponent({
  props: {
    value: String,
    name: String,
  },
  setup({ name, value }) {
    if (!value) return () => null;
    return () => h("framework-slot", { name, innerHTML: value });
  },
});

export const vueRenderer: Renderer = {
  check: (Component, props, children) => {
    return !!Component["ssrRender"] || !!Component["__ssrInlineRender"];
  },
  render: async (Component, props, children) => {
    return await renderToString(
      createSSRApp({
        render: () =>
          h(Component, props, {
            default: () =>
              h(StaticHtml, {
                value: children,
              }),
          }),
      })
    );
  },
};
