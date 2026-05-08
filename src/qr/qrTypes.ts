import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";

export type MarginLevel = "none" | "tight" | "standard" | "wide";
export type ExportSize = 512 | 1024 | 2048;
export type GradientMode = "none" | "linear" | "radial";

export type QrSettings = {
  data: string;
  qrColor: string;
  backgroundColor: string;
  backgroundTransparent: boolean;
  dotType: DotType;
  cornerType: CornerSquareType;
  errorCorrectionLevel: ErrorCorrectionLevel;
  marginLevel: MarginLevel;
  shapeType: ShapeType;
  image: string;
  imageSize: number;
  imageMargin: number;
  hideBackgroundDots: boolean;
  cornerSquareColor: string;
  cornerDotColor: string;
  dotsGradientType: GradientMode;
  dotsGradientStartColor: string;
  dotsGradientEndColor: string;
  backgroundRound: number;
};

export type SelectOption = {
  label: string;
  value: string;
};
