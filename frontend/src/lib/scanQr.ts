import jsQR from "jsqr";

export type QrScanStatus = "idle" | "checking" | "scannable" | "unscannable";

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", () => {
      reject(new Error("Unable to load QR preview for scan check."));
    });
    image.src = url;
  });
}

function getSvgSize(svg: SVGSVGElement) {
  const viewBox = svg.viewBox.baseVal;
  const width = Math.round(viewBox.width || Number(svg.getAttribute("width")));
  const height = Math.round(
    viewBox.height || Number(svg.getAttribute("height")),
  );

  return { width, height };
}

export async function scanQrPreview(
  svg: SVGSVGElement,
  expectedData: string,
): Promise<QrScanStatus> {
  const { width, height } = getSvgSize(svg);

  if (width <= 0 || height <= 0) {
    return "unscannable";
  }

  const svgUrl = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(svg)], {
      type: "image/svg+xml",
    }),
  );

  try {
    const image = await loadImage(svgUrl);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      return "unscannable";
    }

    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    return jsQR(imageData.data, width, height)?.data === expectedData
      ? "scannable"
      : "unscannable";
  } catch {
    return "unscannable";
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}
