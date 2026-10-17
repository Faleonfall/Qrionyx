<template>
  <div class="mt-1.5 sm:mt-4 space-y-1.5 sm:space-y-4">
    <QrLogoControls
      :has-logo="hasLogo"
      :hide-background-dots="hideBackgroundDots"
      :image-margin="imageMargin"
      :image-size="imageSize"
      :image-size-max-percent="imageSizeMaxPercent"
      :rendered-logo-size="renderedLogoSize"
      @update:hide-background-dots="emit('update:hideBackgroundDots', $event)"
      @update:image-margin="emit('update:imageMargin', $event)"
      @update:image-size="emit('update:imageSize', $event)"
      @update:logo-file="emit('update:logoFile', $event)"
    />

    <QrAdvancedVisualControls
      :background-round="backgroundRound"
      :corner-dot-color="cornerDotColor"
      :corner-square-color="cornerSquareColor"
      :dots-gradient-end-color="dotsGradientEndColor"
      :dots-gradient-start-color="dotsGradientStartColor"
      :dots-gradient-type="dotsGradientType"
      :has-dots-gradient="hasDotsGradient"
      :shape-type="shapeType"
      @update:background-round="emit('update:backgroundRound', $event)"
      @update:corner-dot-color="emit('update:cornerDotColor', $event)"
      @update:corner-square-color="emit('update:cornerSquareColor', $event)"
      @update:dots-gradient-end-color="
        emit('update:dotsGradientEndColor', $event)
      "
      @update:dots-gradient-start-color="
        emit('update:dotsGradientStartColor', $event)
      "
      @update:dots-gradient-type="emit('update:dotsGradientType', $event)"
      @update:shape-type="emit('update:shapeType', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ShapeType } from "qr-code-styling";
import type { GradientMode } from "../lib/qrTypes";
import QrAdvancedVisualControls from "./QrAdvancedVisualControls.vue";
import QrLogoControls from "./QrLogoControls.vue";

defineProps<{
  backgroundRound: number;
  cornerDotColor: string;
  cornerSquareColor: string;
  dotsGradientEndColor: string;
  dotsGradientStartColor: string;
  dotsGradientType: GradientMode;
  hasDotsGradient: boolean;
  hasLogo: boolean;
  hideBackgroundDots: boolean;
  imageMargin: number;
  imageSize: number;
  imageSizeMaxPercent: number;
  renderedLogoSize: string;
  shapeType: ShapeType;
}>();

const emit = defineEmits<{
  "update:backgroundRound": [value: number];
  "update:cornerDotColor": [value: string];
  "update:cornerSquareColor": [value: string];
  "update:dotsGradientEndColor": [value: string];
  "update:dotsGradientStartColor": [value: string];
  "update:dotsGradientType": [value: GradientMode];
  "update:hideBackgroundDots": [value: boolean];
  "update:imageMargin": [value: number];
  "update:imageSize": [value: number];
  "update:logoFile": [value: File | null];
  "update:shapeType": [value: ShapeType];
}>();
</script>
