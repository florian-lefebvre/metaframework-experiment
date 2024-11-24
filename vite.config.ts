import { defineConfig } from "vite";
import { metaframeworkPlugin } from "./metaframework-plugin";

export default defineConfig({
  plugins: [metaframeworkPlugin()],
});
