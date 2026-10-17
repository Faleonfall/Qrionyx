<template>
  <div :class="{ 'pointer-events-none opacity-40': !hasLogo }">
    <span class="field-label block h-5 sm:h-6 truncate leading-5 sm:leading-6">
      Logo size
    </span>
    <div
      class="form-control mt-1.5 sm:mt-2 flex h-9 sm:h-11 items-center gap-2 sm:gap-3 rounded-xl border border-line bg-page px-2 sm:px-3 py-0 text-ink"
    >
      <div
        ref="logoSlider"
        class="logo-size-slider min-w-0 flex-1 cursor-pointer"
        role="slider"
        :tabindex="hasLogo ? 0 : -1"
        :aria-valuemax="imageSizeMaxPercent"
        :aria-valuemin="minimumLogoPercent"
        :aria-valuenow="imageSizePercent"
        aria-label="Logo size"
        @keydown="onKeyDown"
        @pointerdown="onPointerDown"
      >
        <div class="logo-size-slider-track">
          <div
            class="logo-size-slider-fill"
            :style="{ width: `${String(imageSizePercent)}%` }"
          ></div>
          <div
            class="logo-size-slider-thumb"
            :style="{ left: `${String(imageSizePercent)}%` }"
          ></div>
        </div>
      </div>
      <span
        class="w-8 sm:w-10 shrink-0 whitespace-nowrap text-right text-[10px] sm:text-[12px]"
        :title="renderedLogoSize"
      >
        {{ imageSizePercent }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogoSlider } from "../composables/useLogoSlider";
import { minimumLogoPercent } from "../lib/logoSizeLimit";

const props = defineProps<{
  hasLogo: boolean;
  imageSize: number;
  imageSizeMaxPercent: number;
  renderedLogoSize: string;
}>();

const emit = defineEmits<{ "update:imageSize": [value: number] }>();

const { imageSizePercent, onKeyDown, onPointerDown } = useLogoSlider({
  imageSize: () => props.imageSize,
  maxPercent: () => props.imageSizeMaxPercent,
  onChange: (imageSize) => {
    emit("update:imageSize", imageSize);
  },
});
</script>
