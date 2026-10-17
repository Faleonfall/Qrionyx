<template>
  <form
    class="rounded-2xl border border-(--color-panel-border) bg-(--color-panel)/80 p-5 shadow-2xl shadow-black/30"
    @submit.prevent
  >
    <QrUrlField :url="url" @update:url="$emit('update:url', $event)" />

    <div
      class="transition-opacity"
      :class="{ 'pointer-events-none opacity-40': !hasQr }"
    >
      <QrSectionSwitch
        :active-section="activeSection"
        @update:active-section="updateActiveSection"
      />

      <div class="relative overflow-hidden w-full">
        <div
          class="transition-all duration-150 ease-in-out"
          :class="
            activeSection === 'basic'
              ? 'relative z-10 translate-x-0 opacity-100'
              : 'absolute left-0 top-0 w-full pointer-events-none z-0 -translate-x-8 opacity-0'
          "
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
            @update:background-color="$emit('update:backgroundColor', $event)"
            @update:background-transparent="
              $emit('update:backgroundTransparent', $event)
            "
            @update:corner-type="$emit('update:cornerType', $event)"
            @update:dot-type="$emit('update:dotType', $event)"
            @update:error-correction-level="
              $emit('update:errorCorrectionLevel', $event)
            "
            @update:export-size="$emit('update:exportSize', $event)"
            @update:filename="$emit('update:filename', $event)"
            @update:margin-level="$emit('update:marginLevel', $event)"
            @update:qr-color="$emit('update:qrColor', $event)"
          />
        </div>

        <div
          class="transition-all duration-150 ease-in-out"
          :class="
            activeSection === 'advanced'
              ? 'relative z-10 translate-x-0 opacity-100'
              : 'absolute left-0 top-0 w-full pointer-events-none z-0 translate-x-8 opacity-0'
          "
        >
          <QrAdvancedControls
            :key="advancedResetKey"
            :background-round="backgroundRound"
            :corner-dot-color="cornerDotColor || qrColor"
            :corner-square-color="cornerSquareColor || qrColor"
            :dots-gradient-end-color="dotsGradientEndColor"
            :dots-gradient-start-color="dotsGradientStartColor"
            :dots-gradient-type="dotsGradientType"
            :has-logo="hasLogo"
            :hide-background-dots="hideBackgroundDots"
            :image-margin="imageMargin"
            :image-size="imageSize"
            :image-size-max-percent="imageSizeMaxPercent"
            :rendered-logo-size="renderedLogoSize"
            :shape-type="shapeType"
            @update:background-round="$emit('update:backgroundRound', $event)"
            @update:corner-dot-color="$emit('update:cornerDotColor', $event)"
            @update:corner-square-color="
              $emit('update:cornerSquareColor', $event)
            "
            @update:dots-gradient-end-color="
              $emit('update:dotsGradientEndColor', $event)
            "
            @update:dots-gradient-start-color="
              $emit('update:dotsGradientStartColor', $event)
            "
            @update:dots-gradient-type="
              $emit('update:dotsGradientType', $event)
            "
            @update:hide-background-dots="
              $emit('update:hideBackgroundDots', $event)
            "
            @update:image-margin="$emit('update:imageMargin', $event)"
            @update:image-size="$emit('update:imageSize', $event)"
            @update:logo-file="$emit('update:logoFile', $event)"
            @update:shape-type="$emit('update:shapeType', $event)"
          />
        </div>
      </div>

      <QrExportActions
        :can-download="canDownload"
        @download-png="$emit('download-png')"
        @download-svg="$emit('download-svg')"
        @download-webp="$emit('download-webp')"
        @reset="$emit('reset')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ShapeType,
} from "qr-code-styling";
import { defineComponent, ref, type PropType } from "vue";
import type {
  ExportSize,
  FormSection,
  GradientMode,
  MarginLevel,
} from "../qr/qrTypes";
import QrAdvancedControls from "./QrAdvancedControls.vue";
import QrBasicControls from "./QrBasicControls.vue";
import QrExportActions from "./QrExportActions.vue";
import QrSectionSwitch from "./QrSectionSwitch.vue";
import QrUrlField from "./QrUrlField.vue";

