export const PREVIEW_URL_PLACEHOLDER = "Waiting for a URL...";

export function isValidQrUrl(value: string) {
  return parseQrUrl(value) !== null;
}

export function formatPreviewUrl(url: string) {
  return (
    url.replace(/^https?:\/\/(www\.)?|^www\./i, "") || PREVIEW_URL_PLACEHOLDER
  );
}

function parseQrUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  try {
    const hasScheme = /^[a-z][a-z\d+\-.]*:\/\//i.test(trimmedValue);
    const url = new URL(hasScheme ? trimmedValue : `https://${trimmedValue}`);
    const isLocalhost = url.hostname === "localhost";
    const hasDomain = url.hostname.includes(".");

    if (!isLocalhost && !hasDomain) {
      return null;
    }

    return url.protocol === "http:" || url.protocol === "https:"
      ? { hasScheme, url }
      : null;
  } catch {
    return null;
  }
}
