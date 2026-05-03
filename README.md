# qrionyx

> A small local QR code generator for creating styled QR codes in the browser.

qrionyx runs entirely on the client. Enter a URL, choose the QR shape and colors, preview the result, and download the generated code without sending the content to a server.

## Features

- **Local generation:** QR codes are rendered in the browser
- **Styled output:** Adjust QR style, corners, margin, colors, and correction level
- **Live preview:** See changes immediately while editing
- **Download ready:** Export PNG, WebP, or SVG at common pixel sizes
- **Responsive layout:** Works comfortably on desktop and mobile screens

## Technology

- [Vue 3](https://vuejs.org/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)

## Local Development

```sh
git clone git@github.com:Faleonfall/qrionyx.git
cd qrionyx
npm install
npm run dev
```

## Build

```sh
npm run build
```

The production files are generated in `dist/`.

## Checks

```sh
npm run lint
npm run format:check
```
