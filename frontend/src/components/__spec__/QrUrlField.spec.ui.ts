import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import QrUrlField from "../QrUrlField.vue";

describe("QrUrlField", () => {
  it("emits the trimmed URL as it is typed", async () => {
    const { emitted } = render(QrUrlField, { props: { url: "" } });

    await fireEvent.update(
      screen.getByPlaceholderText("https://example.com"),
      "  example.com ",
    );

    expect(emitted()["update:url"]).toEqual([["example.com"]]);
  });
});
