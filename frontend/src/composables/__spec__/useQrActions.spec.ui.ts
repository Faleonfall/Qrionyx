import { render } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h } from "vue";
import { useQrActions } from "../useQrActions";
import { useQrState } from "../useQrState";

function mountActions() {
  const updateQr = vi.fn();
  let state = {} as ReturnType<typeof useQrState>;
  let actions = {} as ReturnType<typeof useQrActions>;

  const view = render({
    setup() {
      state = useQrState();
      actions = useQrActions(state, updateQr);
      return () => h("div");
    },
  });

  return { actions, state, unmount: view.unmount, updateQr };
}

describe("useQrActions", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("redraws after a setting that changes the QR", () => {
    const { actions, state, updateQr } = mountActions();

    actions.updateQrColor("#112233");

    expect(state.qrColor.value).toBe("#112233");
    expect(updateQr).toHaveBeenCalledTimes(1);
  });

  it("skips the redraw for export only settings", () => {
    const { actions, state, updateQr } = mountActions();

    actions.updateFilename("mine");
    actions.updateExportSize(2048);

    expect(state.filename.value).toBe("mine");
    expect(state.exportSize.value).toBe(2048);
    expect(updateQr).not.toHaveBeenCalled();
  });

  it("redraws once after a burst of logo size changes", () => {
    vi.useFakeTimers();
    const { actions, state, updateQr } = mountActions();

    actions.updateImageSize(0.3);
    actions.updateImageSize(0.35);
    actions.updateImageSize(0.4);
    vi.advanceTimersByTime(25);

    expect(state.imageSize.value).toBe(0.4);
    expect(updateQr).toHaveBeenCalledTimes(1);
  });

  it("drops a pending redraw on unmount", () => {
    vi.useFakeTimers();
    const { actions, unmount, updateQr } = mountActions();

    actions.updateImageSize(0.3);
    unmount();
    vi.advanceTimersByTime(25);

    expect(updateQr).not.toHaveBeenCalled();
  });

  it("clears the logo", async () => {
    const { actions, state } = mountActions();

    state.image.value = "data:image/png;base64,AA";
    state.imageNaturalSize.value = { height: 10, width: 10 };
    await actions.updateLogoFile(null);

    expect(state.image.value).toBe("");
    expect(state.imageNaturalSize.value).toBeNull();
  });

  it("resets the settings and forgets the saved session", () => {
    const { actions, state, updateQr } = mountActions();

    localStorage.setItem("qrionyx.session", "{}");
    state.qrUrl.value = "example.com";
    actions.resetQr();

    expect(state.qrUrl.value).toBe("");
    expect(localStorage.getItem("qrionyx.session")).toBeNull();
    expect(updateQr).toHaveBeenCalledTimes(1);
  });
});
