import type { FormSection } from "../qr/qrTypes";

export function getSectionClass(
  activeSection: FormSection,
  section: FormSection,
) {
  return activeSection === section
    ? "text-(--color-cyber-background) font-bold"
    : "text-(--color-text-muted) hover:text-(--color-neon-cyan)";
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
