import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const PORT = 4002;
const BASE_URL = `http://localhost:${PORT}`;
const ROUTES = ["/", "/activity", "/travel", "/music", "/timeline", "/projects", "/board"];

const run = (command, args, options = {}) =>
  new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: options.stdio ?? "inherit" });
    proc.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
      } else {
        resolve();
      }
    });
  });

async function waitForServer() {
  const maxAttempts = 20;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) return;
    } catch {
      // swallow
    }
    await wait(500);
  }
  throw new Error("Server did not respond in time");
}

async function main() {
  await run("npm", ["run", "build"]);
  const server = spawn("npm", ["run", "start", "--", "-p", `${PORT}`], {
    stdio: "inherit"
  });

  try {
    await waitForServer();
    for (const route of ROUTES) {
      const res = await fetch(`${BASE_URL}${route}`);
      if (!res.ok) {
        throw new Error(`Route ${route} returned ${res.status}`);
      }
    }
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

