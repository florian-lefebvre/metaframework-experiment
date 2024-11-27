import { Renderer } from "../jsx/render";
import { renderToString } from "vue/server-renderer";
import { createSSRApp, defineComponent, h, VNode } from "vue";
import { SLOT_ELEMENT } from "../hydration/constants";

// https://github.com/withastro/astro/blob/main/packages/integrations/vue/server.js

const StaticHtml = defineComponent({
  props: {
    value: String,
    name: String,
  },
  setup({ name, value }) {
    if (!value) return () => null;
    return () =>
      h(SLOT_ELEMENT, {
        name,
        innerHTML: value,
        style: {
          display: "contents",
        },
      });
  },
});

export const vueRenderer: Renderer = {
  check: (Component) => {
    return !!Component["ssrRender"] || !!Component["__ssrInlineRender"];
  },
  render: async (Component, props, slotted) => {
    const slots: Record<string, () => VNode> = {};
    for (const [key, value] of Object.entries(slotted)) {
      slots[key] = () =>
        h(StaticHtml, {
          value,
          name: key === "default" ? undefined : key,
        });
    }

    return await renderToString(
      createSSRApp({
        render: () => h(Component, props, slots),
      })
    );
  },
};
