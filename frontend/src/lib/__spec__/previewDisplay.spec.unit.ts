import { describe, expect, it } from "vitest";
import {
  getPreviewRadius,
  getScanStatusClass,
  getScanStatusLabel,
} from "../previewDisplay";

describe("getScanStatusLabel", () => {
  it("names each scan result", () => {
    expect(getScanStatusLabel("checking")).toBe("Checking");
    expect(getScanStatusLabel("scannable")).toBe("✓ Scannable");
    expect(getScanStatusLabel("unscannable")).toBe("✕ Low confidence");
  });
});

describe("getScanStatusClass", () => {
  it("colors success green, checking muted and failure pink", () => {
    expect(getScanStatusClass("scannable")).toContain("text-success");
    expect(getScanStatusClass("checking")).toContain("text-ink-muted");
    expect(getScanStatusClass("unscannable")).toContain("neon-pink");
  });
});

describe("getPreviewRadius", () => {
  it("turns the round amount into a percent radius", () => {
    expect(getPreviewRadius(0)).toBe("0%");
    expect(getPreviewRadius(0.5)).toBe("25%");
    expect(getPreviewRadius(1)).toBe("50%");
  });
});
