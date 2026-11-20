import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, test } from "node:test";
import { preparePages, verifySite } from "./prepare-pages.mjs";

let directory;
const base = "/biosynex-atlas-viewer-clone/";
function write(file, text) {
  const path = join(directory, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "biosynex-pages-"));
  write("assets/app.js", "");
  write("favicon.ico", "");
  for (const [file, content] of [
    ["index.html", "Welcome to"],
    ["equipment/index.html", "Magnetic Resonance Imaging"],
    ["equipment/mri-scanner/index.html", "Magnetic Resonance Imaging"],
    ["equipment/mechanical-ventilator/index.html", "Mechanical Ventilator"],
    ["glossary/index.html", "Search glossary"],
    ["resources/index.html", "Search resources"],
  ]) {
    write(
      file,
      `<h1>${content}</h1><script src="${base}assets/app.js"></script><link href="${base}favicon.ico"><a href="${base}glossary/">Glossary</a>`,
    );
  }
});
afterEach(() => rmSync(directory, { recursive: true, force: true }));

test("prepares the real site with a fallback and no Jekyll", () => {
  assert.equal(preparePages(directory), 6);
  assert.equal(readFileSync(join(directory, ".nojekyll"), "utf8"), "");
  assert.equal(
    readFileSync(join(directory, "404.html"), "utf8"),
    readFileSync(join(directory, "index.html"), "utf8"),
  );
});

test("rejects README HTML in place of the application", () => {
  write("index.html", "<h1>Biosynex Atlas</h1><p>Who it is for</p>");
  assert.throws(() => verifySite(directory), /expected app content/);
});

test("rejects missing deep-link pages", () => {
  unlinkSync(join(directory, "equipment/mri-scanner/index.html"));
  assert.throws(() => verifySite(directory), /Missing prerendered page/);
});

test("rejects broken asset references", () => {
  unlinkSync(join(directory, "assets/app.js"));
  assert.throws(() => verifySite(directory), /missing local file/);
});

test("rejects internal links that escape the project base", () => {
  const path = join(directory, "index.html");
  write("index.html", `${readFileSync(path, "utf8")}<a href="/resources">Resources</a>`);
  assert.throws(() => verifySite(directory), /outside the project/);
});
