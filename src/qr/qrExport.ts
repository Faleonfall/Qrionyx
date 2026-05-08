import QRCodeStyling from "qr-code-styling";
import { createQrOptions } from "./createQrOptions";
import { DEFAULT_FILENAME } from "./qrDefaults";
import type { QrGeneratorState } from "./qrGeneratorState";

export function createQrExport(state: QrGeneratorState) {
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

  function getDownloadName() {
    return (
      state.filename.value.trim().replace(/\.(png|webp|svg|jpe?g)$/i, "") ||
      DEFAULT_FILENAME
    );
  }

  async function downloadQr(extension: "png" | "svg" | "webp") {
    try {
      await createDownloadQr().download({
        name: getDownloadName(),
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
