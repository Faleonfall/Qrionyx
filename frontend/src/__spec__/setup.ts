import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/vue";
import { afterEach } from "vitest";

// Stand-ins for browser APIs jsdom lacks, each one only while it is missing
if (typeof globalThis.ResizeObserver !== "function") {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof globalThis.matchMedia !== "function") {
  globalThis.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
    }) as unknown as MediaQueryList;
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});
