<template>
  <div class="grid grid-cols-2 gap-1.5 sm:gap-4 lg:grid-cols-4">
    <div class="block">
      <span
        class="select-none text-[10px] sm:text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Corner box</span
      >
      <input
        :value="cornerSquareColor"
        class="color-input mt-1.5 sm:mt-2 h-9 sm:h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1 transition hover:border-(--color-neon-cyan)"
        type="color"
        title="Choose corner square color"
        @change="emit('update:cornerSquareColor', readInputValue($event))"
      />
    </div>
    <div class="block">
      <span
        class="select-none text-[10px] sm:text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Corner dot</span
      >
      <input
        :value="cornerDotColor"
        class="color-input mt-1.5 sm:mt-2 h-9 sm:h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1 transition hover:border-(--color-neon-cyan)"
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
    <div
      class="block"
      :class="{ 'pointer-events-none opacity-40': dotsGradientType === 'none' }"
    >
      <span
        class="select-none text-[10px] sm:text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >From</span
      >
      <input
        :value="dotsGradientStartColor"
        class="color-input mt-1.5 sm:mt-2 h-9 sm:h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1 transition hover:border-(--color-neon-cyan) disabled:cursor-not-allowed disabled:opacity-45"
        type="color"
        title="Choose gradient start color"
        :disabled="dotsGradientType === 'none'"
        @change="emit('update:dotsGradientStartColor', readInputValue($event))"
      />
    </div>
    <div
      class="block"
      :class="{ 'pointer-events-none opacity-40': dotsGradientType === 'none' }"
    >
      <span
        class="select-none text-[10px] sm:text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >To</span
      >
      <input
        :value="dotsGradientEndColor"
        class="color-input mt-1.5 sm:mt-2 h-9 sm:h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1 transition hover:border-(--color-neon-cyan) disabled:cursor-not-allowed disabled:opacity-45"
        type="color"
        title="Choose gradient end color"
        :disabled="dotsGradientType === 'none'"
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
} from "../qr/qrSelectOptions";
import type { GradientMode } from "../qr/qrTypes";
import FormSelect from "./FormSelect.vue";

defineProps<{
  backgroundRound: number;
  cornerDotColor: string;
  cornerSquareColor: string;
  dotsGradientEndColor: string;
  dotsGradientStartColor: string;
  dotsGradientType: GradientMode;
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
