import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import { loadImageNaturalSize } from "./logoImage";
import { createQrExport } from "./qrExport";
import { createQrGeneratorActions } from "./qrGeneratorActions";
import { createQrGeneratorState, type QrPreviewRef } from "./qrGeneratorState";
import { createQrPreviewRenderer } from "./qrPreviewRenderer";
import {
  loadQrSession,
  readQrSessionRefs,
  saveQrSession,
  writeQrSessionRefs,
} from "../lib/qrSession";

export function useQrGenerator() {
  const state = createQrGeneratorState(
    useTemplateRef<QrPreviewRef>("qrPreview"),
  );
  const renderer = createQrPreviewRenderer(state);
  const actions = createQrGeneratorActions(state, renderer.updateQr);
  const qrExport = createQrExport(state);
  let shouldSaveSession = true;

  function saveCurrentSession() {
    if (shouldSaveSession) {
      saveQrSession(readQrSessionRefs(state.sessionRefs));
    }
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

  function resetQr() {
    shouldSaveSession = false;
    actions.resetQr();
    globalThis.setTimeout(() => {
      shouldSaveSession = true;
    }, 0);
  }

  onMounted(async () => {
    await restoreSavedSession();
    await renderer.mountPreviewRenderer();
    globalThis.addEventListener("pagehide", saveCurrentSession);
  });

  onBeforeUnmount(() => {
    saveCurrentSession();
    globalThis.removeEventListener("pagehide", saveCurrentSession);
    renderer.cleanupPreviewRenderer();
    actions.cleanupActions();
  });

  return {
    advancedResetKey: state.advancedResetKey,
    backgroundColor: state.backgroundColor,
    backgroundRound: state.backgroundRound,
    backgroundTransparent: state.backgroundTransparent,
    canDownload: state.canDownload,
    cornerDotColor: state.cornerDotColor,
    cornerSquareColor: state.cornerSquareColor,
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
    hasLogo: state.hasLogo,
    hasQr: state.hasQr,
    hideBackgroundDots: state.hideBackgroundDots,
    imageMargin: state.imageMargin,
    imageSize: state.imageSize,
    imageSizeMaxPercent: state.imageSizeMaxPercent,
    marginLevel: state.marginLevel,
    previewUrl: state.previewUrl,
    qrColor: state.qrColor,
    qrUrl: state.qrUrl,
    renderedLogoSize: state.renderedLogoSize,
    resetQr,
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
