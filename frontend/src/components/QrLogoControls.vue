<template>
  <div class="grid grid-cols-2 gap-1.5 sm:gap-4 lg:grid-cols-4">
    <div>
      <span class="field-label">Logo</span>
      <div
        class="form-control mt-1.5 sm:mt-2 flex h-9 sm:h-11 select-none items-center gap-1.5 sm:gap-2 rounded-xl border border-line bg-page px-2 sm:px-3 py-0 text-ink"
      >
        <label
          class="min-w-0 flex-1 cursor-pointer truncate transition hover:text-neon-cyan"
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
          class="flex shrink-0 cursor-pointer items-center text-ink-muted transition hover:text-neon-cyan disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-ink-muted"
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

    <div :class="{ 'pointer-events-none opacity-40': !hasLogo }">
      <span class="field-label">Logo dots</span>
      <label
        class="form-control mt-1.5 sm:mt-2 flex h-9 sm:h-11 cursor-pointer select-none items-center rounded-xl border border-line bg-page px-2.5 sm:px-3 py-0 text-ink transition hover:border-neon-cyan"
      >
        <input
          :checked="hideBackgroundDots"
          :disabled="!hasLogo"
          class="peer sr-only"
          type="checkbox"
          @change="emit('update:hideBackgroundDots', readInputChecked($event))"
        />
        <span class="peer-checked:text-neon-cyan">{{
          getLogoDotsLabel(hideBackgroundDots)
        }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from "@lucide/vue";
import { getLogoDotsLabel } from "../lib/formDisplay";
import { readInputChecked, readInputFile } from "../lib/inputEvents";
import { imageMarginOptions } from "../lib/qrSelectOptions";
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
