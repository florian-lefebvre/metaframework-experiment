/** @jsxImportSource ./jsx */

import javascriptLogo from "./javascript.svg";
import { slot } from "./jsx/render";
import { ReactComponent } from "./ReactComponent";
import VueComponent from "./VueComponent.vue";

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
      {/* TODO: client directives */}
      <ReactComponent name="React" icon={slot(<div>icon</div>)}>
        <p>this is a test</p>
        abcdef
      </ReactComponent>
      <VueComponent name="Vue" icon={slot(<div>icon</div>)}>
        <p>this is a test</p>
        abcdef
      </VueComponent>
      <div class="card">
        <button id="counter" type="button">
          Button
        </button>
      </div>
      <p class="read-the-docs">Click on the Vite logo to learn more</p>
      <script>{`console.log('test')`}</script>
    </div>
  );
}
