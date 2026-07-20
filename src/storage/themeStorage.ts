export type AppTheme = "dark" | "light";

const themeStorageKey = "qrionyx.theme";
const themeTtlMs = 7 * 24 * 60 * 60 * 1000;

type SavedThemePayload = {
  expiresAt: number;
  theme: AppTheme;
};

function isSavedThemePayload(value: unknown): value is SavedThemePayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<SavedThemePayload>;

  return (
    typeof payload.expiresAt === "number" &&
    (payload.theme === "dark" || payload.theme === "light")
  );
}

export function loadTheme(): AppTheme | null {
  try {
    const rawTheme = globalThis.localStorage.getItem(themeStorageKey);

    if (!rawTheme) {
      return null;
    }

    const payload: unknown = JSON.parse(rawTheme);

    if (!isSavedThemePayload(payload) || payload.expiresAt <= Date.now()) {
      globalThis.localStorage.removeItem(themeStorageKey);
      return null;
    }

    return payload.theme;
  } catch {
    return null;
  }
}

export function saveTheme(theme: AppTheme) {
  try {
    const payload: SavedThemePayload = {
      expiresAt: Date.now() + themeTtlMs,
      theme,
    };

    globalThis.localStorage.setItem(themeStorageKey, JSON.stringify(payload));
  } catch {
    return;
  }
}
