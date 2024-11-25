/** @jsxImportSource ./jsx */

import javascriptLogo from "./javascript.svg";
import { ReactComponent } from "./ReactComponent";
import { frameworkComponent } from "./utils";
import _VueComponent from "./VueComponent.vue";

const VueComponent = frameworkComponent("vue", () => _VueComponent)

// function Island({ children }: { children: any }) {
//   return <div>{children}</div>;
// }

export function App({ name }: { name: string }) {
  return (
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        target="_blank"
      >
        <img src={javascriptLogo} class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello {name}!</h1>
      {/* <Island> */}
      <ReactComponent />
      <VueComponent name="Vue" />
      {/* </Island> */}
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">Click on the Vite logo to learn more</p>
    </div>
  );
}
