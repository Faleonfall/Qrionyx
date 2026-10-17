import type { QrScanStatus } from "./scanQr";

export function getScanStatusLabel(status: QrScanStatus) {
  if (status === "checking") {
    return "Checking";
  }

  return status === "scannable" ? "✓ Scannable" : "✕ Low confidence";
}

export function getScanStatusClass(status: QrScanStatus) {
  if (status === "scannable") {
    return "border-success bg-success/15 text-success";
  }

  if (status === "checking") {
    return "border-line bg-panel/80 text-ink-muted";
  }

  return "border-neon-pink bg-neon-pink/15 text-neon-pink";
}

export function getPreviewRadius(backgroundRound: number) {
  return `${String(backgroundRound * 50)}%`;
}
