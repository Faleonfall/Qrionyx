import type {
  DrawType,
  ErrorCorrectionLevel,
  Gradient,
  Options,
} from "qr-code-styling";
import { PREVIEW_SIZE } from "./qrDefaults";
import type { MarginLevel, QrSettings } from "./qrTypes";

const errorCorrectionLogoRatios: Record<ErrorCorrectionLevel, number> = {
  L: 0.07,
  M: 0.15,
  Q: 0.25,
  H: 0.3,
};

function getMarginSize(level: MarginLevel, width: number) {
  const marginRatios: Record<MarginLevel, number> = {
    none: 0,
    tight: 0.04,
    standard: 0.07,
    wide: 0.12,
  };

  return Math.round(width * marginRatios[level]);
}

function getDotsGradient(settings: QrSettings): Gradient | undefined {
  if (settings.dotsGradientType === "none") {
    return undefined;
  }

  return {
    type: settings.dotsGradientType,
    colorStops: [
      { offset: 0, color: settings.dotsGradientStartColor },
      { offset: 1, color: settings.dotsGradientEndColor },
    ],
  };
}

function getCornerColor(color: string, fallbackColor: string) {
  return !color || color === fallbackColor ? undefined : color;
}

function getLibraryImageSize(settings: QrSettings) {
  return (
    (settings.imageSize * settings.imageSize) /
    errorCorrectionLogoRatios[settings.errorCorrectionLevel]
  );
}

export function createQrOptions(
  settings: QrSettings,
  width = PREVIEW_SIZE,
  height = PREVIEW_SIZE,
  type: DrawType = "canvas",
): Options {
  const cornerSquareColor = getCornerColor(
    settings.cornerSquareColor,
    settings.qrColor,
  );
  const cornerDotColor = getCornerColor(
    settings.cornerDotColor,
    settings.qrColor,
  );
  const dotsGradient = getDotsGradient(settings);

  return {
    type,
    shape: settings.shapeType,
    width,
    height,
    margin: getMarginSize(settings.marginLevel, width),
    data: settings.data,
    // Always set, update() merges options and would keep a cleared logo
    image: settings.image,
    qrOptions: {
      errorCorrectionLevel: settings.errorCorrectionLevel,
      typeNumber: 0,
    },
    imageOptions: {
      hideBackgroundDots: settings.hideBackgroundDots,
      imageSize: getLibraryImageSize(settings),
      margin: settings.imageMargin,
    },
    cornersSquareOptions: {
      type: settings.cornerType,
      ...(cornerSquareColor ? { color: cornerSquareColor } : {}),
    },
    cornersDotOptions: {
      type: settings.cornerType,
      ...(cornerDotColor ? { color: cornerDotColor } : {}),
    },
    dotsOptions: {
      color: settings.qrColor,
      roundSize: settings.shapeType === "circle",
      type: settings.dotType,
      ...(dotsGradient ? { gradient: dotsGradient } : {}),
    },
    backgroundOptions: {
      color: settings.backgroundTransparent
        ? "transparent"
        : settings.backgroundColor,
      round: settings.backgroundRound,
    },
  };
}
