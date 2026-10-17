export type ImageNaturalSize = {
  height: number;
  width: number;
};

export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(typeof reader.result === "string" ? reader.result : "");
    });
    reader.addEventListener("error", () => {
      reject(
        reader.error instanceof Error
          ? reader.error
          : new Error("Unable to read logo file."),
      );
    });
    reader.readAsDataURL(file);
  });
}

function measureImage(source: string) {
  return new Promise<ImageNaturalSize>((resolve, reject) => {
    const logoImage = globalThis.document.createElement("img");

    logoImage.addEventListener("load", () => {
      resolve({
        height: logoImage.naturalHeight || logoImage.height,
        width: logoImage.naturalWidth || logoImage.width,
      });
    });
    logoImage.addEventListener("error", () => {
      reject(new Error("Unable to measure logo image."));
    });
    logoImage.src = source;
  });
}

export async function loadImageNaturalSize(source: string) {
  return source ? await measureImage(source) : null;
}
