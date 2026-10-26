import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PORT = 9227;
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const USER_DATA = path.join(process.env.TEMP || "C:\\Temp", "edge_cdp_profile_strip_" + Date.now());
const OUT_DIR = "C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\93e537a2-3106-4146-97f0-b8c85a2b44e7\\scratch\\responsive";

const proc = spawn(EDGE_PATH, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${USER_DATA}`,
  "--disable-gpu",
  "--no-first-run",
  "about:blank",
]);

await new Promise(r => setTimeout(r, 1200));

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
  close() { this.ws.close(); }
}

const targetClient = new CDPClient(wsUrl);
await targetClient.connect();
const { targetId } = await targetClient.send("Target.createTarget", { url: "about:blank" });
const client = new CDPClient(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
await client.connect();

await client.send("Page.enable");
await client.send("Runtime.enable");

// Desktop
await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await client.send("Page.navigate", { url: "http://localhost:3000/" });
await new Promise(r => setTimeout(r, 1500));

// Scroll to the new metrics section
await client.send("Runtime.evaluate", {
  expression: `document.getElementById('metrics-title')?.scrollIntoView({ block: 'start' })`
});
await new Promise(r => setTimeout(r, 800));

let shot = await client.send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync(path.join(OUT_DIR, "trust_strip_desktop_new.png"), Buffer.from(shot.data, "base64"));

// Mobile
await client.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await new Promise(r => setTimeout(r, 400));
await client.send("Runtime.evaluate", {
  expression: `document.getElementById('metrics-title')?.scrollIntoView({ block: 'start' })`
});
await new Promise(r => setTimeout(r, 800));

shot = await client.send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync(path.join(OUT_DIR, "trust_strip_mobile_new.png"), Buffer.from(shot.data, "base64"));

client.close();
targetClient.close();
proc.kill();
console.log("SCREENSHOTS_SAVED");
