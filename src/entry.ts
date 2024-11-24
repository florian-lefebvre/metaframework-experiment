import fs from "node:fs/promises";
import express from "express";
import compression from "compression";
import sirv from "sirv";
import { fileURLToPath } from "node:url";

// Constants
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const template = await fs.readFile(
  new URL("../client/src/index.html", import.meta.url),
  "utf-8"
);

// Create http server
const app = express();

app.use(compression());
app.use(
  base,
  sirv(fileURLToPath(new URL("../client/", import.meta.url)), {
    extensions: [],
  })
);

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");
    // @ts-ignore
    const { render } = await import("./entry-server.js");

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e: any) {
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
