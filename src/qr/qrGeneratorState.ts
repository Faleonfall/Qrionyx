import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";
import { computed, ref } from "vue";
import { getLogoSizeMaxPercent } from "./logoSizeLimit";
import type { ImageNaturalSize } from "./logoImage";
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_BACKGROUND_ROUND,
  DEFAULT_CORNER_TYPE,
  DEFAULT_EXPORT_SIZE,
  DEFAULT_FILENAME,
  DEFAULT_IMAGE_MARGIN,
  DEFAULT_IMAGE_SIZE,
  DEFAULT_MARGIN_LEVEL,
  DEFAULT_QR_COLOR,
  DEFAULT_SHAPE_TYPE,
} from "./qrDefaults";
import type { ExportSize, GradientMode, MarginLevel } from "./qrTypes";
import type { SavedQrSessionRefs } from "./sessionStorage";
import { formatPreviewUrl, isValidQrUrl } from "./url";
import type { QrScanStatus } from "./scanQr";

export type QrPreviewRef = {
  container: HTMLElement | null;
};

export function createQrGeneratorState() {
  const qrPreview = ref<QrPreviewRef | null>(null);
  const qrUrl = ref("");
  const qrColor = ref(DEFAULT_QR_COLOR);
  const backgroundColor = ref(DEFAULT_BACKGROUND_COLOR);
  const backgroundRound = ref(DEFAULT_BACKGROUND_ROUND);
  const backgroundTransparent = ref(false);
  const exportSize = ref<ExportSize>(DEFAULT_EXPORT_SIZE);
  const filename = ref(DEFAULT_FILENAME);
  const advancedResetKey = ref(0);
  const dotType = ref<DotType>("square");
  const cornerType = ref<CornerSquareType>(DEFAULT_CORNER_TYPE);
  const errorCorrectionLevel = ref<ErrorCorrectionLevel>("M");
  const marginLevel = ref<MarginLevel>(DEFAULT_MARGIN_LEVEL);
  const shapeType = ref<ShapeType>(DEFAULT_SHAPE_TYPE);
  const image = ref("");
  const imageSize = ref(DEFAULT_IMAGE_SIZE);
  const imageMargin = ref(DEFAULT_IMAGE_MARGIN);
  const hideBackgroundDots = ref(true);
  const cornerSquareColor = ref("");
  const cornerDotColor = ref("");
  const dotsGradientType = ref<GradientMode>("none");
  const dotsGradientStartColor = ref(DEFAULT_QR_COLOR);
  const dotsGradientEndColor = ref("#8BE9FF");
  const renderedLogoSize = ref("");
  const imageNaturalSize = ref<ImageNaturalSize | null>(null);
  const qrModuleCount = ref(0);
  const scanStatus = ref<QrScanStatus>("idle");
  const hasQr = computed(() => qrUrl.value.length > 0);
  const hasLogo = computed(() => image.value.length > 0);
  const canDownload = computed(() => isValidQrUrl(qrUrl.value));
  const previewUrl = computed(() => formatPreviewUrl(qrUrl.value));
  const imageSizeMaxPercent = computed(() => {
    if (!image.value || !imageNaturalSize.value || qrModuleCount.value <= 0) {
      return 100;
    }

    return getLogoSizeMaxPercent({
      moduleCount: qrModuleCount.value,
      naturalHeight: imageNaturalSize.value.height,
      naturalWidth: imageNaturalSize.value.width,
    });
  });

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
      shapeType: shapeType.value,
      image: image.value,
      imageSize: imageSize.value,
      imageMargin: imageMargin.value,
      hideBackgroundDots: hideBackgroundDots.value,
      cornerSquareColor: cornerSquareColor.value,
      cornerDotColor: cornerDotColor.value,
      dotsGradientType: dotsGradientType.value,
      dotsGradientStartColor: dotsGradientStartColor.value,
      dotsGradientEndColor: dotsGradientEndColor.value,
      backgroundRound: backgroundRound.value,
    };
  }

  function resetState() {
    qrUrl.value = "";
    qrColor.value = DEFAULT_QR_COLOR;
    backgroundColor.value = DEFAULT_BACKGROUND_COLOR;
    backgroundRound.value = DEFAULT_BACKGROUND_ROUND;
    backgroundTransparent.value = false;
    exportSize.value = DEFAULT_EXPORT_SIZE;
    filename.value = DEFAULT_FILENAME;
    advancedResetKey.value += 1;
    dotType.value = "square";
    cornerType.value = DEFAULT_CORNER_TYPE;
    errorCorrectionLevel.value = "M";
    marginLevel.value = DEFAULT_MARGIN_LEVEL;
    shapeType.value = DEFAULT_SHAPE_TYPE;
    image.value = "";
    imageNaturalSize.value = null;
    imageSize.value = DEFAULT_IMAGE_SIZE;
    imageMargin.value = DEFAULT_IMAGE_MARGIN;
    hideBackgroundDots.value = true;
    cornerSquareColor.value = "";
    cornerDotColor.value = "";
    dotsGradientType.value = "none";
    dotsGradientStartColor.value = DEFAULT_QR_COLOR;
    dotsGradientEndColor.value = "#8BE9FF";
  }

  const sessionRefs: SavedQrSessionRefs = {
    backgroundColor,
    backgroundRound,
    backgroundTransparent,
    cornerDotColor,
    cornerSquareColor,
    cornerType,
    dotType,
    dotsGradientEndColor,
    dotsGradientStartColor,
    dotsGradientType,
    errorCorrectionLevel,
    exportSize,
    filename,
    hideBackgroundDots,
    image,
    imageMargin,
    imageSize,
    marginLevel,
    qrColor,
    qrUrl,
    shapeType,
  };

  return {
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
    errorCorrectionLevel,
    exportSize,
    filename,
    getSettings,
    hasLogo,
    hasQr,
    hideBackgroundDots,
    image,
    imageMargin,
    imageNaturalSize,
    imageSize,
    imageSizeMaxPercent,
    marginLevel,
    previewUrl,
    qrColor,
    qrModuleCount,
    qrPreview,
    qrUrl,
    renderedLogoSize,
    resetState,
    scanStatus,
    sessionRefs,
    shapeType,
  };
}

export type QrGeneratorState = ReturnType<typeof createQrGeneratorState>;
