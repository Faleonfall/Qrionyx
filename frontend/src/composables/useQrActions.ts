import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";
import { onBeforeUnmount } from "vue";
import { loadImageNaturalSize, readFileAsDataUrl } from "../lib/logoImage";
import type { ExportSize, GradientMode, MarginLevel } from "../lib/qrTypes";
import { clearQrSession } from "../lib/qrSession";
import type { QrState } from "./useQrState";

export function useQrActions(state: QrState, updateQr: () => void) {
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

    const imageSource = await readFileAsDataUrl(file).catch(() => "");
    const naturalSize = await loadImageNaturalSize(imageSource);

    // A file that is not an image leaves the current logo alone
    if (!naturalSize) {
      return;
    }

    state.imageNaturalSize.value = naturalSize;
    setAndUpdate(state.image, imageSource);
  }

  function resetQr() {
    state.resetState();
    clearQrSession();
    updateQr();
  }

  onBeforeUnmount(() => {
    if (imageSizeUpdateTimeout) {
      globalThis.clearTimeout(imageSizeUpdateTimeout);
    }
  });

  return {
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
