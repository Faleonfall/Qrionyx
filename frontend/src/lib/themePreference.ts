const themeStorageKey = "qrionyx.theme";

export type AppTheme = "dark" | "light";

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

export function getNextTheme(theme: AppTheme): AppTheme {
  return theme === "dark" ? "light" : "dark";
}

export function getThemeToggleLabel(theme: AppTheme) {
  return `Switch to ${getNextTheme(theme)} theme`;
}

export function getFaviconHref(theme: AppTheme, baseUrl: string) {
  return `${baseUrl}favicon-${theme}.svg`;
}

export function saveTheme(theme: AppTheme) {
  try {
    globalThis.localStorage.setItem(themeStorageKey, theme);
  } catch {
    return;
  }
}
