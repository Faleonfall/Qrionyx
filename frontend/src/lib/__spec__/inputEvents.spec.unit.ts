import { describe, expect, it } from "vitest";
import {
  readInputChecked,
  readInputFile,
  readInputValue,
} from "../inputEvents";

function fakeEvent(target: object | null) {
  return { target } as unknown as Event;
}

describe("readInputValue", () => {
  it("returns the trimmed value", () => {
    expect(readInputValue(fakeEvent({ value: "  #ffffff " }))).toBe("#ffffff");
  });

  it("returns an empty string without a value", () => {
    expect(readInputValue(fakeEvent(null))).toBe("");
    expect(readInputValue(fakeEvent({}))).toBe("");
  });
});

describe("readInputChecked", () => {
  it("returns the checked state", () => {
    expect(readInputChecked(fakeEvent({ checked: true }))).toBe(true);
    expect(readInputChecked(fakeEvent({ checked: false }))).toBe(false);
  });

  it("returns false without a checkbox", () => {
    expect(readInputChecked(fakeEvent(null))).toBe(false);
  });
});

describe("readInputFile", () => {
  it("returns the first file", () => {
    const file = { name: "logo.png" };
    expect(readInputFile(fakeEvent({ files: [file] }))).toBe(file);
  });

  it("empties the input so the same file can be picked again", () => {
    const target = { files: [{ name: "logo.png" }], value: "C:\\logo.png" };

    readInputFile(fakeEvent(target));

    expect(target.value).toBe("");
  });

  it("returns null without files", () => {
    expect(readInputFile(fakeEvent({ files: [] }))).toBeNull();
    expect(readInputFile(fakeEvent({ files: null }))).toBeNull();
    expect(readInputFile(fakeEvent(null))).toBeNull();
  });
});
