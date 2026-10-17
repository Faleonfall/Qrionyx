export function getLogoSizeLabel(width: number, height: number) {
  const roundedWidth = Math.round(width);
  const roundedHeight = Math.round(height);

  if (roundedWidth <= 0 || roundedHeight <= 0) {
    return "";
  }

  return Math.abs(roundedWidth - roundedHeight) <= 1
    ? `${String(roundedWidth)} px`
    : `${String(roundedWidth)} x ${String(roundedHeight)} px`;
}

export function getRenderedLogoSize(container: HTMLElement | null) {
  const svg = container?.querySelector("svg");
  const logo = svg?.querySelector("image");

  if (!(svg instanceof SVGSVGElement) || !(logo instanceof Element)) {
    return "";
  }

  const svgWidth =
    svg.viewBox.baseVal.width || Number(svg.getAttribute("width"));
  const displayScale = svg.getBoundingClientRect().width / svgWidth;
  const logoWidth = Number.parseFloat(logo.getAttribute("width") || "0");
  const logoHeight = Number.parseFloat(logo.getAttribute("height") || "0");

  return getLogoSizeLabel(logoWidth * displayScale, logoHeight * displayScale);
}
