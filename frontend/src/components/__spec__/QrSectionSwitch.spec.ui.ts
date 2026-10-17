import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import QrSectionSwitch from "../QrSectionSwitch.vue";

describe("QrSectionSwitch", () => {
  it("emits the section that was clicked", async () => {
    const user = userEvent.setup();
    const { emitted } = render(QrSectionSwitch, {
      props: { activeSection: "basic" },
    });

    await user.click(screen.getByRole("button", { name: "Advanced" }));
    await user.click(screen.getByRole("button", { name: "Basic" }));

    expect(emitted()["update:activeSection"]).toEqual([
      ["advanced"],
      ["basic"],
    ]);
  });

  it("highlights the active section", () => {
    render(QrSectionSwitch, { props: { activeSection: "advanced" } });

    expect(screen.getByRole("button", { name: "Advanced" })).toHaveClass(
      "font-bold",
    );
    expect(screen.getByRole("button", { name: "Basic" })).not.toHaveClass(
      "font-bold",
    );
  });
});
