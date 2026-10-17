import type { FormSection } from "./qrTypes";

export function getSectionClass(
  activeSection: FormSection,
  section: FormSection,
) {
  return activeSection === section
    ? "text-page font-bold"
    : "text-ink-muted hover:text-neon-cyan";
}

export function getSectionPillClass(activeSection: FormSection) {
  return activeSection === "basic" ? "translate-x-0" : "translate-x-full";
}

export function getLogoDotsLabel(hideBackgroundDots: boolean) {
  return hideBackgroundDots ? "Hide" : "Show";
}

export function getSectionPanelClass(
  activeSection: FormSection,
  section: FormSection,
) {
  if (activeSection === section) {
    return "relative z-10 translate-x-0 opacity-100";
  }

  const offset = section === "basic" ? "-translate-x-8" : "translate-x-8";

  return `absolute left-0 top-0 w-full pointer-events-none z-0 ${offset} opacity-0`;
}
