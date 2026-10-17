import { describe, expect, it } from "vitest";
import { getDownloadName } from "../qrDownload";

describe("getDownloadName", () => {
  it("trims the name and drops an image extension", () => {
    expect(getDownloadName("  logo.PNG ")).toBe("logo");
    expect(getDownloadName("card.jpeg")).toBe("card");
  });

  it("keeps other dots in the name", () => {
    expect(getDownloadName("v1.2-final")).toBe("v1.2-final");
  });

  it("falls back to the default name when empty", () => {
    expect(getDownloadName("   ")).toBe("qr");
    expect(getDownloadName(".svg")).toBe("qr");
  });
});
