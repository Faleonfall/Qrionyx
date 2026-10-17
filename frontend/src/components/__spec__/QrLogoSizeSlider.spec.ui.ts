import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import QrLogoSizeSlider from "../QrLogoSizeSlider.vue";

function renderSlider(imageSize: number, imageSizeMaxPercent = 100) {
  return render(QrLogoSizeSlider, {
    props: {
      hasLogo: true,
      imageSize,
      imageSizeMaxPercent,
      renderedLogoSize: "80 px",
    },
  });
}

describe("QrLogoSizeSlider", () => {
  it("shows the current size", () => {
    renderSlider(0.4);

    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "40");
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("steps by five with the arrow keys", async () => {
    const { emitted } = renderSlider(0.4);
    const slider = screen.getByRole("slider");

    await fireEvent.keyDown(slider, { key: "ArrowRight" });
    await fireEvent.keyDown(slider, { key: "ArrowDown" });

    expect(emitted()["update:imageSize"]).toEqual([[0.45], [0.35]]);
  });

  it("stays put at the max", async () => {
    const { emitted } = renderSlider(0.6, 60);

    await fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowUp" });

    expect(emitted()["update:imageSize"]).toBeUndefined();
  });
});
