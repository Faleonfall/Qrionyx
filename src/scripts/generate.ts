import { mkdir, writeFile } from "node:fs/promises";
import QRCodeStyling from "qr-code-styling";
import * as nodeCanvas from "canvas";
import { JSDOM } from "jsdom";

const OUTPUT_DIR = "generated";
const OUTPUT_FILE = `${OUTPUT_DIR}/qr.png`;
const QR_URL = "https://www.nature.com/articles/s41586-024-08252-9";
const QR_SIZE = 1024;
const QR_MARGIN = 20;
const PURPLE = "#603AB0";
const WHITE = "#FFFFFF";

async function main() {
    const qr = new QRCodeStyling({
        width: QR_SIZE,
        height: QR_SIZE,
        margin: QR_MARGIN,
        data: QR_URL,

        qrOptions: {
            errorCorrectionLevel: "M"
        },

        cornersSquareOptions: {
            type: "rounded",
        },

        cornersDotOptions: {
            type: "rounded",
        },

        dotsOptions: {
            color: PURPLE,
            type: "square"
        },

        backgroundOptions: {
            color: WHITE
        },

        nodeCanvas: nodeCanvas,
        jsdom: JSDOM
    });

    const buffer = await qr.getRawData("png");

    if (!buffer || buffer instanceof Blob) {
        throw new Error("QR code generation did not return a PNG buffer.");
    }

    await mkdir(OUTPUT_DIR, { recursive: true });
    await writeFile(OUTPUT_FILE, buffer);
    console.log(`QR created: ${OUTPUT_FILE}`);
}

main().catch(error => {
    console.error("Failed to create QR code.");
    console.error(error);
    process.exitCode = 1;
});
