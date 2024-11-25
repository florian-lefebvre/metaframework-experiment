import { defineConfig } from "vite";
import { metaframeworkPlugin } from "./metaframework-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [metaframeworkPlugin(), react()],
});
