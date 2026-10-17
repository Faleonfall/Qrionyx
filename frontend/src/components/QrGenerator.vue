<template>
  <section
    class="app-shell mx-auto flex min-h-svh w-full max-w-304 flex-col px-4 sm:px-7"
  >
    <header class="flex w-full items-center justify-between gap-4">
      <div>
        <p
          class="select-none text-xs uppercase tracking-[0.32em] text-neon-cyan"
        >
          qrionyx
        </p>
        <h1
          class="select-none text-2xl font-bold leading-tight md:whitespace-nowrap md:text-3xl"
        >
          Local styled QR generator
        </h1>
      </div>
      <button
        class="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-line bg-transparent text-ink-muted transition-all duration-300 hover:border-neon-cyan hover:bg-panel hover:text-neon-cyan"
        :title="toggleLabel"
        :aria-label="toggleLabel"
        @click="toggleTheme"
      >
        <Moon v-if="activeTheme === 'dark'" :size="18" />
        <Sun v-else :size="18" />
      </button>
    </header>

    <!-- Auto margins center the cards between header and footer on desktop -->
    <div
      class="mx-auto grid w-full max-w-2xl lg:my-auto lg:max-w-none lg:grid-cols-[minmax(0,840px)_350px] lg:gap-x-5"
    >
      <!-- One card behind the URL field and the controls on desktop -->
      <div
        class="hidden lg:block panel-card lg:col-start-1 lg:row-start-1 lg:row-span-2"
      ></div>

      <div
        class="border border-transparent p-5 pt-3.5 max-lg:panel-card lg:col-start-1 lg:row-start-1 lg:border-b-0 lg:pb-0"
      >
        <QrUrlField :url="qrUrl" @update:url="updateUrl" />
      </div>

      <div
        class="generator-preview lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
        :class="{ 'is-open': hasQr }"
      >
        <QrPreview
          ref="qrPreview"
          :background-color="backgroundColor"
          :background-round="backgroundRound"
          :background-transparent="backgroundTransparent"
          :has-qr="hasQr"
          :preview-url="previewUrl"
          :scan-status="scanStatus"
          :title="previewTitle"
        />
      </div>

      <QrForm
        class="lg:col-start-1 lg:row-start-2"
        :advanced-reset-key="advancedResetKey"
        :background-color="backgroundColor"
        :background-round="backgroundRound"
        :background-transparent="backgroundTransparent"
        :can-download="canDownload"
        :has-qr="hasQr"
        :corner-dot-color="cornerDotColor"
        :corner-square-color="cornerSquareColor"
        :corner-type="cornerType"
        :dot-type="dotType"
        :dots-gradient-end-color="dotsGradientEndColor"
        :dots-gradient-start-color="dotsGradientStartColor"
        :dots-gradient-type="dotsGradientType"
        :error-correction-level="errorCorrectionLevel"
        :export-size="exportSize"
        :filename="filename"
        :has-dots-gradient="hasDotsGradient"
        :has-logo="hasLogo"
        :hide-background-dots="hideBackgroundDots"
        :image-margin="imageMargin"
        :image-size="imageSize"
        :image-size-max-percent="imageSizeMaxPercent"
        :margin-level="marginLevel"
        :qr-color="qrColor"
        :rendered-logo-size="renderedLogoSize"
        :shape-type="shapeType"
        @download-png="downloadPng"
        @download-svg="downloadSvg"
        @download-webp="downloadWebp"
        @reset="resetQr"
        @update:background-color="updateBackgroundColor"
        @update:background-round="updateBackgroundRound"
        @update:background-transparent="updateBackgroundTransparent"
        @update:corner-dot-color="updateCornerDotColor"
        @update:corner-square-color="updateCornerSquareColor"
        @update:corner-type="updateCornerType"
        @update:dot-type="updateDotType"
        @update:dots-gradient-end-color="updateDotsGradientEndColor"
        @update:dots-gradient-start-color="updateDotsGradientStartColor"
        @update:dots-gradient-type="updateDotsGradientType"
        @update:error-correction-level="updateErrorCorrectionLevel"
        @update:export-size="updateExportSize"
        @update:filename="updateFilename"
        @update:hide-background-dots="updateHideBackgroundDots"
        @update:image-margin="updateImageMargin"
        @update:image-size="updateImageSize"
        @update:logo-file="updateLogoFile"
        @update:margin-level="updateMarginLevel"
        @update:qr-color="updateQrColor"
        @update:shape-type="updateShapeType"
      />
    </div>

    <!-- Top padding follows the shell padding so the text sits centered -->
    <footer
      class="flex w-full select-none max-lg:mt-auto flex-col items-center justify-center border-t border-line pt-(--shell-pad-y)"
    >
      <div
        class="flex flex-wrap items-center justify-center gap-2 text-center text-[13px] text-ink-muted opacity-80 transition-colors duration-300"
      >
        <span>&copy; 2026 Qrionyx</span>
        <span class="opacity-50">•</span>
        <a
          href="https://github.com/Faleonfall/Qrionyx"
          target="_blank"
          rel="noopener noreferrer"
          class="border-b border-dotted border-transparent font-medium text-ink-muted transition-all duration-200 hover:border-neon-cyan hover:text-neon-cyan"
        >
          GitHub
        </a>
        <span class="opacity-50">•</span>
        <span>Processed completely in-browser on your local machine.</span>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";
import { useTheme } from "../composables/useTheme";
import { useQrGenerator } from "../composables/useQrGenerator";
import QrForm from "./QrForm.vue";
import QrPreview from "./QrPreview.vue";
import QrUrlField from "./QrUrlField.vue";

const { activeTheme, toggleLabel, toggleTheme } = useTheme();

const {
  advancedResetKey,
  backgroundColor,
  backgroundRound,
  backgroundTransparent,
  canDownload,
  cornerDotColor,
  cornerSquareColor,
  cornerType,
  dotType,
  dotsGradientEndColor,
  dotsGradientStartColor,
  dotsGradientType,
  downloadPng,
  downloadSvg,
  downloadWebp,
  errorCorrectionLevel,
  exportSize,
  filename,
  hasDotsGradient,
  hasLogo,
  hasQr,
  hideBackgroundDots,
  imageMargin,
  imageSize,
  imageSizeMaxPercent,
  marginLevel,
  previewTitle,
  previewUrl,
  qrColor,
  qrUrl,
  renderedLogoSize,
  resetQr,
  scanStatus,
  shapeType,
  updateBackgroundColor,
  updateBackgroundRound,
  updateBackgroundTransparent,
  updateCornerDotColor,
  updateCornerSquareColor,
  updateCornerType,
  updateDotType,
  updateDotsGradientEndColor,
  updateDotsGradientStartColor,
  updateDotsGradientType,
  updateErrorCorrectionLevel,
  updateExportSize,
  updateFilename,
  updateHideBackgroundDots,
  updateImageMargin,
  updateImageSize,
  updateLogoFile,
  updateMarginLevel,
  updateQrColor,
  updateShapeType,
  updateUrl,
} = useQrGenerator();
</script>
