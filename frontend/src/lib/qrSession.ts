import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";
import type { Ref } from "vue";
import type { ExportSize, GradientMode, MarginLevel } from "../qr/qrTypes";

const sessionStorageKey = "qrionyx.session";
const sessionTtlMs = 15 * 60 * 1000;

export type SavedQrSession = {
  backgroundColor: string;
  backgroundRound: number;
  backgroundTransparent: boolean;
  cornerDotColor: string;
  cornerSquareColor: string;
  cornerType: CornerSquareType;
  dotType: DotType;
  dotsGradientEndColor: string;
  dotsGradientStartColor: string;
  dotsGradientType: GradientMode;
  errorCorrectionLevel: ErrorCorrectionLevel;
  exportSize: ExportSize;
  filename: string;
  hideBackgroundDots: boolean;
  image: string;
  imageMargin: number;
  imageSize: number;
  marginLevel: MarginLevel;
  qrColor: string;
  qrUrl: string;
  shapeType: ShapeType;
};

export type SavedQrSessionRefs = {
  [Key in keyof SavedQrSession]: Ref<SavedQrSession[Key]>;
};

type SavedQrSessionPayload = {
  expiresAt: number;
  settings: SavedQrSession;
};

function isSavedQrSession(value: unknown): value is SavedQrSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<SavedQrSession>;

  return (
    typeof session.backgroundColor === "string" &&
    typeof session.backgroundRound === "number" &&
    typeof session.backgroundTransparent === "boolean" &&
    typeof session.cornerDotColor === "string" &&
    typeof session.cornerSquareColor === "string" &&
    typeof session.cornerType === "string" &&
    typeof session.dotType === "string" &&
    typeof session.dotsGradientEndColor === "string" &&
    typeof session.dotsGradientStartColor === "string" &&
    typeof session.dotsGradientType === "string" &&
    typeof session.errorCorrectionLevel === "string" &&
    typeof session.exportSize === "number" &&
    typeof session.filename === "string" &&
    typeof session.hideBackgroundDots === "boolean" &&
    typeof session.image === "string" &&
    typeof session.imageMargin === "number" &&
    typeof session.imageSize === "number" &&
    typeof session.marginLevel === "string" &&
    typeof session.qrColor === "string" &&
    typeof session.qrUrl === "string" &&
    typeof session.shapeType === "string"
  );
}

function isSavedQrSessionPayload(
  value: unknown,
): value is SavedQrSessionPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<SavedQrSessionPayload>;

  return (
    typeof payload.expiresAt === "number" && isSavedQrSession(payload.settings)
  );
}

export function loadQrSession() {
  try {
    const rawSession = globalThis.localStorage.getItem(sessionStorageKey);

    if (!rawSession) {
      return null;
    }

    const payload: unknown = JSON.parse(rawSession);

    if (!isSavedQrSessionPayload(payload) || payload.expiresAt <= Date.now()) {
      globalThis.localStorage.removeItem(sessionStorageKey);
      return null;
    }

    return payload.settings;
  } catch {
    return null;
  }
}

export function readQrSessionRefs(refs: SavedQrSessionRefs): SavedQrSession {
  return {
    backgroundColor: refs.backgroundColor.value,
    backgroundRound: refs.backgroundRound.value,
    backgroundTransparent: refs.backgroundTransparent.value,
    cornerDotColor: refs.cornerDotColor.value,
    cornerSquareColor: refs.cornerSquareColor.value,
    cornerType: refs.cornerType.value,
    dotType: refs.dotType.value,
    dotsGradientEndColor: refs.dotsGradientEndColor.value,
    dotsGradientStartColor: refs.dotsGradientStartColor.value,
    dotsGradientType: refs.dotsGradientType.value,
    errorCorrectionLevel: refs.errorCorrectionLevel.value,
    exportSize: refs.exportSize.value,
    filename: refs.filename.value,
    hideBackgroundDots: refs.hideBackgroundDots.value,
    image: refs.image.value,
    imageMargin: refs.imageMargin.value,
    imageSize: refs.imageSize.value,
    marginLevel: refs.marginLevel.value,
    qrColor: refs.qrColor.value,
    qrUrl: refs.qrUrl.value,
    shapeType: refs.shapeType.value,
  };
}

export function writeQrSessionRefs(
  refs: SavedQrSessionRefs,
  session: SavedQrSession,
) {
  refs.backgroundColor.value = session.backgroundColor;
  refs.backgroundRound.value = session.backgroundRound;
  refs.backgroundTransparent.value = session.backgroundTransparent;
  refs.cornerDotColor.value = session.cornerDotColor;
  refs.cornerSquareColor.value = session.cornerSquareColor;
  refs.cornerType.value = session.cornerType;
  refs.dotType.value = session.dotType;
  refs.dotsGradientEndColor.value = session.dotsGradientEndColor;
  refs.dotsGradientStartColor.value = session.dotsGradientStartColor;
  refs.dotsGradientType.value = session.dotsGradientType;
  refs.errorCorrectionLevel.value = session.errorCorrectionLevel;
  refs.exportSize.value = session.exportSize;
  refs.filename.value = session.filename;
  refs.hideBackgroundDots.value = session.hideBackgroundDots;
  refs.image.value = session.image;
  refs.imageMargin.value = session.imageMargin;
  refs.imageSize.value = session.imageSize;
  refs.marginLevel.value = session.marginLevel;
  refs.qrColor.value = session.qrColor;
  refs.qrUrl.value = session.qrUrl;
  refs.shapeType.value = session.shapeType;
}

export function saveQrSession(settings: SavedQrSession) {
  try {
    const payload: SavedQrSessionPayload = {
      expiresAt: Date.now() + sessionTtlMs,
      settings,
    };

    globalThis.localStorage.setItem(sessionStorageKey, JSON.stringify(payload));
  } catch {
    return;
  }
}

export function clearQrSession() {
  try {
    globalThis.localStorage.removeItem(sessionStorageKey);
  } catch {
    return;
  }
}
