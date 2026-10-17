import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";
import { loadImageNaturalSize, readFileAsDataUrl } from "./logoImage";
import type { ExportSize, GradientMode, MarginLevel } from "./qrTypes";
import type { QrGeneratorState } from "./qrGeneratorState";
import { clearQrSession } from "../lib/qrSession";

export function createQrGeneratorActions(
  state: QrGeneratorState,
  updateQr: () => void,
) {
  let imageSizeUpdateTimeout: ReturnType<typeof globalThis.setTimeout> | null =
    null;

  function setAndUpdate<T>(target: { value: T }, value: T) {
    target.value = value;
    updateQr();
  }

  function updateImageSize(value: number) {
    state.imageSize.value = value;
    if (imageSizeUpdateTimeout) {
      globalThis.clearTimeout(imageSizeUpdateTimeout);
    }
    imageSizeUpdateTimeout = globalThis.setTimeout(updateQr, 25);
  }

  async function updateLogoFile(file: File | null) {
    if (!file) {
      state.imageNaturalSize.value = null;
      setAndUpdate(state.image, "");
      return;
    }

    const imageSource = await readFileAsDataUrl(file);

    state.imageNaturalSize.value = await loadImageNaturalSize(imageSource);
    setAndUpdate(state.image, imageSource);
  }

  function resetQr() {
    state.resetState();
    clearQrSession();
    updateQr();
  }

  function cleanupActions() {
    if (imageSizeUpdateTimeout) {
      globalThis.clearTimeout(imageSizeUpdateTimeout);
    }
  }

  return {
    cleanupActions,
    resetQr,
    updateBackgroundColor: (value: string) => {
      setAndUpdate(state.backgroundColor, value);
    },
    updateBackgroundRound: (value: number) => {
      setAndUpdate(state.backgroundRound, value);
    },
    updateBackgroundTransparent: (value: boolean) => {
      setAndUpdate(state.backgroundTransparent, value);
    },
    updateCornerDotColor: (value: string) => {
      setAndUpdate(state.cornerDotColor, value);
    },
    updateCornerSquareColor: (value: string) => {
      setAndUpdate(state.cornerSquareColor, value);
    },
    updateCornerType: (value: CornerSquareType) => {
      setAndUpdate(state.cornerType, value);
    },
    updateDotType: (value: DotType) => {
      setAndUpdate(state.dotType, value);
    },
    updateDotsGradientEndColor: (value: string) => {
      setAndUpdate(state.dotsGradientEndColor, value);
    },
    updateDotsGradientStartColor: (value: string) => {
      setAndUpdate(state.dotsGradientStartColor, value);
    },
    updateDotsGradientType: (value: GradientMode) => {
      setAndUpdate(state.dotsGradientType, value);
    },
    updateErrorCorrectionLevel: (value: ErrorCorrectionLevel) => {
      setAndUpdate(state.errorCorrectionLevel, value);
    },
    updateExportSize: (value: ExportSize) => {
      state.exportSize.value = value;
    },
    updateFilename: (value: string) => {
      state.filename.value = value;
    },
    updateHideBackgroundDots: (value: boolean) => {
      setAndUpdate(state.hideBackgroundDots, value);
    },
    updateImageMargin: (value: number) => {
      setAndUpdate(state.imageMargin, value);
    },
    updateImageSize,
    updateLogoFile,
    updateMarginLevel: (value: MarginLevel) => {
      setAndUpdate(state.marginLevel, value);
    },
    updateQrColor: (value: string) => {
      setAndUpdate(state.qrColor, value);
    },
    updateShapeType: (value: ShapeType) => {
      setAndUpdate(state.shapeType, value);
    },
    updateUrl: (value: string) => {
      setAndUpdate(state.qrUrl, value);
    },
  };
}
