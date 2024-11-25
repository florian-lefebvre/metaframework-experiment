import { defineConfig } from "vite";
import { metaframeworkPlugin } from "./metaframework-plugin";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [metaframeworkPlugin(), react(), vue()],
});
