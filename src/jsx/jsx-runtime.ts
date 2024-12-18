import { Tag, TextNode, type JSX } from "./jsx.types";

export function createElement(
  tag:
    | string
    | ((props: any) => JSX.Element)
    | ((props: any) => Promise<JSX.Element>),
  props?: {
    [k: string]: any;
    children?: JSX.Children;
  }
  // ...children: Array<JSX.Children>
): JSX.Element {
  props ??= {};

  const finalChildren: JSX.Element[] = [];

  // for (const child of children) {
  //   mapChildren(child, finalChildren);
  // }

  if (props?.children) {
    mapChildren(props.children, finalChildren);
  }

  props.children = finalChildren;

  return new Tag(
    //@ts-expect-error
    tag,
    props
  );
}

function mapChildren(children: JSX.Children, accumulator: JSX.Element[]): void {
  switch (typeof children) {
    case "string":
      accumulator.push(new TextNode(children));
      break;
    case "number":
      accumulator.push(new TextNode(children.toString()));
      break;
    case "object":
      if (Array.isArray(children)) {
        for (const child of children) {
          mapChildren(child, accumulator);
        }
      } else if (children != null) {
        accumulator.push(children);
      }
      break;
  }
}

export const jsx = createElement;
export const jsxs = jsx;
export const _jsx = jsx;
export const _jsxs = jsx;

export const Fragment = "";
export const _Fragment = Fragment;

export type { JSX };
