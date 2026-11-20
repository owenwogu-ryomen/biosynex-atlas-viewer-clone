import assert from "node:assert/strict";
import {
  copyFileSync,
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const base = "/biosynex-atlas-viewer-clone/";
const pages = new Map([
  ["index.html", "Welcome to"],
  ["equipment/index.html", "Magnetic Resonance Imaging"],
  ["equipment/mri-scanner/index.html", "Magnetic Resonance Imaging"],
  ["equipment/mechanical-ventilator/index.html", "Mechanical Ventilator"],
  ["glossary/index.html", "Search glossary"],
  ["resources/index.html", "Search resources"],
]);

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith(".html") ? [path] : [];
  });
}

// Fail the deployment rather than uploading a README, a blank shell, or broken assets.
export function verifySite(directory) {
  for (const [file, marker] of pages) {
    const path = join(directory, file);
    assert(existsSync(path), `Missing prerendered page: ${file}`);
    const html = readFileSync(path, "utf8");
    assert(html.includes(marker), `${file} does not contain the expected app content`);
    assert(/<script\b[^>]*\bsrc="/.test(html), `${file} is missing JavaScript`);
    assert(html.includes(`${base}assets/`), `${file} is missing project-prefixed assets`);
    assert(html.includes(`${base}favicon.ico`), `${file} is missing the project favicon`);
  }

  const files = htmlFiles(directory);
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    assert(!html.includes('"unhandled":true'), `${file} contains an SSR error`);
    for (const [, value] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (!value.startsWith("/") || value.startsWith("//")) continue;
      assert(value.startsWith(base), `${file} has a URL outside the project: ${value}`);
      const relative = decodeURIComponent(value.slice(base.length).split(/[?#]/)[0]);
      const target = resolve(directory, relative);
      const root = resolve(directory);
      assert(target === root || target.startsWith(`${root}/`), `Invalid local URL: ${value}`);
      assert(
        (existsSync(target) && statSync(target).isFile()) || existsSync(join(target, "index.html")),
        `${file} links to a missing local file: ${value}`,
      );
    }
  }
  assert(existsSync(join(directory, "assets")), "Missing compiled assets directory");
  return files.length;
}

export function preparePages(directory) {
  const count = verifySite(directory);
  // GitHub Pages serves this for unknown paths; React can show its own 404 page.
  copyFileSync(join(directory, "index.html"), join(directory, "404.html"));
  writeFileSync(join(directory, ".nojekyll"), "");
  return count;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const directory = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/client");
  const checkOnly = process.argv.includes("--check");
  const count = checkOnly ? verifySite(directory) : preparePages(directory);
  assert(existsSync(join(directory, ".nojekyll")), "Missing .nojekyll");
  assert(existsSync(join(directory, "404.html")), "Missing 404.html");
  console.log(
    `Verified ${count} HTML pages, local links, assets, favicon and Pages support files.`,
  );
}
