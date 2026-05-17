<template>
  <section
    class="mx-auto flex min-h-svh w-full max-w-304 flex-col justify-center gap-6 px-7 py-8"
  >
    <header class="max-w-2xl">
      <p
        class="select-none text-xs uppercase tracking-[0.32em] text-(--color-neon-cyan)"
      >
        qrionyx
      </p>
      <h1
        class="select-none whitespace-nowrap text-2xl font-bold leading-tight md:text-3xl"
      >
        Local styled QR generator
      </h1>
      <p
        class="mt-3 select-none text-sm leading-6 text-(--color-text-muted) md:text-base"
      >
        Generate the QR code in your browser. No backend, no upload, just local
        rendering.
      </p>
    </header>

    <div class="grid gap-5 lg:grid-cols-[minmax(0,840px)_350px]">
      <QrForm
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
        :has-logo="hasLogo"
        :hide-background-dots="hideBackgroundDots"
        :image-margin="imageMargin"
        :image-size="imageSize"
        :image-size-max-percent="imageSizeMaxPercent"
        :margin-level="marginLevel"
        :qr-color="qrColor"
        :rendered-logo-size="renderedLogoSize"
        :shape-type="shapeType"
        :url="qrUrl"
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
        @update:url="updateUrl"
      />

      <QrPreview
        ref="qrPreview"
        :background-color="backgroundColor"
        :background-round="backgroundRound"
        :background-transparent="backgroundTransparent"
        :has-qr="hasQr"
        :preview-url="previewUrl"
        :scan-status="scanStatus"
        :title="qrUrl || 'Waiting for a URL...'"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQrGenerator } from "../qr/useQrGenerator";
import QrForm from "./QrForm.vue";
import QrPreview from "./QrPreview.vue";

export default defineComponent({
  name: "QrGenerator",
  components: { QrForm, QrPreview },
  setup: useQrGenerator,
});
</script>
