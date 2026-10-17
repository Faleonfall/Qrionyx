import { describe, expect, it } from "vitest";
import { getLogoSizeLabel } from "../renderedLogoSize";

describe("getLogoSizeLabel", () => {
  it("shows one side for a square logo", () => {
    expect(getLogoSizeLabel(80.4, 80.2)).toBe("80 px");
  });

  it("treats a one pixel difference as square", () => {
    expect(getLogoSizeLabel(80, 81)).toBe("80 px");
  });

  it("shows both sides for a wide logo", () => {
    expect(getLogoSizeLabel(120, 60)).toBe("120 x 60 px");
  });

  it("is empty when a side rounds to zero", () => {
    expect(getLogoSizeLabel(0.4, 50)).toBe("");
  });
});
