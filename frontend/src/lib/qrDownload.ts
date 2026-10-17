import { DEFAULT_FILENAME } from "./qrDefaults";

export function getDownloadName(filename: string) {
  return (
    filename.trim().replace(/\.(png|webp|svg|jpe?g)$/i, "") || DEFAULT_FILENAME
  );
}
