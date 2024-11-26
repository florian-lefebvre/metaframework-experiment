import React from "react";
import { renderToString } from "react-dom/server";
import { Renderer } from "../jsx/render";

// Source: https://github.com/withastro/astro/blob/main/packages/integrations/react/server.js

const reactTypeof = Symbol.for("react.element");

export const reactRenderer: Renderer = {
  check: (Component, props, children) => {
    // Note: there are packages that do some unholy things to create "components".
    // Checking the $$typeof property catches most of these patterns.
    if (typeof Component === "object" && "$$typeof" in Component) {
      return Component["$$typeof"]
        .toString()
        .slice("Symbol(".length)
        .startsWith("react");
    }
    if (typeof Component !== "function") return false;
    if (Component.name === "QwikComponent") return false;

    // Preact forwarded-ref components can be functions, which React does not support
    if (
      typeof Component === "function" &&
      Component["$$typeof"] === Symbol.for("react.forward_ref")
    )
      return false;

    if (
      Component.prototype != null &&
      typeof Component.prototype.render === "function"
    ) {
      return (
        React.Component.isPrototypeOf(Component) ||
        React.PureComponent.isPrototypeOf(Component)
      );
    }

    let isReactComponent = false;
    function Tester(...args: Array<any>) {
      try {
        const vnode = Component(...args);
        if (vnode && vnode["$$typeof"] === reactTypeof) {
          isReactComponent = true;
        }
      } catch {}

      return React.createElement("div");
    }

    const vnode = React.createElement(Tester, props, children);
    renderToString(vnode);

    return isReactComponent;
  },
  render: (Component, props, children) => {
    return renderToString(React.createElement(Component, props, children));
  },
};
