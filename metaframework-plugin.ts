import * as vite from "vite";

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
                    : ["/src/style.css"],
                },
              },
        };
      },
      configureServer(server) {
        return () => {
          server.middlewares.use(async (req, res, next) => {
            const url = (req.originalUrl ?? "").replace("/", "");

            const { render } = await server.ssrLoadModule("/src/entry-server");
            const { html } = await render(url);

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          });
        };
      },
    },
  ];
}
