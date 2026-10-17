import QRCodeStyling from "qr-code-styling";
import { createQrOptions } from "../lib/createQrOptions";
import { getDownloadName } from "../lib/qrDownload";
import type { QrState } from "./useQrState";

export function useQrExport(state: QrState) {
  function createDownloadQr() {
    if (!state.canDownload.value) {
      throw new Error("Enter a valid URL before downloading.");
    }

    return new QRCodeStyling(
      createQrOptions(
        state.getSettings(),
        state.exportSize.value,
        state.exportSize.value,
      ),
    );
  }

  async function downloadQr(extension: "png" | "svg" | "webp") {
    try {
      await createDownloadQr().download({
        name: getDownloadName(state.filename.value),
        extension,
      });
    } catch (error) {
      globalThis.console.error("Unable to download QR code.", error);
    }
  }

  return {
    downloadPng: () => downloadQr("png"),
    downloadSvg: () => downloadQr("svg"),
    downloadWebp: () => downloadQr("webp"),
  };
}
