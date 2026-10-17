import { render } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h } from "vue";
import { useTheme } from "../useTheme";

function mountTheme() {
  let theme = {} as ReturnType<typeof useTheme>;

  render({
    setup() {
      theme = useTheme();
      return () => h("div");
    },
  });

  return theme;
}

function stubSystemTheme(light: boolean) {
  vi.stubGlobal("matchMedia", () => ({ matches: light }));
}

describe("useTheme", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("follows the system theme without a saved choice", () => {
    stubSystemTheme(true);

    const theme = mountTheme();

    expect(theme.activeTheme.value).toBe("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("prefers the saved choice over the system theme", () => {
    stubSystemTheme(true);
    localStorage.setItem("qrionyx.theme", "dark");

    const theme = mountTheme();

    expect(theme.activeTheme.value).toBe("dark");
  });

  it("flips and saves the theme on toggle", () => {
    stubSystemTheme(false);

    const theme = mountTheme();
    theme.toggleTheme();

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("qrionyx.theme")).toBe("light");
    expect(theme.toggleLabel.value).toBe("Switch to dark theme");
  });
});
