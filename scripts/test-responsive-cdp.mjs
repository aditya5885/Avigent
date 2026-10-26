import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PORT = 9224;
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA = path.join(process.env.TEMP || "C:\\Temp", "edge_cdp_profile_" + Date.now());
const OUT_DIR = "C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\93e537a2-3106-4146-97f0-b8c85a2b44e7\\scratch\\responsive";

fs.mkdirSync(OUT_DIR, { recursive: true });

// Start Edge
const proc = spawn(EDGE_PATH, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${USER_DATA}`,
  "--disable-gpu",
  "--no-first-run",
  "about:blank",
]);

process.on("exit", () => {
  try { proc.kill("SIGKILL"); } catch {}
  try { fs.rmSync(USER_DATA, { recursive: true, force: true }); } catch {}
});

await new Promise(r => setTimeout(r, 1500));

// Get websocket debugger URL
const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/version`);
const versionData = await versionRes.json();
const wsUrl = versionData.webSocketDebuggerUrl;

class CDPClient {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id && this.callbacks.has(data.id)) {
          const { resolve, reject } = this.callbacks.get(data.id);
          this.callbacks.delete(data.id);
          if (data.error) reject(new Error(data.error.message));
          else resolve(data.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

// Create new target
const targetClient = new CDPClient(wsUrl);
await targetClient.connect();
const { targetId } = await targetClient.send("Target.createTarget", { url: "about:blank" });

// Connect to page target
const pageWsUrl = `ws://127.0.0.1:${PORT}/devtools/page/${targetId}`;
const client = new CDPClient(pageWsUrl);
await client.connect();

await client.send("Page.enable");
await client.send("DOM.enable");
await client.send("Runtime.enable");

const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true, scale: 2 },
  { name: "tablet", width: 768, height: 1024, isMobile: false, scale: 1 },
];

const pages = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "services", path: "/services" },
  { name: "service_detail", path: "/services/renewable-energy-epc" },
  { name: "projects", path: "/projects" },
  { name: "contact", path: "/contact" },
];

const results = [];

for (const vp of viewports) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.scale,
    mobile: vp.isMobile,
  });

  for (const page of pages) {
    const url = `http://localhost:3000${page.path}`;
    await client.send("Page.navigate", { url });
    await new Promise(r => setTimeout(r, 1200));

    // Check overflow
    const evalRes = await client.send("Runtime.evaluate", {
      expression: `
        (() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasOverflow = scrollWidth > clientWidth;

          const overflowing = [];
          if (hasOverflow) {
            document.querySelectorAll('*').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.right > clientWidth + 2) {
                overflowing.push({
                  tag: el.tagName,
                  id: el.id,
                  cls: el.className ? String(el.className).substring(0, 60) : '',
                  right: Math.round(r.right),
                  width: Math.round(r.width),
                });
              }
            });
          }

          return {
            scrollWidth,
            clientWidth,
            hasOverflow,
            overflowElements: overflowing.slice(0, 5)
          };
        })()
      `,
      returnByValue: true,
    });

    const report = evalRes.result.value;

    // Screenshot
    const shot = await client.send("Page.captureScreenshot", { format: "png" });
    const shotPath = path.join(OUT_DIR, `${page.name}_${vp.name}_cdp.png`);
    fs.writeFileSync(shotPath, Buffer.from(shot.data, "base64"));

    // If home page on mobile, test mobile menu open and footer scroll
    if (page.name === "home" && vp.name === "mobile") {
      // Test mobile menu
      await client.send("Runtime.evaluate", {
        expression: `document.querySelector('button[aria-controls="mobile-menu"]')?.click()`
      });
      await new Promise(r => setTimeout(r, 600));
      const menuShot = await client.send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(path.join(OUT_DIR, "menu_open_mobile_cdp.png"), Buffer.from(menuShot.data, "base64"));
      // Close menu
      await client.send("Runtime.evaluate", {
        expression: `document.querySelector('button[aria-controls="mobile-menu"]')?.click()`
      });
      await new Promise(r => setTimeout(r, 400));

      // Scroll to footer
      await client.send("Runtime.evaluate", {
        expression: `window.scrollTo(0, document.body.scrollHeight)`
      });
      await new Promise(r => setTimeout(r, 800));
      const footerShot = await client.send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(path.join(OUT_DIR, "footer_mobile_cdp.png"), Buffer.from(footerShot.data, "base64"));
    }

    results.push({
      page: page.name,
      viewport: vp.name,
      width: vp.width,
      scrollWidth: report.scrollWidth,
      clientWidth: report.clientWidth,
      hasOverflow: report.hasOverflow,
      overflowElements: report.overflowElements,
      shotPath,
    });
  }
}

client.close();
targetClient.close();
proc.kill();

console.log(JSON.stringify(results, null, 2));
