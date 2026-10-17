import QRCodeStyling from "qr-code-styling";
import { nextTick } from "vue";
import { createQrOptions } from "./createQrOptions";
import { getRenderedLogoSize } from "./renderedLogoSize";
import { scanQrPreview, type QrScanStatus } from "./scanQr";
import type { QrGeneratorState } from "./qrGeneratorState";

type QrWithModuleCount = QRCodeStyling & {
  _qr?: {
    getModuleCount: () => number;
  };
};

export function createQrPreviewRenderer(state: QrGeneratorState) {
  let qr: QRCodeStyling | null = null;
  let previewResizeObserver: ResizeObserver | null = null;
  let previewMutationObserver: MutationObserver | null = null;
  let scanTimeout: ReturnType<typeof globalThis.setTimeout> | null = null;
  let scanRequestId = 0;

  function getQrContainer() {
    return state.qrPreview.value?.container || null;
  }

  function clearScanStatus(status: QrScanStatus = "idle") {
    if (scanTimeout) {
      globalThis.clearTimeout(scanTimeout);
    }
    scanRequestId += 1;
    state.scanStatus.value = status;
  }

  async function runScanCheck(requestId: number) {
    const svg = getQrContainer()?.querySelector("svg");

    if (!(svg instanceof SVGSVGElement)) {
      state.scanStatus.value = "unscannable";
      return;
    }

    const status = await scanQrPreview(svg, state.qrUrl.value);
    if (requestId === scanRequestId) {
      state.scanStatus.value = status;
    }
  }

  function scheduleScanCheck() {
    if (!state.hasQr.value) {
      clearScanStatus();
      return;
    }

    const requestId = (scanRequestId += 1);
    state.scanStatus.value = "checking";
    if (scanTimeout) {
      globalThis.clearTimeout(scanTimeout);
    }
    scanTimeout = globalThis.setTimeout(() => {
      void runScanCheck(requestId);
    }, 180);
  }

  function createPreviewQrOptions() {
    return createQrOptions(state.getSettings(), undefined, undefined, "svg");
  }

  function updateQr() {
    const container = getQrContainer();

    if (!state.hasQr.value) {
      container?.replaceChildren();
      qr = null;
      state.renderedLogoSize.value = "";
      clearScanStatus();
      return;
    }

    try {
      if (!qr) {
        qr = new QRCodeStyling(createPreviewQrOptions());
        qr.append(container || undefined);
        globalThis.requestAnimationFrame(updatePreviewState);
        return;
      }

      qr.update(createPreviewQrOptions());
      globalThis.requestAnimationFrame(updatePreviewState);
    } catch {
      container?.replaceChildren();
      qr = null;
      state.renderedLogoSize.value = "";
      clearScanStatus();
    }
  }

  function updatePreviewState() {
    const qrWithModuleCount: QrWithModuleCount | null = qr;
    const maxSize = state.imageSizeMaxPercent.value / 100;

    state.qrModuleCount.value = qrWithModuleCount?._qr?.getModuleCount() || 0;
    if (state.imageSize.value > maxSize) {
      state.imageSize.value = maxSize;
    }
    state.renderedLogoSize.value = getRenderedLogoSize(getQrContainer());
    scheduleScanCheck();
  }

  async function mountPreviewRenderer() {
    await nextTick();
    updatePreviewState();

    const container = getQrContainer();
    if (container) {
      previewResizeObserver = new ResizeObserver(updatePreviewState);
      previewResizeObserver.observe(container);
      previewMutationObserver = new MutationObserver(updatePreviewState);
      previewMutationObserver.observe(container, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    updateQr();
  }

  function cleanupPreviewRenderer() {
    clearScanStatus();
    previewResizeObserver?.disconnect();
    previewMutationObserver?.disconnect();
  }

  return {
    cleanupPreviewRenderer,
    mountPreviewRenderer,
    updateQr,
  };
}
