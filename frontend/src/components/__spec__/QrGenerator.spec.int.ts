import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import QrGenerator from "../QrGenerator.vue";

const urlPlaceholder = "https://example.com";

async function typeUrl(url: string) {
  const user = userEvent.setup();
  const view = render(QrGenerator);

  await user.type(screen.getByPlaceholderText(urlPlaceholder), url);
  return { user, view };
}

describe("QrGenerator", () => {
  it("enables downloads once the URL is valid", async () => {
    render(QrGenerator);
    const png = screen.getByRole("button", { name: "PNG" });

    expect(png).toBeDisabled();

    await userEvent.type(
      screen.getByPlaceholderText(urlPlaceholder),
      "example.com",
    );

    expect(png).toBeEnabled();
    expect(
      screen.queryByText("Enter a URL to generate a QR code."),
    ).not.toBeInTheDocument();
  });

  it("restores the last QR after the page comes back", async () => {
    const { view } = await typeUrl("example.com");

    globalThis.dispatchEvent(new Event("pagehide"));
    view.unmount();
    render(QrGenerator);

    expect(await screen.findByDisplayValue("example.com")).toBeInTheDocument();
  });

  it("starts fresh after a reset", async () => {
    const { user, view } = await typeUrl("example.com");

    await user.click(screen.getByRole("button", { name: "Reset" }));
    view.unmount();
    render(QrGenerator);

    expect(screen.getByPlaceholderText(urlPlaceholder)).toHaveValue("");
  });

  it("remembers the theme picked with the toggle", async () => {
    const user = userEvent.setup();
    render(QrGenerator);

    await user.click(
      screen.getByRole("button", { name: "Switch to light theme" }),
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("qrionyx.theme")).toBe("light");
    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toBeInTheDocument();
  });
});
