import { describe, expect, it } from "vitest";
import {
  clampLogoSizePercent,
  getLogoSizeKeyStep,
  getLogoSizeMaxPercent,
  getPointerLogoSizePercent,
} from "../logoSizeLimit";

function square(moduleCount: number) {
  return { moduleCount, naturalHeight: 100, naturalWidth: 100 };
}

describe("getLogoSizeMaxPercent", () => {
  it("stays at the minimum when the code is too small to hide dots", () => {
    expect(getLogoSizeMaxPercent(square(10))).toBe(20);
  });

  it("grows with the module count for a square logo", () => {
    expect(getLogoSizeMaxPercent(square(21))).toBe(35);
    expect(getLogoSizeMaxPercent(square(33))).toBe(60);
    expect(getLogoSizeMaxPercent(square(57))).toBe(80);
  });

  it("caps wide and tall logos lower than square ones", () => {
    expect(
      getLogoSizeMaxPercent({
        moduleCount: 33,
        naturalHeight: 100,
        naturalWidth: 300,
      }),
    ).toBe(35);
    expect(
      getLogoSizeMaxPercent({
        moduleCount: 33,
        naturalHeight: 300,
        naturalWidth: 100,
      }),
    ).toBe(40);
  });

  it("returns a step of five between twenty and one hundred", () => {
    for (let moduleCount = 0; moduleCount <= 177; moduleCount += 4) {
      const percent = getLogoSizeMaxPercent(square(moduleCount));

      expect(percent).toBeGreaterThanOrEqual(20);
      expect(percent).toBeLessThanOrEqual(100);
      expect(percent % 5).toBe(0);
    }
  });
});

describe("clampLogoSizePercent", () => {
  it("snaps to the nearest step of five", () => {
    expect(clampLogoSizePercent(42, 100)).toBe(40);
    expect(clampLogoSizePercent(43, 100)).toBe(45);
  });

  it("stays between twenty and the max", () => {
    expect(clampLogoSizePercent(3, 100)).toBe(20);
    expect(clampLogoSizePercent(90, 60)).toBe(60);
  });
});

describe("getPointerLogoSizePercent", () => {
  it("maps the pointer position along the track to a percent", () => {
    expect(getPointerLogoSizePercent(150, { left: 100, width: 200 })).toBe(25);
    expect(getPointerLogoSizePercent(300, { left: 100, width: 200 })).toBe(100);
  });
});

describe("getLogoSizeKeyStep", () => {
  it("steps up and down with the arrow keys", () => {
    expect(getLogoSizeKeyStep("ArrowRight")).toBe(5);
    expect(getLogoSizeKeyStep("ArrowUp")).toBe(5);
    expect(getLogoSizeKeyStep("ArrowLeft")).toBe(-5);
    expect(getLogoSizeKeyStep("ArrowDown")).toBe(-5);
  });

  it("ignores other keys", () => {
    expect(getLogoSizeKeyStep("Enter")).toBe(0);
  });
});
