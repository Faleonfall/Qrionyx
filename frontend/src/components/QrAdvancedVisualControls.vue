<template>
  <div class="grid grid-cols-2 gap-1.5 sm:gap-4 lg:grid-cols-4">
    <div>
      <span class="field-label">Corner box</span>
      <input
        :value="cornerSquareColor"
        class="color-input color-field mt-1.5 sm:mt-2 w-full"
        type="color"
        title="Choose corner square color"
        @change="emit('update:cornerSquareColor', readInputValue($event))"
      />
    </div>
    <div>
      <span class="field-label">Corner dot</span>
      <input
        :value="cornerDotColor"
        class="color-input color-field mt-1.5 sm:mt-2 w-full"
        type="color"
        title="Choose corner dot color"
        @change="emit('update:cornerDotColor', readInputValue($event))"
      />
    </div>
    <FormSelect
      :model-value="shapeType"
      :options="shapeOptions"
      label="Shape"
      @update:model-value="emit('update:shapeType', $event as ShapeType)"
    />
    <FormSelect
      :model-value="String(backgroundRound)"
      :options="backgroundRoundOptions"
      label="Bg round"
      @update:model-value="emit('update:backgroundRound', Number($event))"
    />
  </div>

  <div class="mt-1.5 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-4 lg:grid-cols-4">
    <FormSelect
      :model-value="dotsGradientType"
      :options="gradientOptions"
      label="Gradient"
      @update:model-value="
        emit('update:dotsGradientType', $event as GradientMode)
      "
    />
    <div :class="{ 'pointer-events-none opacity-40': !hasDotsGradient }">
      <span class="field-label">From</span>
      <input
        :value="dotsGradientStartColor"
        class="color-input color-field mt-1.5 sm:mt-2 w-full"
        type="color"
        title="Choose gradient start color"
        :disabled="!hasDotsGradient"
        @change="emit('update:dotsGradientStartColor', readInputValue($event))"
      />
    </div>
    <div :class="{ 'pointer-events-none opacity-40': !hasDotsGradient }">
      <span class="field-label">To</span>
      <input
        :value="dotsGradientEndColor"
        class="color-input color-field mt-1.5 sm:mt-2 w-full"
        type="color"
        title="Choose gradient end color"
        :disabled="!hasDotsGradient"
        @change="emit('update:dotsGradientEndColor', readInputValue($event))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShapeType } from "qr-code-styling";
import { readInputValue } from "../lib/inputEvents";
import {
  backgroundRoundOptions,
  gradientOptions,
  shapeOptions,
} from "../lib/qrSelectOptions";
import type { GradientMode } from "../lib/qrTypes";
import FormSelect from "./FormSelect.vue";

defineProps<{
  backgroundRound: number;
  cornerDotColor: string;
  cornerSquareColor: string;
  dotsGradientEndColor: string;
  dotsGradientStartColor: string;
  dotsGradientType: GradientMode;
  hasDotsGradient: boolean;
  shapeType: ShapeType;
}>();

const emit = defineEmits<{
  "update:backgroundRound": [value: number];
  "update:cornerDotColor": [value: string];
  "update:cornerSquareColor": [value: string];
  "update:dotsGradientEndColor": [value: string];
  "update:dotsGradientStartColor": [value: string];
  "update:dotsGradientType": [value: GradientMode];
  "update:shapeType": [value: ShapeType];
}>();
</script>
