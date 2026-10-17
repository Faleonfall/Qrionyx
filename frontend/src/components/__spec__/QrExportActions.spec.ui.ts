import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import QrExportActions from "../QrExportActions.vue";

describe("QrExportActions", () => {
  it("disables downloads until a QR can be downloaded", () => {
    render(QrExportActions, { props: { canDownload: false } });

    for (const name of ["PNG", "WEBP", "SVG"]) {
      expect(screen.getByRole("button", { name })).toBeDisabled();
    }
    expect(screen.getByRole("button", { name: "Reset" })).toBeEnabled();
  });

  it("emits one event per button", async () => {
    const user = userEvent.setup();
    const { emitted } = render(QrExportActions, {
      props: { canDownload: true },
    });

    await user.click(screen.getByRole("button", { name: "PNG" }));
    await user.click(screen.getByRole("button", { name: "WEBP" }));
    await user.click(screen.getByRole("button", { name: "SVG" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(Object.keys(emitted())).toEqual(
      expect.arrayContaining([
        "download-png",
        "download-webp",
        "download-svg",
        "reset",
      ]),
    );
  });
});
