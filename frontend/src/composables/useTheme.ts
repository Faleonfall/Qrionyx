import { computed, onMounted, ref } from "vue";
import {
  getFaviconHref,
  getNextTheme,
  getThemeToggleLabel,
  loadTheme,
  saveTheme,
  type AppTheme,
} from "../lib/themePreference";

export function useTheme() {
  const activeTheme = ref<AppTheme>("dark");
  const toggleLabel = computed(() => getThemeToggleLabel(activeTheme.value));

  function applyTheme(theme: AppTheme) {
    const root = document.documentElement;

    activeTheme.value = theme;
    root.setAttribute("data-theme", theme);
    document
      .querySelector('link[rel="icon"]')
      ?.setAttribute("href", getFaviconHref(theme, import.meta.env.BASE_URL));
    // Browser bars match the page background token of the applied theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        getComputedStyle(root).getPropertyValue("--color-page").trim(),
      );
  }

  function toggleTheme() {
    const nextTheme = getNextTheme(activeTheme.value);
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  }

  onMounted(() => {
    // Saved choice wins, else fall back to system prefers-color-scheme
    const prefersLight = globalThis.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    applyTheme(loadTheme() ?? (prefersLight ? "light" : "dark"));
  });

  return { activeTheme, toggleLabel, toggleTheme };
}
