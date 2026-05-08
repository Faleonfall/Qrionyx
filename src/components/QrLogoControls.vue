<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <div class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Logo</span
      >
      <div
        class="form-control mt-2 flex h-11 select-none items-center gap-2 rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-3 py-0 text-(--color-text-primary)"
      >
        <label
          class="min-w-0 flex-1 cursor-pointer truncate transition hover:text-(--color-neon-cyan)"
        >
          <input
            class="sr-only"
            type="file"
            accept="image/*"
            @change="emitLogoFile"
          />
          Choose
        </label>
        <button
          class="cursor-pointer text-[12px] text-(--color-text-muted) transition hover:text-(--color-neon-cyan) disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-(--color-text-muted)"
          type="button"
          :disabled="!hasLogo"
          @click="emitRemoveLogo"
        >
          Clear
        </button>
      </div>
    </div>

    <QrLogoSizeSlider
      :image-size="imageSize"
      :image-size-max-percent="imageSizeMaxPercent"
      :rendered-logo-size="renderedLogoSize"
      @update:image-size="emitImageSize"
    />

    <FormSelect
      :model-value="String(imageMargin)"
      :options="imageMarginOptions"
      label="Logo pad"
      @update:model-value="emitImageMargin"
    />

    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Logo dots</span
      >
      <label
        class="form-control mt-2 flex h-11 cursor-pointer select-none items-center rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-3 py-0 text-(--color-text-primary) transition hover:border-(--color-neon-cyan)"
      >
        <input
          :checked="hideBackgroundDots"
          class="peer sr-only"
          type="checkbox"
          @change="emitHideBackgroundDots"
        />
        <span class="peer-checked:text-(--color-neon-cyan)">Hide</span>
      </label>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { imageMarginOptions } from "./controlOptions";
import FormSelect from "./FormSelect.vue";
import QrLogoSizeSlider from "./QrLogoSizeSlider.vue";

export default defineComponent({
  name: "QrLogoControls",
  components: { FormSelect, QrLogoSizeSlider },
  props: {
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
  },
  emits: {
    "update:hideBackgroundDots": (value: boolean) => typeof value === "boolean",
    "update:imageMargin": (value: number) => value >= 0,
    "update:imageSize": (value: number) => value > 0,
    "update:logoFile": (value: File | null) => value === null || value.size > 0,
  },
  setup(_, { emit }) {
    function emitLogoFile(event: Event) {
      const file =
        event.target instanceof HTMLInputElement
          ? event.target.files?.[0] || null
          : null;
      emit("update:logoFile", file);
    }

    function emitRemoveLogo() {
      emit("update:logoFile", null);
    }

    function emitHideBackgroundDots(event: Event) {
      emit(
        "update:hideBackgroundDots",
        event.target instanceof HTMLInputElement && event.target.checked,
      );
    }

    function emitImageMargin(value: string) {
      emit("update:imageMargin", Number(value));
    }

    function emitImageSize(value: number) {
      emit("update:imageSize", value);
    }

    return {
      emitHideBackgroundDots,
      emitImageMargin,
      emitImageSize,
      emitLogoFile,
      emitRemoveLogo,
      imageMarginOptions,
    };
  },
});
</script>
