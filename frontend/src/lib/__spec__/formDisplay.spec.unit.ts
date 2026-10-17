import { describe, expect, it } from "vitest";
import { getSectionClass, getSectionPanelClass } from "../formDisplay";

describe("getSectionClass", () => {
  it("highlights only the active section", () => {
    expect(getSectionClass("basic", "basic")).toContain("font-bold");
    expect(getSectionClass("basic", "advanced")).not.toContain("font-bold");
  });
});

describe("getSectionPanelClass", () => {
  it("shows the active panel in place", () => {
    expect(getSectionPanelClass("advanced", "advanced")).toContain(
      "translate-x-0 opacity-100",
    );
  });

  it("slides hidden panels out on their own side", () => {
    expect(getSectionPanelClass("advanced", "basic")).toContain(
      "-translate-x-8",
    );
    expect(getSectionPanelClass("basic", "advanced")).toMatch(
      / translate-x-8 /,
    );
  });
});
