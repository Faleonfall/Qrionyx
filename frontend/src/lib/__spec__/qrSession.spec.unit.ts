import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import {
  clearQrSession,
  loadQrSession,
  readQrSessionRefs,
  saveQrSession,
  writeQrSessionRefs,
  type SavedQrSession,
  type SavedQrSessionRefs,
} from "../qrSession";
import { stubFailingLocalStorage, stubLocalStorage } from "./storageHelpers";

const sessionKey = "qrionyx.session";
const fifteenMinutes = 15 * 60 * 1000;

const session: SavedQrSession = {
  backgroundColor: "#ffffff",
  backgroundRound: 0.25,
  backgroundTransparent: false,
  cornerDotColor: "#111111",
  cornerSquareColor: "#222222",
  cornerType: "rounded",
  dotType: "dots",
  dotsGradientEndColor: "#8be9ff",
  dotsGradientStartColor: "#3b1e8f",
  dotsGradientType: "linear",
  errorCorrectionLevel: "Q",
  exportSize: 2048,
  filename: "logo-qr",
  hideBackgroundDots: true,
  image: "",
  imageMargin: 4,
  imageSize: 0.4,
  marginLevel: "wide",
  qrColor: "#3b1e8f",
  qrUrl: "https://example.com",
  shapeType: "circle",
};

function createRefs(): SavedQrSessionRefs {
  return {
    backgroundColor: ref(""),
    backgroundRound: ref(0),
    backgroundTransparent: ref(true),
    cornerDotColor: ref(""),
    cornerSquareColor: ref(""),
    cornerType: ref("square"),
    dotType: ref("square"),
    dotsGradientEndColor: ref(""),
    dotsGradientStartColor: ref(""),
    dotsGradientType: ref("none"),
    errorCorrectionLevel: ref("L"),
    exportSize: ref(512),
    filename: ref(""),
    hideBackgroundDots: ref(false),
    image: ref("data:image/png;base64,"),
    imageMargin: ref(0),
    imageSize: ref(0.2),
    marginLevel: ref("none"),
    qrColor: ref(""),
    qrUrl: ref(""),
    shapeType: ref("square"),
  };
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-17T12:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("saveQrSession and loadQrSession", () => {
  it("restores saved settings", () => {
    stubLocalStorage();
    saveQrSession(session);
    expect(loadQrSession()).toEqual(session);
  });

  it("returns null when nothing is saved", () => {
    stubLocalStorage();
    expect(loadQrSession()).toBeNull();
  });

  it("drops a session older than fifteen minutes", () => {
    const { items } = stubLocalStorage();
    saveQrSession(session);

    vi.advanceTimersByTime(fifteenMinutes);

    expect(loadQrSession()).toBeNull();
    expect(items.has(sessionKey)).toBe(false);
  });

  it("drops a payload with missing settings", () => {
    const { items } = stubLocalStorage({
      [sessionKey]: JSON.stringify({
        expiresAt: Date.now() + fifteenMinutes,
        settings: { qrUrl: "https://example.com" },
      }),
    });

    expect(loadQrSession()).toBeNull();
    expect(items.has(sessionKey)).toBe(false);
  });

  it("returns null for malformed JSON", () => {
    stubLocalStorage({ [sessionKey]: "{" });
    expect(loadQrSession()).toBeNull();
  });

  it("ignores unavailable storage", () => {
    stubFailingLocalStorage();
    expect(() => {
      saveQrSession(session);
    }).not.toThrow();
    expect(loadQrSession()).toBeNull();
  });
});

describe("clearQrSession", () => {
  it("removes the saved session", () => {
    const { items } = stubLocalStorage();
    saveQrSession(session);
    clearQrSession();
    expect(items.has(sessionKey)).toBe(false);
  });
});

describe("readQrSessionRefs and writeQrSessionRefs", () => {
  it("copies every setting into the refs and back", () => {
    const refs = createRefs();
    writeQrSessionRefs(refs, session);
    expect(readQrSessionRefs(refs)).toEqual(session);
  });
});
