import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import FormSelect from "../FormSelect.vue";

const options = [
  { label: "Low", value: "L" },
  { label: "High", value: "H" },
];

describe("FormSelect", () => {
  it("shows its label and the selected option", () => {
    render(FormSelect, {
      props: { label: "Correction", modelValue: "H", options },
    });

    expect(screen.getByText("Correction")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("H");
  });

  it("emits the picked value", async () => {
    const user = userEvent.setup();
    const { emitted } = render(FormSelect, {
      props: { label: "Correction", modelValue: "H", options },
    });

    await user.selectOptions(screen.getByRole("combobox"), "Low");

    expect(emitted()["update:modelValue"]).toEqual([["L"]]);
  });

  it("locks the select when disabled", () => {
    render(FormSelect, {
      props: { disabled: true, label: "Pad", modelValue: "L", options },
    });

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
