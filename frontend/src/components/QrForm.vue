<template>
  <form
    class="border border-transparent p-5 pt-3.5 sm:pt-1 max-lg:mt-5 max-lg:panel-card lg:border-t-0 lg:pt-0"
    @submit.prevent
  >
    <div
      class="transition-opacity"
      :class="{ 'pointer-events-none opacity-40': !hasQr }"
    >
      <QrSectionSwitch v-model:active-section="activeSection" />

      <div class="relative overflow-hidden w-full">
        <div
          class="transition-all duration-150 ease-in-out"
          :class="getSectionPanelClass(activeSection, 'basic')"
        >
          <QrBasicControls
            :background-color="backgroundColor"
            :background-transparent="backgroundTransparent"
            :corner-type="cornerType"
            :dot-type="dotType"
            :error-correction-level="errorCorrectionLevel"
            :export-size="exportSize"
            :filename="filename"
            :margin-level="marginLevel"
            :qr-color="qrColor"
            @update:background-color="emit('update:backgroundColor', $event)"
            @update:background-transparent="
              emit('update:backgroundTransparent', $event)
            "
            @update:corner-type="emit('update:cornerType', $event)"
            @update:dot-type="emit('update:dotType', $event)"
            @update:error-correction-level="
              emit('update:errorCorrectionLevel', $event)
            "
            @update:export-size="emit('update:exportSize', $event)"
            @update:filename="emit('update:filename', $event)"
            @update:margin-level="emit('update:marginLevel', $event)"
            @update:qr-color="emit('update:qrColor', $event)"
          />
        </div>

        <div
          class="transition-all duration-150 ease-in-out"
          :class="getSectionPanelClass(activeSection, 'advanced')"
        >
          <QrAdvancedControls
            :key="advancedResetKey"
            :background-round="backgroundRound"
            :corner-dot-color="cornerDotColor"
            :corner-square-color="cornerSquareColor"
            :dots-gradient-end-color="dotsGradientEndColor"
            :dots-gradient-start-color="dotsGradientStartColor"
            :dots-gradient-type="dotsGradientType"
            :has-dots-gradient="hasDotsGradient"
            :has-logo="hasLogo"
            :hide-background-dots="hideBackgroundDots"
            :image-margin="imageMargin"
            :image-size="imageSize"
            :image-size-max-percent="imageSizeMaxPercent"
            :rendered-logo-size="renderedLogoSize"
            :shape-type="shapeType"
            @update:background-round="emit('update:backgroundRound', $event)"
            @update:corner-dot-color="emit('update:cornerDotColor', $event)"
            @update:corner-square-color="
              emit('update:cornerSquareColor', $event)
            "
            @update:dots-gradient-end-color="
              emit('update:dotsGradientEndColor', $event)
            "
            @update:dots-gradient-start-color="
              emit('update:dotsGradientStartColor', $event)
            "
            @update:dots-gradient-type="emit('update:dotsGradientType', $event)"
            @update:hide-background-dots="
              emit('update:hideBackgroundDots', $event)
            "
            @update:image-margin="emit('update:imageMargin', $event)"
            @update:image-size="emit('update:imageSize', $event)"
            @update:logo-file="emit('update:logoFile', $event)"
            @update:shape-type="emit('update:shapeType', $event)"
          />
        </div>
      </div>

      <QrExportActions
        :can-download="canDownload"
        @download-png="emit('download-png')"
        @download-svg="emit('download-svg')"
        @download-webp="emit('download-webp')"
        @reset="emit('reset')"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";
import { ref } from "vue";
import { getSectionPanelClass } from "../lib/formDisplay";
import type {
  ExportSize,
  FormSection,
  GradientMode,
  MarginLevel,
} from "../lib/qrTypes";
import QrAdvancedControls from "./QrAdvancedControls.vue";
import QrBasicControls from "./QrBasicControls.vue";
import QrExportActions from "./QrExportActions.vue";
import QrSectionSwitch from "./QrSectionSwitch.vue";

defineProps<{
  advancedResetKey: number;
  backgroundColor: string;
  backgroundRound: number;
  backgroundTransparent: boolean;
  canDownload: boolean;
  hasQr: boolean;
  cornerDotColor: string;
  cornerSquareColor: string;
  cornerType: CornerSquareType;
  dotType: DotType;
  dotsGradientEndColor: string;
  dotsGradientStartColor: string;
  dotsGradientType: GradientMode;
  errorCorrectionLevel: ErrorCorrectionLevel;
  exportSize: ExportSize;
  filename: string;
  hasDotsGradient: boolean;
  hasLogo: boolean;
  hideBackgroundDots: boolean;
  imageMargin: number;
  imageSize: number;
  imageSizeMaxPercent: number;
  marginLevel: MarginLevel;
  qrColor: string;
  renderedLogoSize: string;
  shapeType: ShapeType;
}>();

const emit = defineEmits<{
  "download-png": [];
  "download-svg": [];
  "download-webp": [];
  reset: [];
  "update:backgroundColor": [value: string];
  "update:backgroundRound": [value: number];
  "update:backgroundTransparent": [value: boolean];
  "update:cornerDotColor": [value: string];
  "update:cornerSquareColor": [value: string];
  "update:cornerType": [value: CornerSquareType];
  "update:dotType": [value: DotType];
  "update:dotsGradientEndColor": [value: string];
  "update:dotsGradientStartColor": [value: string];
  "update:dotsGradientType": [value: GradientMode];
  "update:errorCorrectionLevel": [value: ErrorCorrectionLevel];
  "update:exportSize": [value: ExportSize];
  "update:filename": [value: string];
  "update:hideBackgroundDots": [value: boolean];
  "update:imageMargin": [value: number];
  "update:imageSize": [value: number];
  "update:logoFile": [value: File | null];
  "update:marginLevel": [value: MarginLevel];
  "update:qrColor": [value: string];
  "update:shapeType": [value: ShapeType];
}>();

const activeSection = ref<FormSection>("basic");
</script>
