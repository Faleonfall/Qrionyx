import { onBeforeUnmount, onMounted } from "vue";
import { loadImageNaturalSize } from "../lib/logoImage";
import {
  loadQrSession,
  readQrSessionRefs,
  saveQrSession,
  writeQrSessionRefs,
} from "../lib/qrSession";
import { useQrActions } from "./useQrActions";
import { useQrExport } from "./useQrExport";
import { useQrPreview } from "./useQrPreview";
import { useQrState } from "./useQrState";

export function useQrGenerator() {
  const state = useQrState();
  const preview = useQrPreview(state);
  const actions = useQrActions(state, preview.updateQr);
  const qrExport = useQrExport(state);

  function saveCurrentSession() {
    saveQrSession(readQrSessionRefs(state.sessionRefs));
  }

  async function restoreSavedSession() {
    const savedSession = loadQrSession();

    if (savedSession) {
      writeQrSessionRefs(state.sessionRefs, savedSession);
    }
    state.imageNaturalSize.value = await loadImageNaturalSize(
      state.image.value,
    );
  }

  onMounted(async () => {
    await restoreSavedSession();
    await preview.mountPreviewRenderer();
    globalThis.addEventListener("pagehide", saveCurrentSession);
  });

  onBeforeUnmount(() => {
    saveCurrentSession();
    globalThis.removeEventListener("pagehide", saveCurrentSession);
  });

  return {
    advancedResetKey: state.advancedResetKey,
    backgroundColor: state.backgroundColor,
    backgroundRound: state.backgroundRound,
    backgroundTransparent: state.backgroundTransparent,
    canDownload: state.canDownload,
    cornerDotColor: state.shownCornerDotColor,
    cornerSquareColor: state.shownCornerSquareColor,
    cornerType: state.cornerType,
    dotType: state.dotType,
    dotsGradientEndColor: state.dotsGradientEndColor,
    dotsGradientStartColor: state.dotsGradientStartColor,
    dotsGradientType: state.dotsGradientType,
    downloadPng: qrExport.downloadPng,
    downloadSvg: qrExport.downloadSvg,
    downloadWebp: qrExport.downloadWebp,
    errorCorrectionLevel: state.errorCorrectionLevel,
    exportSize: state.exportSize,
    filename: state.filename,
    hasDotsGradient: state.hasDotsGradient,
    hasLogo: state.hasLogo,
    hasQr: state.hasQr,
    hideBackgroundDots: state.hideBackgroundDots,
    imageMargin: state.imageMargin,
    imageSize: state.imageSize,
    imageSizeMaxPercent: state.imageSizeMaxPercent,
    marginLevel: state.marginLevel,
    previewTitle: state.previewTitle,
    previewUrl: state.previewUrl,
    qrColor: state.qrColor,
    qrUrl: state.qrUrl,
    renderedLogoSize: state.renderedLogoSize,
    resetQr: actions.resetQr,
    scanStatus: state.scanStatus,
    shapeType: state.shapeType,
    updateBackgroundColor: actions.updateBackgroundColor,
    updateBackgroundRound: actions.updateBackgroundRound,
    updateBackgroundTransparent: actions.updateBackgroundTransparent,
    updateCornerDotColor: actions.updateCornerDotColor,
    updateCornerSquareColor: actions.updateCornerSquareColor,
    updateCornerType: actions.updateCornerType,
    updateDotType: actions.updateDotType,
    updateDotsGradientEndColor: actions.updateDotsGradientEndColor,
    updateDotsGradientStartColor: actions.updateDotsGradientStartColor,
    updateDotsGradientType: actions.updateDotsGradientType,
    updateErrorCorrectionLevel: actions.updateErrorCorrectionLevel,
    updateExportSize: actions.updateExportSize,
    updateFilename: actions.updateFilename,
    updateHideBackgroundDots: actions.updateHideBackgroundDots,
    updateImageMargin: actions.updateImageMargin,
    updateImageSize: actions.updateImageSize,
    updateLogoFile: actions.updateLogoFile,
    updateMarginLevel: actions.updateMarginLevel,
    updateQrColor: actions.updateQrColor,
    updateShapeType: actions.updateShapeType,
    updateUrl: actions.updateUrl,
  };
}
