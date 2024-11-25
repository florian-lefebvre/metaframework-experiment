import type { JSX, Tag } from "./jsx.types";

export function attributesToString(attributes: Attributes): string {
  const result: string[] = [];
  for (const attribute of attributes) {
    const str = attributeToString(attribute);
    if (str.length > 0) {
      result.push(str);
    }
  }
  return result.join(" ");
}

function attributeToString([key, value]: [string, any]): string {
  if (value === true) {
    return key;
  }
  if (value === false || value === null || value === undefined) {
    return "";
  }
  if (typeof value === "object") {
    switch (key) {
      case "style":
        const styles = Object.entries(value).map(([k, v]) => `${k}: ${v}`);
        return `style="${escapeQuotes(styles.join("; "))}"`;
      case "class":
        const classes = Object.entries(value)
          .filter(([_k, v]) => v)
          .map(([k, _v]) => k);
        return classes.length > 0
          ? `class="${escapeQuotes(classes.join(" "))}"`
          : "";
      default:
        return `${key}="${escapeQuotes(JSON.stringify(value))}"`;
    }
  }
  return `${key}="${escapeQuotes(value.toString())}"`;
}

function escapeQuotes(str: string) {
  return str.replaceAll('"', "&quot;");
}

export type Attributes = [string, string | undefined][];

export function createElement(element: Tag): {
  tag: string;
  attributes: Attributes;
  children: JSX.Element[];
} {
  return {
    tag: element.tag.toString(),
    attributes: createAttributes(element),
    children: createChildren(element),
  };
}

function createAttributes(element: Tag): Attributes {
  const attributes: Attributes = [];
  for (const [key, value] of Object.entries(element.props)) {
    if (key !== "children") {
      attributes.push([key, value]);
    }
  }
  return attributes;
}

function createChildren(element: Tag): JSX.Element[] {
  if (!element.props.children) {
    return [];
  }
  if (Array.isArray(element.props.children)) {
    return element.props.children as JSX.Element[];
  }
  return [element.props.children as JSX.Element];
}

/**
 * Escapes special HTML entities in a given input string.
 *
 * @param {string} input - The input string to escape.
 * @return {string} The input string with special HTML entities escaped.
 */
export function escapeEntities(input: string) {
  return typeof input === "string"
    ? input.replace(ESCAPE, (match) => ENTITIES[match] || match)
    : input;
}

const ENTITIES: { [k: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const ESCAPE = new RegExp(`[${Object.keys(ENTITIES).join("")}]`, "g");

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/**
 * Renders a JSX element to a string representation.
 *
 * @param {any} this - The (optional) 'this' context of the function.
 * @param {JSX.Element} jsxElement - The JSX element to render.
 * @return {Promise<string>} The string representation of the rendered JSX element.
 */
export async function jsxToString(
  this: any,
  jsxElement: JSX.Element,
  renderers: Record<string, (tag: Tag) => any | Promise<any>>
): Promise<string> {
  const $jsxToString = this?.jsxToString || jsxToString;

  if (jsxElement === null) {
    return "";
  }

  switch (typeof jsxElement) {
    case "string":
      return jsxElement;
    case "bigint":
    case "number":
      return String(jsxElement);
    case "boolean":
    case "function":
    case "symbol":
    case "undefined":
      return "";
  }

  assertSync(jsxElement);

  if (jsxElement.type === "textNode") {
    return jsxElement.text;
  }

  if (typeof jsxElement.tag === "string") {
    const element = createElement(jsxElement);
    if (element.tag === "") {
      const result: string[] = [];
      for (const child of element.children) {
        const str = await $jsxToString.call(this, child, renderers);
        if (str.length > 0) {
          result.push(str);
        }
      }
      return result.join("");
    } else {
      const attributes = attributesToString(element.attributes);
      const separator = attributes.length ? " " : "";

      if (element.children.length === 0 && VOID_TAGS.has(element.tag)) {
        return `<${element.tag}${separator}${attributes}>`;
      }

      const children: string[] = [];
      for (const child of element.children) {
        const str = await $jsxToString.call(this, child, renderers);
        if (str.length > 0) {
          children.push(str);
        }
      }

      return `<${element.tag}${separator}${attributes}>${children.join("")}</${
        element.tag
      }>`;
    }
  }

  if (typeof jsxElement.tag === "function") {
    if (
      "__framework" in jsxElement.tag &&
      typeof jsxElement.tag.__framework === "string"
    ) {
      if (jsxElement.tag.__framework in renderers) {
        return await renderers[jsxElement.tag.__framework](jsxElement);
      }
      console.warn(`Renderer "${jsxElement.tag.__framework} not found"`);
      return "";
    }
    const jsxElementTag = await jsxElement.tag.call(this, jsxElement.props);
    return await $jsxToString.call(this, jsxElementTag, renderers);
  }

  return "";
}

function assertSync(_: JSX.Element): asserts _ is JSX.SyncElement {}
