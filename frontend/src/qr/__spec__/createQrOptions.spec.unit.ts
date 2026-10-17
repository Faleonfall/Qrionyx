import { describe, expect, it } from "vitest";
import { createQrOptions } from "../createQrOptions";
import { PREVIEW_SIZE } from "../qrDefaults";
import type { QrSettings } from "../qrTypes";

const baseSettings: QrSettings = {
  data: "https://example.com",
  qrColor: "#3b1e8f",
  backgroundColor: "#ffffff",
  backgroundTransparent: false,
  dotType: "square",
  cornerType: "rounded",
  errorCorrectionLevel: "M",
  marginLevel: "standard",
  shapeType: "square",
  image: "",
  imageSize: 0.4,
  imageMargin: 0,
  hideBackgroundDots: true,
  cornerSquareColor: "",
  cornerDotColor: "",
  dotsGradientType: "none",
  dotsGradientStartColor: "#3b1e8f",
  dotsGradientEndColor: "#8be9ff",
  backgroundRound: 0,
};

function settings(overrides: Partial<QrSettings> = {}): QrSettings {
  return { ...baseSettings, ...overrides };
}

describe("createQrOptions", () => {
  it("uses the preview size and canvas by default", () => {
    const options = createQrOptions(settings());

    expect(options.width).toBe(PREVIEW_SIZE);
    expect(options.height).toBe(PREVIEW_SIZE);
    expect(options.type).toBe("canvas");
    expect(options.data).toBe("https://example.com");
  });

  it("scales the margin with the width", () => {
    expect(createQrOptions(settings(), 1000, 1000).margin).toBe(70);
    expect(
      createQrOptions(settings({ marginLevel: "none" }), 1000, 1000).margin,
    ).toBe(0);
    expect(
      createQrOptions(settings({ marginLevel: "wide" }), 1000, 1000).margin,
    ).toBe(120);
  });

  it("leaves corner colors out when empty or equal to the QR color", () => {
    const options = createQrOptions(
      settings({ cornerSquareColor: "", cornerDotColor: "#3b1e8f" }),
    );

    expect(options.cornersSquareOptions).not.toHaveProperty("color");
    expect(options.cornersDotOptions).not.toHaveProperty("color");
  });

  it("sets corner colors that differ from the QR color", () => {
    const options = createQrOptions(
      settings({ cornerSquareColor: "#ff0000", cornerDotColor: "#00ff00" }),
    );

    expect(options.cornersSquareOptions?.color).toBe("#ff0000");
    expect(options.cornersDotOptions?.color).toBe("#00ff00");
  });

  it("adds a gradient only when one is picked", () => {
    expect(createQrOptions(settings()).dotsOptions).not.toHaveProperty(
      "gradient",
    );
    expect(
      createQrOptions(settings({ dotsGradientType: "radial" })).dotsOptions
        ?.gradient,
    ).toEqual({
      type: "radial",
      colorStops: [
        { offset: 0, color: "#3b1e8f" },
        { offset: 1, color: "#8be9ff" },
      ],
    });
  });

  it("adds the image only when a logo is set", () => {
    expect(createQrOptions(settings())).not.toHaveProperty("image");
    expect(
      createQrOptions(settings({ image: "data:image/png;base64,AA" })).image,
    ).toBe("data:image/png;base64,AA");
  });

  it("scales the logo size by the error correction level", () => {
    expect(createQrOptions(settings()).imageOptions?.imageSize).toBeCloseTo(
      (0.4 * 0.4) / 0.15,
    );
    expect(
      createQrOptions(settings({ errorCorrectionLevel: "H" })).imageOptions
        ?.imageSize,
    ).toBeCloseTo((0.4 * 0.4) / 0.3);
  });

  it("makes the background transparent when asked", () => {
    expect(
      createQrOptions(settings({ backgroundTransparent: true }))
        .backgroundOptions?.color,
    ).toBe("transparent");
  });

  it("rounds dot sizes only for the circle shape", () => {
    expect(createQrOptions(settings()).dotsOptions?.roundSize).toBe(false);
    expect(
      createQrOptions(settings({ shapeType: "circle" })).dotsOptions?.roundSize,
    ).toBe(true);
  });
});
