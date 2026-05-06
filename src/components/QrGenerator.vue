<template>
  <section
    class="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-5 px-5 py-6"
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

    <div class="grid gap-4 lg:grid-cols-[minmax(0,720px)_350px]">
      <QrForm
        :background-color="backgroundColor"
        :background-transparent="backgroundTransparent"
        :dot-type="dotType"
        :error-correction-level="errorCorrectionLevel"
        :export-size="exportSize"
        :filename="filename"
        :can-download="canDownload"
        :corner-type="cornerType"
        :margin-level="marginLevel"
        :qr-color="qrColor"
        :url="qrUrl"
        @download-png="downloadPng"
        @download-svg="downloadSvg"
        @download-webp="downloadWebp"
        @reset="resetQr"
        @update:background-color="updateBackgroundColor"
        @update:background-transparent="updateBackgroundTransparent"
        @update:corner-type="updateCornerType"
        @update:dot-type="updateDotType"
        @update:error-correction-level="updateErrorCorrectionLevel"
        @update:export-size="updateExportSize"
        @update:filename="updateFilename"
        @update:margin-level="updateMarginLevel"
        @update:qr-color="updateQrColor"
        @update:url="updateUrl"
      />

      <QrPreview
        ref="qrPreview"
        :background-color="backgroundColor"
        :background-transparent="backgroundTransparent"
        :has-qr="hasQr"
        :preview-url="previewUrl"
        :title="qrUrl || 'Waiting for a URL...'"
      />
    </div>
  </section>
</template>

<script lang="ts">
import QRCodeStyling, {
  type CornerSquareType,
  type DotType,
  type ErrorCorrectionLevel,
} from "qr-code-styling";
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import {
  createQrOptions,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_CORNER_TYPE,
  DEFAULT_EXPORT_SIZE,
  DEFAULT_FILENAME,
  DEFAULT_MARGIN_LEVEL,
  DEFAULT_QR_COLOR,
  formatPreviewUrl,
  type ExportSize,
  type MarginLevel,
} from "../qr/config";
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
    const backgroundTransparent = ref(false);
    const exportSize = ref<ExportSize>(DEFAULT_EXPORT_SIZE);
    const filename = ref(DEFAULT_FILENAME);
    const dotType = ref<DotType>("square");
    const cornerType = ref<CornerSquareType>(DEFAULT_CORNER_TYPE);
    const errorCorrectionLevel = ref<ErrorCorrectionLevel>("M");
    const marginLevel = ref<MarginLevel>(DEFAULT_MARGIN_LEVEL);
    const hasQr = computed(() => qrUrl.value.length > 0);
    const canDownload = computed(() => isValidQrUrl(qrUrl.value));
    const previewUrl = computed(() => formatPreviewUrl(qrUrl.value));
    let qr: QRCodeStyling | null = null;

    function isValidQrUrl(value: string) {
      return parseQrUrl(value) !== null;
    }

    function parseQrUrl(value: string) {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return null;
      }

      try {
        const hasScheme = /^[a-z][a-z\d+\-.]*:\/\//i.test(trimmedValue);
        const url = new URL(
          hasScheme ? trimmedValue : `https://${trimmedValue}`,
        );
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

    function getQrContainer() {
      return qrPreview.value?.container || null;
    }

    function getSettings() {
      return {
        data: qrUrl.value,
        qrColor: qrColor.value,
        backgroundColor: backgroundColor.value,
        backgroundTransparent: backgroundTransparent.value,
        dotType: dotType.value,
        cornerType: cornerType.value,
        errorCorrectionLevel: errorCorrectionLevel.value,
        marginLevel: marginLevel.value,
      };
    }

    function updateQr() {
      if (!hasQr.value) {
        getQrContainer()?.replaceChildren();
        qr = null;
        return;
      }

      if (!qr) {
        qr = new QRCodeStyling(createPreviewQrOptions());
        qr.append(getQrContainer() || undefined);
        return;
      }

      qr.update(createPreviewQrOptions());
    }

    function createPreviewQrOptions() {
      return createQrOptions(getSettings(), undefined, undefined, "svg");
    }

    function createDownloadQr() {
      if (!canDownload.value) {
        throw new Error("Enter a valid URL before downloading.");
      }

      return new QRCodeStyling(
        createQrOptions(getSettings(), exportSize.value, exportSize.value),
      );
    }

    function getDownloadName() {
      return (
        filename.value.trim().replace(/\.(png|webp|svg|jpe?g)$/i, "") ||
        DEFAULT_FILENAME
      );
    }

    async function downloadPng() {
      await createDownloadQr().download({
        name: getDownloadName(),
        extension: "png",
      });
    }

    async function downloadSvg() {
      await createDownloadQr().download({
        name: getDownloadName(),
        extension: "svg",
      });
    }

    async function downloadWebp() {
      await createDownloadQr().download({
        name: getDownloadName(),
        extension: "webp",
      });
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

    function updateBackgroundTransparent(value: boolean) {
      setAndUpdate(backgroundTransparent, value);
    }

    function updateDotType(value: DotType) {
      setAndUpdate(dotType, value);
    }

    function updateCornerType(value: CornerSquareType) {
      setAndUpdate(cornerType, value);
    }

    function updateErrorCorrectionLevel(value: ErrorCorrectionLevel) {
      setAndUpdate(errorCorrectionLevel, value);
    }

    function updateExportSize(value: ExportSize) {
      exportSize.value = value;
    }

    function updateFilename(value: string) {
      filename.value = value;
    }

    function updateMarginLevel(value: MarginLevel) {
      setAndUpdate(marginLevel, value);
    }

    function resetQr() {
      qrUrl.value = "";
      qrColor.value = DEFAULT_QR_COLOR;
      backgroundColor.value = DEFAULT_BACKGROUND_COLOR;
      backgroundTransparent.value = false;
      exportSize.value = DEFAULT_EXPORT_SIZE;
      filename.value = DEFAULT_FILENAME;
      dotType.value = "square";
      cornerType.value = DEFAULT_CORNER_TYPE;
      errorCorrectionLevel.value = "M";
      marginLevel.value = DEFAULT_MARGIN_LEVEL;
      updateQr();
    }

    onMounted(async () => {
      await nextTick();

      if (hasQr.value) {
        qr = new QRCodeStyling(createPreviewQrOptions());
        qr.append(getQrContainer() || undefined);
      }
    });

    return {
      backgroundColor,
      backgroundTransparent,
      canDownload,
      cornerType,
      dotType,
      downloadPng,
      downloadSvg,
      downloadWebp,
      errorCorrectionLevel,
      exportSize,
      filename,
      hasQr,
      marginLevel,
      previewUrl,
      qrColor,
      qrPreview,
      qrUrl,
      resetQr,
      updateBackgroundColor,
      updateBackgroundTransparent,
      updateCornerType,
      updateDotType,
      updateErrorCorrectionLevel,
      updateExportSize,
      updateFilename,
      updateMarginLevel,
      updateQrColor,
      updateUrl,
    };
  },
});
</script>
