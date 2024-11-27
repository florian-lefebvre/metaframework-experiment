import express from "express";
import compression from "compression";
import sirv from "sirv";
import { fileURLToPath } from "node:url";

// Constants
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

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
    const { render } = await import("./entry-server");

    const { html } = await render(url);

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
