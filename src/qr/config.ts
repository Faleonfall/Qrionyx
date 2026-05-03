import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  Options,
} from "qr-code-styling";

export const DEFAULT_QR_COLOR = "#3B1E8F";
export const DEFAULT_BACKGROUND_COLOR = "#FFFFFF";
export const PREVIEW_SIZE = 300;
export const DEFAULT_EXPORT_SIZE: ExportSize = 1024;
export const DEFAULT_FILENAME = "qr";
export const DEFAULT_MARGIN_LEVEL: MarginLevel = "standard";
export const DEFAULT_CORNER_TYPE: CornerSquareType = "rounded";

export type MarginLevel = "none" | "tight" | "standard" | "wide";
export type ExportSize = 512 | 1024 | 2048;

export type QrSettings = {
  data: string;
  qrColor: string;
  backgroundColor: string;
  dotType: DotType;
  cornerType: CornerSquareType;
  errorCorrectionLevel: ErrorCorrectionLevel;
  marginLevel: MarginLevel;
};

export type SelectOption = {
  label: string;
  value: string;
};

export const dotOptions: SelectOption[] = [
  { label: "Square", value: "square" },
  { label: "Rounded", value: "rounded" },
  { label: "Dots", value: "dots" },
  { label: "Angled", value: "classy" },
  { label: "Soft angled", value: "classy-rounded" },
  { label: "Capsule", value: "extra-rounded" },
];

export const errorCorrectionOptions: SelectOption[] = [
  { label: "Low", value: "L" },
  { label: "Medium", value: "M" },
  { label: "Balanced", value: "Q" },
  { label: "High", value: "H" },
];

export const marginOptions: SelectOption[] = [
  { label: "None", value: "none" },
  { label: "Compact", value: "tight" },
  { label: "Default", value: "standard" },
  { label: "Spacious", value: "wide" },
];

export const cornerOptions: SelectOption[] = [
  { label: "Square", value: "square" },
  { label: "Rounded", value: "rounded" },
  { label: "Circle", value: "dot" },
  { label: "Angled", value: "classy" },
  { label: "Soft angled", value: "classy-rounded" },
  { label: "Capsule", value: "extra-rounded" },
];

export const exportSizeOptions: SelectOption[] = [
  { label: "512 px", value: "512" },
  { label: "1024 px", value: "1024" },
  { label: "2048 px", value: "2048" },
];

function getMarginSize(level: MarginLevel, width: number) {
  const marginRatios: Record<MarginLevel, number> = {
    none: 0,
    tight: 0.04,
    standard: 0.07,
    wide: 0.12,
  };

  return Math.round(width * marginRatios[level]);
}

export function createQrOptions(
  settings: QrSettings,
  width = PREVIEW_SIZE,
  height = PREVIEW_SIZE,
): Options {
  return {
    width,
    height,
    margin: getMarginSize(settings.marginLevel, width),
    data: settings.data,
    qrOptions: {
      errorCorrectionLevel: settings.errorCorrectionLevel,
    },
    cornersSquareOptions: {
      type: settings.cornerType,
    },
    cornersDotOptions: {
      type: settings.cornerType as CornerDotType,
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
  return (
    url.replace(/^https?:\/\/(www\.)?|^www\./i, "") || "Waiting for a URL..."
  );
}
