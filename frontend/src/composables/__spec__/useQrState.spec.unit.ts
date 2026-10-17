import { describe, expect, it } from "vitest";
import { DEFAULT_FILENAME, DEFAULT_QR_COLOR } from "../../lib/qrDefaults";
import { PREVIEW_URL_PLACEHOLDER } from "../../lib/qrUrl";
import { useQrState } from "../useQrState";

describe("useQrState", () => {
  it("starts empty with the defaults", () => {
    const state = useQrState();

    expect(state.hasQr.value).toBe(false);
    expect(state.canDownload.value).toBe(false);
    expect(state.qrColor.value).toBe(DEFAULT_QR_COLOR);
    expect(state.previewTitle.value).toBe(PREVIEW_URL_PLACEHOLDER);
  });

  it("allows downloads only for a valid URL", () => {
    const state = useQrState();

    state.qrUrl.value = "not a url";
    expect(state.hasQr.value).toBe(true);
    expect(state.canDownload.value).toBe(false);

    state.qrUrl.value = "example.com";
    expect(state.canDownload.value).toBe(true);
    expect(state.previewTitle.value).toBe("example.com");
  });

  it("lets empty corner colors follow the QR color", () => {
    const state = useQrState();

    state.qrColor.value = "#112233";
    expect(state.shownCornerDotColor.value).toBe("#112233");
    expect(state.shownCornerSquareColor.value).toBe("#112233");

    state.cornerDotColor.value = "#ff0000";
    expect(state.shownCornerDotColor.value).toBe("#ff0000");
  });

  it("knows when the dots use a gradient", () => {
    const state = useQrState();

    expect(state.hasDotsGradient.value).toBe(false);
    state.dotsGradientType.value = "linear";
    expect(state.hasDotsGradient.value).toBe(true);
  });

  it("caps the logo size only once a logo and a QR exist", () => {
    const state = useQrState();

    state.qrModuleCount.value = 25;
    state.imageNaturalSize.value = { height: 100, width: 100 };
    expect(state.imageSizeMaxPercent.value).toBe(100);

    state.image.value = "data:image/png;base64,AA";
    expect(state.imageSizeMaxPercent.value).toBeLessThanOrEqual(100);
    expect(state.imageSizeMaxPercent.value).toBeGreaterThanOrEqual(20);
  });

  it("hands the QR library the current settings", () => {
    const state = useQrState();

    state.qrUrl.value = "example.com";
    expect(state.getSettings().data).toBe("example.com");
  });

  it("resets every setting and remounts the advanced controls", () => {
    const state = useQrState();

    state.qrUrl.value = "example.com";
    state.filename.value = "mine";
    state.image.value = "data:image/png;base64,AA";
    state.resetState();

    expect(state.qrUrl.value).toBe("");
    expect(state.filename.value).toBe(DEFAULT_FILENAME);
    expect(state.image.value).toBe("");
    expect(state.advancedResetKey.value).toBe(1);
  });
});
