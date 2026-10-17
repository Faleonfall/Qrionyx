import { vi } from "vitest";

// In-memory stand-in for localStorage, so storage specs stay unit specs.
export function stubLocalStorage(initial: Record<string, string> = {}) {
  const items = new Map(Object.entries(initial));
  const storage = {
    getItem: vi.fn((key: string) => items.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      items.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      items.delete(key);
    }),
  };

  vi.stubGlobal("localStorage", storage);
  return { items, storage };
}

export function stubFailingLocalStorage() {
  const fail = () => {
    throw new Error("Storage unavailable");
  };

  vi.stubGlobal("localStorage", {
    getItem: fail,
    setItem: fail,
    removeItem: fail,
  });
}
