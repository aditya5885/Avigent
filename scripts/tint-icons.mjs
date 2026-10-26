// Tints 3dicons.co "clay" renders (CC0) with the AVIGENT blue→green gradient
// and exports optimised WebP files into public/icons3d.
// Usage: node scripts/tint-icons.mjs <srcDir>
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const src = process.argv[2];
const out = path.resolve("public/icons3d");
mkdirSync(out, { recursive: true });

const icons = [
  "tool", "sheild", "bulb", "sun", "setting", "flash", "chat", "medal",
  "map-pin", "rocket", "battery", "phone-ringing", "mail", "target", "tick",
];
const SIZE = 320;

const gradient = (a, b) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/></svg>`);

const variants = {
  brand: ["#5aa9ff", "#4cf0a8"], // electric → volt
  volt: ["#7af5c0", "#19cc85"],
  navy: ["#4a68ad", "#14234a"], // for light panels (volt / mist)
  white: ["#ffffff", "#dfe9fb"], // soft clay, for dark / blue panels
};

for (const name of icons) {
  const base = await sharp(path.join(src, `${name}-clay.png`))
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  for (const [variant, [a, b]] of Object.entries(variants)) {
    const multiplied = await sharp(base)
      .composite([{ input: gradient(a, b), blend: "multiply" }])
      .png()
      .toBuffer();
    // restore the original alpha mask
    await sharp(multiplied)
      .composite([{ input: base, blend: "dest-in" }])
      .modulate({ brightness: 1.08, saturation: 1.15 })
      .webp({ quality: 82, alphaQuality: 90 })
      .toFile(path.join(out, `${name === "sheild" ? "shield" : name}-${variant}.webp`));
  }
}
console.log("done", icons.length * Object.keys(variants).length, "files");
