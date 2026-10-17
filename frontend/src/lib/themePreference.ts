export type AppTheme = "dark" | "light";

const themeStorageKey = "qrionyx.theme";

function isAppTheme(value: string | null): value is AppTheme {
  return value === "dark" || value === "light";
}

export function loadTheme(): AppTheme | null {
  try {
    const savedTheme = globalThis.localStorage.getItem(themeStorageKey);

    if (isAppTheme(savedTheme)) {
      return savedTheme;
    }

    globalThis.localStorage.removeItem(themeStorageKey);
    return null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: AppTheme) {
  try {
    globalThis.localStorage.setItem(themeStorageKey, theme);
  } catch {
    return;
  }
}
