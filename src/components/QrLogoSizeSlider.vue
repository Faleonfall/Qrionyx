<template>
  <div class="block" :class="{ 'pointer-events-none opacity-40': !hasLogo }">
    <span
      class="block h-6 truncate select-none text-xs uppercase leading-6 tracking-[0.18em] text-(--color-text-muted)"
    >
      Logo size
    </span>
    <div
      class="form-control mt-2 flex h-11 items-center gap-3 rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-3 py-0 text-(--color-text-primary)"
    >
      <div
        ref="logoSlider"
        class="logo-size-slider min-w-0 flex-1 cursor-pointer"
        role="slider"
        :tabindex="hasLogo ? 0 : -1"
        :aria-valuemax="100"
        :aria-valuemin="20"
        :aria-valuenow="imageSizePercent"
        aria-label="Logo size"
        @keydown="emitImageSizeKey"
        @pointerdown="emitImageSizePointer"
      >
        <div class="logo-size-slider-track">
          <div
            class="logo-size-slider-fill"
            :style="{ width: `${String(imageSizeTrackPercent)}%` }"
          ></div>
          <div
            class="logo-size-slider-thumb"
            :style="{ left: `${String(imageSizeTrackPercent)}%` }"
          ></div>
        </div>
      </div>
      <span
        class="w-10 shrink-0 whitespace-nowrap text-right text-[12px]"
        :title="renderedLogoSize"
      >
        {{ imageSizePercent }}%
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

const imageSizeMinPercent = 20;
const imageSizeMaxPercent = 100;

export default defineComponent({
  name: "QrLogoSizeSlider",
  props: {
    hasLogo: {
      type: Boolean,
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
  },
  emits: {
    "update:imageSize": (value: number) => value > 0,
  },
  setup(props, { emit }) {
    const imageSizePercent = computed(() => Math.round(props.imageSize * 100));
    const imageSizeTrackPercent = computed(() => imageSizePercent.value);
    const logoSlider = ref<HTMLElement | null>(null);

    function emitImageSize(nextPercent: number) {
      const clampedPercent = getClampedImageSizePercent(nextPercent);

      if (clampedPercent !== imageSizePercent.value) {
        emit("update:imageSize", clampedPercent / 100);
      }
    }

    function getClampedImageSizePercent(value: number) {
      const steppedValue = Math.round(value / 5) * 5;

      return Math.min(
        Math.max(steppedValue, imageSizeMinPercent),
        props.imageSizeMaxPercent,
      );
    }

    function getPointerPercent(event: PointerEvent) {
      const rect = logoSlider.value?.getBoundingClientRect();

      if (!rect) {
        return imageSizePercent.value;
      }

      return getClampedImageSizePercent(
        ((event.clientX - rect.left) / rect.width) * imageSizeMaxPercent,
      );
    }

    function emitImageSizePointer(event: PointerEvent) {
      const target = event.currentTarget;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      target.setPointerCapture(event.pointerId);
      const move = (moveEvent: PointerEvent) => {
        emitImageSize(getPointerPercent(moveEvent));
      };
      const up = (upEvent: PointerEvent) => {
        if (target.hasPointerCapture(upEvent.pointerId)) {
          target.releasePointerCapture(upEvent.pointerId);
        }
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerup", up);
        target.removeEventListener("pointercancel", up);
      };

      emitImageSize(getPointerPercent(event));
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerup", up);
      target.addEventListener("pointercancel", up);
    }

    function emitImageSizeKey(event: KeyboardEvent) {
      const direction =
        event.key === "ArrowRight" || event.key === "ArrowUp"
          ? 5
          : event.key === "ArrowLeft" || event.key === "ArrowDown"
            ? -5
            : 0;

      if (direction === 0) {
        return;
      }

      event.preventDefault();
      emitImageSize(
        getClampedImageSizePercent(imageSizePercent.value + direction),
      );
    }

    return {
      emitImageSizeKey,
      emitImageSizePointer,
      imageSizePercent,
      imageSizeTrackPercent,
      logoSlider,
    };
  },
});
</script>

<style scoped>
.logo-size-slider {
  align-items: center;
  display: flex;
  height: 100%;
  padding-inline: 0.5rem;
  touch-action: none;
}

.logo-size-slider:focus-visible {
  outline: none;
}

.logo-size-slider:focus-visible .logo-size-slider-fill,
.logo-size-slider:focus-visible .logo-size-slider-thumb {
  background: var(--color-neon-cyan);
}

.logo-size-slider-track {
  background: var(--color-text-muted);
  border-radius: 9999px;
  height: 0.25rem;
  position: relative;
  width: 100%;
}

.logo-size-slider-fill {
  background: #3b82f6;
  border-radius: inherit;
  height: 100%;
}

.logo-size-slider-thumb {
  background: #3b82f6;
  border-radius: 9999px;
  height: 1rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
}
</style>
