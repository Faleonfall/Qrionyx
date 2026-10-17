import { describe, expect, it } from "vitest";
import { formatPreviewUrl, isValidQrUrl } from "../url";

describe("isValidQrUrl", () => {
  it("accepts a domain with or without a scheme", () => {
    expect(isValidQrUrl("example.com")).toBe(true);
    expect(isValidQrUrl("https://example.com/path")).toBe(true);
    expect(isValidQrUrl("  http://example.com  ")).toBe(true);
  });

  it("accepts localhost", () => {
    expect(isValidQrUrl("http://localhost:3000")).toBe(true);
  });

  it("rejects empty input and hosts without a domain", () => {
    expect(isValidQrUrl("")).toBe(false);
    expect(isValidQrUrl("   ")).toBe(false);
    expect(isValidQrUrl("example")).toBe(false);
  });

  it("rejects schemes other than http and https", () => {
    expect(isValidQrUrl("ftp://example.com")).toBe(false);
  });
});

describe("formatPreviewUrl", () => {
  it("strips the scheme and www", () => {
    expect(formatPreviewUrl("https://www.example.com/a")).toBe("example.com/a");
    expect(formatPreviewUrl("www.example.com")).toBe("example.com");
  });

  it("shows a placeholder for an empty url", () => {
    expect(formatPreviewUrl("")).toBe("Waiting for a URL...");
  });
});
