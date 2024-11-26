import * as vite from "vite";
import fs from "node:fs/promises";

export function metaframeworkPlugin(): Array<vite.Plugin> {
  return [
    {
      enforce: "post",
      name: "metaframework",
      config(_config, env) {
        const isDev = env.command !== "build";

        return {
          esbuild: {
            format: "esm",
          },
          build: isDev
            ? {}
            : {
                target: "esnext",
                outDir: env.isSsrBuild ? "dist/server" : "dist/client",
                rollupOptions: {
                  input: env.isSsrBuild
                    ? ["/src/entry-server", "/src/entry"]
                    : ["/src/index.html", "/src/entry-client"],
                },
              },
        };
      },
      configureServer(server) {
        return () => {
          server.middlewares.use(async (req, res, next) => {
            const url = (req.originalUrl ?? "").replace("/", "");

            let template = await fs.readFile("./src/index.html", "utf-8");
            template = await server.transformIndexHtml(url, template);
            const { render } = await server.ssrLoadModule("/src/entry-server");
            const rendered = await render(url);

            const html = template
              .replace(`<!--app-head-->`, rendered.head ?? "")
              .replace(`<!--app-html-->`, rendered.html ?? "");

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          });
        };
      },
    },
  ];
}