export default defineComponent({
  name: "QrForm",
  components: {
    QrAdvancedControls,
    QrBasicControls,
    QrExportActions,
    QrSectionSwitch,
    QrUrlField,
  },
  props: {
    advancedResetKey: {
      type: Number,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    backgroundRound: {
      type: Number,
      required: true,
    },
    backgroundTransparent: {
      type: Boolean,
      required: true,
    },
    canDownload: {
      type: Boolean,
      required: true,
    },
    hasQr: {
      type: Boolean,
      required: true,
    },
    cornerDotColor: {
      type: String,
      required: true,
    },
    cornerSquareColor: {
      type: String,
      required: true,
    },
    cornerType: {
      type: String as PropType<CornerSquareType>,
      required: true,
    },
    dotType: {
      type: String as PropType<DotType>,
      required: true,
    },
    dotsGradientEndColor: {
      type: String,
      required: true,
    },
    dotsGradientStartColor: {
      type: String,
      required: true,
    },
    dotsGradientType: {
      type: String as PropType<GradientMode>,
      required: true,
    },
    errorCorrectionLevel: {
      type: String as PropType<ErrorCorrectionLevel>,
      required: true,
    },
    exportSize: {
      type: Number as PropType<ExportSize>,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    hasLogo: {
      type: Boolean,
      required: true,
    },
    hideBackgroundDots: {
      type: Boolean,
      required: true,
    },
    imageMargin: {
      type: Number,
      required: true,
    },
    imageSize: {
      type: Number,
      required: true,
    },
    imageSizeMaxPercent: {
      type: Number,
      required: true,
    },
    marginLevel: {
      type: String as PropType<MarginLevel>,
      required: true,
    },
    qrColor: {
      type: String,
      required: true,
    },
    renderedLogoSize: {
      type: String,
      required: true,
    },
    shapeType: {
      type: String as PropType<ShapeType>,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  emits: {
    "download-png": null,
    "download-svg": null,
    "download-webp": null,
    reset: null,
    "update:backgroundColor": (value: string) => value.length > 0,
    "update:backgroundRound": (value: number) => value >= 0,
    "update:backgroundTransparent": (value: boolean) =>
      typeof value === "boolean",
    "update:cornerDotColor": (value: string) => value.length > 0,
    "update:cornerSquareColor": (value: string) => value.length > 0,
    "update:cornerType": (value: CornerSquareType) => value.length > 0,
    "update:dotType": (value: DotType) => value.length > 0,
    "update:dotsGradientEndColor": (value: string) => value.length > 0,
    "update:dotsGradientStartColor": (value: string) => value.length > 0,
    "update:dotsGradientType": (value: GradientMode) => value.length > 0,
    "update:errorCorrectionLevel": (value: ErrorCorrectionLevel) =>
      value.length > 0,
    "update:exportSize": (value: ExportSize) =>
      [512, 1024, 2048].includes(value),
    "update:filename": (value: string) => typeof value === "string",
    "update:hideBackgroundDots": (value: boolean) => typeof value === "boolean",
    "update:imageMargin": (value: number) => value >= 0,
    "update:imageSize": (value: number) => value > 0,
    "update:logoFile": (value: File | null) => value === null || value.size > 0,
    "update:marginLevel": (value: MarginLevel) => value.length > 0,
    "update:qrColor": (value: string) => value.length > 0,
    "update:shapeType": (value: ShapeType) => value.length > 0,
    "update:url": (value: string) => typeof value === "string",
  },
  setup() {
    const activeSection = ref<FormSection>("basic");

    function updateActiveSection(value: string) {
      if (value === "basic" || value === "advanced") {
        activeSection.value = value;
      }
    }

    return { activeSection, updateActiveSection };
  },
});
</script>
