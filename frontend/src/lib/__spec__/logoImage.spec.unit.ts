import { afterEach, describe, expect, it, vi } from "vitest";
import { loadImageNaturalSize } from "../logoImage";

describe("loadImageNaturalSize", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns null without a logo", async () => {
    await expect(loadImageNaturalSize("")).resolves.toBeNull();
  });

  it("returns null when the image cannot be measured", async () => {
    vi.stubGlobal("document", {
      createElement: () => ({
        addEventListener: (type: string, listener: () => void) => {
          if (type === "error") {
            listener();
          }
        },
      }),
    });

    await expect(
      loadImageNaturalSize("data:text/plain,nope"),
    ).resolves.toBeNull();
  });
});
