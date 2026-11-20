import { describe, expect, it } from "vitest";

import { withBasePath } from "@/lib/base-path";
import { renderErrorPage } from "@/lib/error-page";

describe("GitHub Pages base path", () => {
  const projectBase = "/biosynex-atlas-viewer-clone/";

  it("keeps public assets inside the project site", () => {
    expect(withBasePath("/favicon.ico", projectBase)).toBe(
      "/biosynex-atlas-viewer-clone/favicon.ico",
    );
  });

  it("keeps home links inside the project site", () => {
    expect(withBasePath("/", projectBase)).toBe(projectBase);
    expect(renderErrorPage(projectBase)).toContain('href="/biosynex-atlas-viewer-clone/"');
  });

  it("does not add an extra prefix when hosted at a domain root", () => {
    expect(withBasePath("/favicon.ico", "/")).toBe("/favicon.ico");
  });
});
