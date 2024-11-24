import javascriptLogo from "./javascript.svg";
import { html } from "hono/html";

export async function render(_url: string) {
  const body = await html`
    ${(
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          target="_blank"
        >
          <img
            src={javascriptLogo}
            class="logo vanilla"
            alt="JavaScript logo"
          />
        </a>
        <h1>Hello Vite!</h1>
        <div class="card">
          <button id="counter" type="button"></button>
        </div>
        <p class="read-the-docs">Click on the Vite logo to learn more</p>
      </div>
    )}
  `;

  return {
    html: body,
  };
}
