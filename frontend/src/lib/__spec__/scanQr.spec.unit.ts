import { describe, expect, it } from "vitest";
import { scanQrPreview } from "../scanQr";

function fakeSvg(width: number, height: number) {
  return {
    viewBox: { baseVal: { width, height } },
    getAttribute: () => null,
  } as unknown as SVGSVGElement;
}

describe("scanQrPreview", () => {
  it("fails an empty preview without drawing it", async () => {
    await expect(
      scanQrPreview(fakeSvg(0, 0), "https://example.com"),
    ).resolves.toBe("unscannable");
  });
});
