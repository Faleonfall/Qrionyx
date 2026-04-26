import type { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel, Options } from "qr-code-styling";

export const DEFAULT_QR_COLOR = "#3B1E8F";
export const DEFAULT_BACKGROUND_COLOR = "#FFFFFF";
export const QR_SIZE = 1024;
export const PREVIEW_SIZE = 360;
export const QR_MARGIN = 20;

export type QrSettings = {
  data: string;
  qrColor: string;
  backgroundColor: string;
  dotType: DotType;
  errorCorrectionLevel: ErrorCorrectionLevel;
};

export type SelectOption = {
  label: string;
  value: string;
};

export const dotOptions: SelectOption[] = [
  { label: "Square", value: "square" },
  { label: "Rounded", value: "rounded" },
  { label: "Dots", value: "dots" },
  { label: "Classy", value: "classy" },
];

export const errorCorrectionOptions: SelectOption[] = [
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "Q", value: "Q" },
  { label: "H", value: "H" },
];

export function createQrOptions(settings: QrSettings, width = PREVIEW_SIZE, height = PREVIEW_SIZE): Options {
  return {
    width,
    height,
    margin: QR_MARGIN,
    data: settings.data,
    qrOptions: {
      errorCorrectionLevel: settings.errorCorrectionLevel,
    },
    cornersSquareOptions: {
      type: "rounded" as CornerSquareType,
    },
    cornersDotOptions: {
      type: "rounded" as CornerDotType,
    },
    dotsOptions: {
      color: settings.qrColor,
      type: settings.dotType,
    },
    backgroundOptions: {
      color: settings.backgroundColor,
    },
  };
}

export function formatPreviewUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?|^www\./i, "") || "Waiting for a URL...";
}
