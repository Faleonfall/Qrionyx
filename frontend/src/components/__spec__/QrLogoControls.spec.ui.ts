import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import QrLogoControls from "../QrLogoControls.vue";

function renderControls(hasLogo: boolean, hideBackgroundDots = true) {
  return render(QrLogoControls, {
    props: {
      hasLogo,
      hideBackgroundDots,
      imageMargin: 0,
      imageSize: 0.4,
      imageSizeMaxPercent: 100,
      renderedLogoSize: "80 px",
    },
  });
}

describe("QrLogoControls", () => {
  it("emits the picked logo file", async () => {
    const user = userEvent.setup();
    const { emitted } = renderControls(false);
    const file = new File(["logo"], "logo.png", { type: "image/png" });

    await user.upload(screen.getByLabelText("Choose"), file);

    expect(emitted()["update:logoFile"]).toEqual([[file]]);
  });

  it("clears the logo only when one is set", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = renderControls(false);
    const clear = screen.getByRole("button", { name: "Clear logo" });

    expect(clear).toBeDisabled();

    await rerender({ hasLogo: true });
    await user.click(clear);

    expect(emitted()["update:logoFile"]).toEqual([[null]]);
  });

  it("names the logo dots setting and flips it on click", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = renderControls(true, true);

    await user.click(screen.getByText("Hide"));
    expect(emitted()["update:hideBackgroundDots"]).toEqual([[false]]);

    await rerender({ hideBackgroundDots: false });
    expect(screen.getByText("Show")).toBeInTheDocument();
  });
});
