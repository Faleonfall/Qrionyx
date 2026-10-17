import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import type { QrScanStatus } from "../../lib/scanQr";
import QrPreview from "../QrPreview.vue";

function renderPreview(hasQr: boolean, scanStatus: QrScanStatus) {
  return render(QrPreview, {
    props: {
      backgroundColor: "#ffffff",
      backgroundRound: 0,
      backgroundTransparent: false,
      hasQr,
      previewUrl: "example.com",
      scanStatus,
      title: "https://example.com",
    },
  });
}

describe("QrPreview", () => {
  it("asks for a URL while there is no QR", () => {
    renderPreview(false, "idle");

    expect(
      screen.getByText("Enter a URL to generate a QR code."),
    ).toBeInTheDocument();
    expect(screen.queryByText("Checking")).not.toBeInTheDocument();
  });

  it("shows the scan result once a QR exists", () => {
    renderPreview(true, "scannable");

    expect(screen.getByText("✓ Scannable")).toBeInTheDocument();
    expect(
      screen.queryByText("Enter a URL to generate a QR code."),
    ).not.toBeInTheDocument();
  });

  it("shows the short URL with the full one as its title", () => {
    renderPreview(true, "checking");

    expect(screen.getByText("example.com")).toHaveAttribute(
      "title",
      "https://example.com",
    );
  });
});
