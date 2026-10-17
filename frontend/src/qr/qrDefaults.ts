import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";
import type { ExportSize, MarginLevel } from "./qrTypes";

export const DEFAULT_QR_COLOR = "#3B1E8F";
export const DEFAULT_BACKGROUND_COLOR = "#FFFFFF";
export const PREVIEW_DISPLAY_SIZE = 300;
export const PREVIEW_SIZE = 600;
export const DEFAULT_EXPORT_SIZE: ExportSize = 1024;
export const DEFAULT_FILENAME = "qr";
export const DEFAULT_MARGIN_LEVEL: MarginLevel = "standard";
export const DEFAULT_CORNER_TYPE: CornerSquareType = "rounded";
export const DEFAULT_SHAPE_TYPE: ShapeType = "square";
export const DEFAULT_IMAGE_SIZE = 0.4;
export const DEFAULT_IMAGE_MARGIN = 0;
export const DEFAULT_BACKGROUND_ROUND = 0;
export const DEFAULT_DOT_TYPE: DotType = "square";
export const DEFAULT_ERROR_CORRECTION_LEVEL: ErrorCorrectionLevel = "M";
export const DEFAULT_DOTS_GRADIENT_END_COLOR = "#8BE9FF";
