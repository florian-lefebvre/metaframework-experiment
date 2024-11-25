// export * from "hono/jsx/jsx-runtime";
import { createHyperScript } from "hyper-dom-expressions";
// import {
//   spread,
//   assign,
//   insert,
//   createComponent,
//   dynamicProperty,
//   SVGElements,
// } from '../../node_modules/dom-expressions/src/client'
// import { ssr } from "../../node_modules/dom-expressions/src/server";
// import {} from "../../node_modules/dom-expressions/src/"
import type { JSX } from "../../node_modules/dom-expressions/src/jsx";

// const h = createHyperScript({
//   spread: (node, accessor, isSVG, skipChildren) => {},
//   assign: () => {},
//   insert: () => {},
//   createComponent,
//   dynamicProperty: () => {},
//   SVGElements,
// });

function Fragment(props: { children: JSX.Element }) {
  return props.children;
}

function jsx(type: any, props: any, children: any) {
  // return h(type, props);
  // return ssr(type, props, children, false);
  return { type, props, children }
}

// support React Transform in case someone really wants it for some reason
export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment, JSX };
