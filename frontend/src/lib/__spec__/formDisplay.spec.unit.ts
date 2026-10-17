import { describe, expect, it } from "vitest";
import {
  getLogoDotsLabel,
  getSectionClass,
  getSectionPanelClass,
  getSectionPillClass,
} from "../formDisplay";

describe("getSectionPillClass", () => {
  it("slides the pill under the active section", () => {
    expect(getSectionPillClass("basic")).toBe("translate-x-0");
    expect(getSectionPillClass("advanced")).toBe("translate-x-full");
  });
});

describe("getLogoDotsLabel", () => {
  it("names the current setting", () => {
    expect(getLogoDotsLabel(true)).toBe("Hide");
    expect(getLogoDotsLabel(false)).toBe("Show");
  });
});

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
