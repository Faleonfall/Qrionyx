<template>
  <div class="mt-3 space-y-3">
    <QrLogoControls
      :has-logo="hasLogo"
      :hide-background-dots="hideBackgroundDots"
      :image-margin="imageMargin"
      :image-size="imageSize"
      :image-size-max-percent="imageSizeMaxPercent"
      :rendered-logo-size="renderedLogoSize"
      @update:hide-background-dots="$emit('update:hideBackgroundDots', $event)"
      @update:image-margin="$emit('update:imageMargin', $event)"
      @update:image-size="$emit('update:imageSize', $event)"
      @update:logo-file="$emit('update:logoFile', $event)"
    />

    <QrAdvancedVisualControls
      :background-round="backgroundRound"
      :corner-dot-color="cornerDotColor"
      :corner-square-color="cornerSquareColor"
      :dots-gradient-end-color="dotsGradientEndColor"
      :dots-gradient-start-color="dotsGradientStartColor"
      :dots-gradient-type="dotsGradientType"
      :shape-type="shapeType"
      @update:background-round="$emit('update:backgroundRound', $event)"
      @update:corner-dot-color="$emit('update:cornerDotColor', $event)"
      @update:corner-square-color="$emit('update:cornerSquareColor', $event)"
      @update:dots-gradient-end-color="
        $emit('update:dotsGradientEndColor', $event)
      "
      @update:dots-gradient-start-color="
        $emit('update:dotsGradientStartColor', $event)
      "
      @update:dots-gradient-type="$emit('update:dotsGradientType', $event)"
      @update:shape-type="$emit('update:shapeType', $event)"
    />
  </div>
</template>

<script lang="ts">
import type { ShapeType } from "qr-code-styling";
import { defineComponent, type PropType } from "vue";
import type { GradientMode } from "../qr/qrTypes";
import QrAdvancedVisualControls from "./QrAdvancedVisualControls.vue";
import QrLogoControls from "./QrLogoControls.vue";

export default defineComponent({
  name: "QrAdvancedControls",
  components: { QrAdvancedVisualControls, QrLogoControls },
  props: {
    backgroundRound: {
      type: Number,
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
    renderedLogoSize: {
      type: String,
      required: true,
    },
    shapeType: {
      type: String as PropType<ShapeType>,
      required: true,
    },
  },
  emits: {
    "update:backgroundRound": (value: number) => value >= 0,
    "update:cornerDotColor": (value: string) => value.length > 0,
    "update:cornerSquareColor": (value: string) => value.length > 0,
    "update:dotsGradientEndColor": (value: string) => value.length > 0,
    "update:dotsGradientStartColor": (value: string) => value.length > 0,
    "update:dotsGradientType": (value: GradientMode) => value.length > 0,
    "update:hideBackgroundDots": (value: boolean) => typeof value === "boolean",
    "update:imageMargin": (value: number) => value >= 0,
    "update:imageSize": (value: number) => value > 0,
    "update:logoFile": (value: File | null) => value === null || value.size > 0,
    "update:shapeType": (value: ShapeType) => value.length > 0,
  },
});
</script>
