import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getFaviconHref,
  getNextTheme,
  getThemeToggleLabel,
  loadTheme,
  saveTheme,
} from "../themePreference";
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

describe("getNextTheme", () => {
  it("flips between dark and light", () => {
    expect(getNextTheme("dark")).toBe("light");
    expect(getNextTheme("light")).toBe("dark");
  });
});

describe("getThemeToggleLabel", () => {
  it("names the theme the toggle switches to", () => {
    expect(getThemeToggleLabel("dark")).toBe("Switch to light theme");
    expect(getThemeToggleLabel("light")).toBe("Switch to dark theme");
  });
});

describe("getFaviconHref", () => {
  it("points at the icon for the theme under the base URL", () => {
    expect(getFaviconHref("light", "./")).toBe("./favicon-light.svg");
    expect(getFaviconHref("dark", "/Qrionyx/")).toBe(
      "/Qrionyx/favicon-dark.svg",
    );
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
