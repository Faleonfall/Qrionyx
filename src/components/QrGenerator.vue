<template>
  <section class="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center gap-8 px-5 py-10">
    <header class="max-w-3xl">
      <p class="mb-3 text-sm uppercase tracking-[0.35em] text-[var(--color-neon-cyan)]">Local QR Tool</p>
      <h1 class="text-4xl font-bold leading-tight md:text-6xl">Styled QR Generator</h1>
      <p class="mt-4 text-base leading-7 text-[var(--color-text-muted)] md:text-lg">
        Generate the QR code in your browser. No backend, no upload, just local rendering.
      </p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <QrForm
        :background-color="backgroundColor"
        :dot-type="dotType"
        :error-correction-level="errorCorrectionLevel"
        :qr-color="qrColor"
        :url="qrUrl"
        @download-png="downloadPng"
        @download-svg="downloadSvg"
        @reset="resetQr"
        @update:background-color="updateBackgroundColor"
        @update:dot-type="updateDotType"
        @update:error-correction-level="updateErrorCorrectionLevel"
        @update:qr-color="updateQrColor"
        @update:url="updateUrl"
      />

      <QrPreview ref="qrPreview" :has-qr="hasQr" :preview-url="previewUrl" :title="qrUrl || 'Waiting for a URL...'" />
    </div>
  </section>
</template>

<script lang="ts">
import QRCodeStyling, { type DotType, type ErrorCorrectionLevel } from "qr-code-styling";
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import { createQrOptions, DEFAULT_BACKGROUND_COLOR, DEFAULT_QR_COLOR, formatPreviewUrl, QR_SIZE } from "../qr/config";
import QrForm from "./QrForm.vue";
import QrPreview from "./QrPreview.vue";

export default defineComponent({
  name: "QrGenerator",
  components: { QrForm, QrPreview },
  setup() {
    const qrPreview = ref<InstanceType<typeof QrPreview> | null>(null);
    const qrUrl = ref("");
    const qrColor = ref(DEFAULT_QR_COLOR);
    const backgroundColor = ref(DEFAULT_BACKGROUND_COLOR);
    const dotType = ref<DotType>("square");
    const errorCorrectionLevel = ref<ErrorCorrectionLevel>("M");
    const hasQr = computed(() => qrUrl.value.length > 0);
    const previewUrl = computed(() => formatPreviewUrl(qrUrl.value));
    let qr: QRCodeStyling | null = null;

    function getQrContainer() {
      return qrPreview.value?.container || null;
    }

    function getSettings() {
      return {
        data: qrUrl.value,
        qrColor: qrColor.value,
        backgroundColor: backgroundColor.value,
        dotType: dotType.value,
        errorCorrectionLevel: errorCorrectionLevel.value,
      };
    }

    function updateQr() {
      if (!hasQr.value) {
        getQrContainer()?.replaceChildren();
        qr = null;
        return;
      }

      if (!qr) {
        qr = new QRCodeStyling(createQrOptions(getSettings()));
        qr.append(getQrContainer() || undefined);
        return;
      }

      qr.update(createQrOptions(getSettings()));
    }

    function createDownloadQr() {
      if (!hasQr.value) {
        throw new Error("Enter a URL before downloading.");
      }

      return new QRCodeStyling(createQrOptions(getSettings(), QR_SIZE, QR_SIZE));
    }

    async function downloadPng() {
      await createDownloadQr().download({ name: "qr", extension: "png" });
    }

    async function downloadSvg() {
      await createDownloadQr().download({ name: "qr", extension: "svg" });
    }

    function setAndUpdate<T>(target: { value: T }, value: T) {
      target.value = value;
      updateQr();
    }

    function updateUrl(value: string) {
      setAndUpdate(qrUrl, value);
    }

    function updateQrColor(value: string) {
      setAndUpdate(qrColor, value);
    }

    function updateBackgroundColor(value: string) {
      setAndUpdate(backgroundColor, value);
    }

    function updateDotType(value: DotType) {
      setAndUpdate(dotType, value);
    }

    function updateErrorCorrectionLevel(value: ErrorCorrectionLevel) {
      setAndUpdate(errorCorrectionLevel, value);
    }

    function resetQr() {
      qrUrl.value = "";
      qrColor.value = DEFAULT_QR_COLOR;
      backgroundColor.value = DEFAULT_BACKGROUND_COLOR;
      dotType.value = "square";
      errorCorrectionLevel.value = "M";
      updateQr();
    }

    onMounted(async () => {
      await nextTick();

      if (hasQr.value) {
        qr = new QRCodeStyling(createQrOptions(getSettings()));
        qr.append(getQrContainer() || undefined);
      }
    });

    return {
      backgroundColor,
      dotType,
      downloadPng,
      downloadSvg,
      errorCorrectionLevel,
      hasQr,
      previewUrl,
      qrColor,
      qrPreview,
      qrUrl,
      resetQr,
      updateBackgroundColor,
      updateDotType,
      updateErrorCorrectionLevel,
      updateQrColor,
      updateUrl,
    };
  },
});
</script>
