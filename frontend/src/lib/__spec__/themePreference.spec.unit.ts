import { afterEach, describe, expect, it, vi } from "vitest";
import { loadTheme, saveTheme } from "../themePreference";
import { stubFailingLocalStorage, stubLocalStorage } from "./storageHelpers";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("loadTheme", () => {
  it("returns null when nothing is saved", () => {
    stubLocalStorage();
    expect(loadTheme()).toBeNull();
  });

  it("returns a saved theme", () => {
    stubLocalStorage({ "qrionyx.theme": "light" });
    expect(loadTheme()).toBe("light");
  });

  it("clears an unknown value", () => {
    const { items } = stubLocalStorage({
      "qrionyx.theme": '{"expiresAt":1,"theme":"dark"}',
    });

    expect(loadTheme()).toBeNull();
    expect(items.has("qrionyx.theme")).toBe(false);
  });

  it("returns null when storage is unavailable", () => {
    stubFailingLocalStorage();
    expect(loadTheme()).toBeNull();
  });
});

describe("saveTheme", () => {
  it("saves the theme so it loads back", () => {
    stubLocalStorage();
    saveTheme("dark");
    expect(loadTheme()).toBe("dark");
  });

  it("ignores unavailable storage", () => {
    stubFailingLocalStorage();
    expect(() => {
      saveTheme("light");
    }).not.toThrow();
  });
});
