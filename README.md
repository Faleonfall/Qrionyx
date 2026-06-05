# qrionyx

qrionyx is a web tool that runs entirely in your browser to generate styled, customized QR codes locally.

## How it Works in Your Browser

- **Zero Installs**: You do not need to download or install any applications on your computer. Simply open the web page and start generating.
- **Complete Privacy**: All QR generation and validation is done locally on your machine. Your URLs and texts are never uploaded to a server, keeping your data fully private.
- **Offline Capable**: Once the page is loaded, it can run entirely offline without an active internet connection.
- **Real-Time Previews**: See your color adjustments, visual shapes, and design options updated instantly in the live preview.

## Quick Start

1. Open the website.
2. Enter the URL or text you want to encode.
3. Customize the visual styles, colors, gradients, and optional logo overlay.
4. Verify scannability with the automatic confidence check.
5. Export the generated QR code as PNG, WebP, or SVG.

## Technologies Used

- **Framework**: Vue 3
- **Bundler & Server**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **QR Core**: qr-code-styling & jsQR

## Running Locally (for Developers)

If you want to run the project code locally on your machine:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the local development server:

   ```bash
   npm run dev
   ```

3. Open the address shown in your terminal (usually `http://localhost:5173`).
