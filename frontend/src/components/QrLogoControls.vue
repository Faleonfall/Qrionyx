<template>
  <div class="grid grid-cols-2 gap-1.5 sm:gap-4 lg:grid-cols-4">
    <div class="block">
      <span
        class="select-none text-[10px] sm:text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Logo</span
      >
      <div
        class="form-control mt-1.5 sm:mt-2 flex h-9 sm:h-11 select-none items-center gap-1.5 sm:gap-2 rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-2 sm:px-3 py-0 text-(--color-text-primary)"
      >
        <label
          class="min-w-0 flex-1 cursor-pointer truncate transition hover:text-(--color-neon-cyan)"
        >
          <input
            class="sr-only"
            type="file"
            accept="image/*"
            @change="emit('update:logoFile', readInputFile($event))"
          />
          Choose
        </label>
        <button
          class="flex shrink-0 cursor-pointer items-center text-(--color-text-muted) transition hover:text-(--color-neon-cyan) disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-(--color-text-muted)"
          type="button"
          title="Clear logo"
          aria-label="Clear logo"
          :disabled="!hasLogo"
          @click="emit('update:logoFile', null)"
        >
          <X :size="16" aria-hidden="true" />
        </button>
      </div>
    </div>

    <QrLogoSizeSlider
      :has-logo="hasLogo"
      :image-size="imageSize"
      :image-size-max-percent="imageSizeMaxPercent"
      :rendered-logo-size="renderedLogoSize"
      @update:image-size="emit('update:imageSize', $event)"
    />

    <FormSelect
      :disabled="!hasLogo"
      :model-value="String(imageMargin)"
      :options="imageMarginOptions"
      label="Logo pad"
      @update:model-value="emit('update:imageMargin', Number($event))"
    />

    <div class="block" :class="{ 'pointer-events-none opacity-40': !hasLogo }">
      <span
        class="select-none text-[10px] sm:text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Logo dots</span
      >
      <label
        class="form-control mt-1.5 sm:mt-2 flex h-9 sm:h-11 cursor-pointer select-none items-center rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-2.5 sm:px-3 py-0 text-(--color-text-primary) transition hover:border-(--color-neon-cyan)"
      >
        <input
          :checked="hideBackgroundDots"
          :disabled="!hasLogo"
          class="peer sr-only"
          type="checkbox"
          @change="emit('update:hideBackgroundDots', readInputChecked($event))"
        />
        <span class="peer-checked:text-(--color-neon-cyan)">Hide</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from "@lucide/vue";
import { readInputChecked, readInputFile } from "../lib/inputEvents";
import { imageMarginOptions } from "../qr/qrSelectOptions";
import FormSelect from "./FormSelect.vue";
import QrLogoSizeSlider from "./QrLogoSizeSlider.vue";

defineProps<{
  hasLogo: boolean;
  hideBackgroundDots: boolean;
  imageMargin: number;
  imageSize: number;
  imageSizeMaxPercent: number;
  renderedLogoSize: string;
}>();

const emit = defineEmits<{
  "update:hideBackgroundDots": [value: boolean];
  "update:imageMargin": [value: number];
  "update:imageSize": [value: number];
  "update:logoFile": [value: File | null];
}>();
</script>
