import { Application, Router } from "@oak/oak";
import { addParams } from "./utils.ts";
import { runShoutrrr } from "./shoutrrr.ts";

interface PostJSONParams {
  url: string;
  message: string;
  title: string;
  params: Record<string, string | number | boolean>;
}

const port = Deno.env.get("SERVER_PORT") ? parseInt(Deno.env.get("SERVER_PORT")!) : 8000;
const app = new Application();
const router = new Router();

router.get("/", async (ctx) => {
  const { output, error } = await runShoutrrr(["--version"]);
  ctx.response.headers.set("Content-Type", "application/json");
  const newOutput = output.replace("shoutrrr version", "Shoutrrr version:") + [
    "",
    "You can send Shoutrrr messages by sending a POST request to this server.",
    "",
    "The body of the request should be a JSON object with the following fields:",
    "",
    "  url: string",
    "  message: string",
    "  title: string (optional)",
    "  params: Record<string, string | number | boolean> (optional)",
    "",
  ].join("\n");
  ctx.response.body = JSON.stringify({ output: newOutput, error });
});

router.post("/", async (ctx) => {
  const json = (await ctx.request.body.json()) as Partial<PostJSONParams>;
  const { url, message, title, params } = json;
  if (!url) {
    ctx.response.body = "Missing url, required parameters";
    return;
  }
  const urlWithParams = params ? addParams(url, params) : url;
  if (!message) {
    const { output, error } = await runShoutrrr(["verify", "--url", urlWithParams]);
    ctx.response.headers.set("Content-Type", "application/json");
    let out = output;
    let err = error;
    if (output && output.includes("error verifying")) {
      err = output + `\n\n URL: ${urlWithParams}`;
      out = "";
    }
    ctx.response.body = JSON.stringify({ output: out, error: err });
    return;
  }
  const shouterArgs = ["send", "--url", urlWithParams, "--message", message];
  if (title) {
    shouterArgs.push("--title", title);
  }
  const { output, error } = await runShoutrrr(shouterArgs);
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = JSON.stringify({ output, error });
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener("listen", () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
