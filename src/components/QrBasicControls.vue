<template>
  <div class="mt-3 grid grid-cols-4 gap-4">
    <FormSelect
      :model-value="dotType"
      :options="dotOptions"
      label="Style"
      @update:model-value="emitDotType"
    />
    <FormSelect
      :model-value="errorCorrectionLevel"
      :options="errorCorrectionOptions"
      label="Correction"
      @update:model-value="emitErrorCorrectionLevel"
    />
    <FormSelect
      :model-value="marginLevel"
      :options="marginOptions"
      label="Margin"
      @update:model-value="emitMarginLevel"
    />
    <FormSelect
      :model-value="cornerType"
      :options="cornerOptions"
      label="Corners"
      @update:model-value="emitCornerType"
    />
  </div>

  <div class="mt-3 grid grid-cols-2 gap-4">
    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >QR Color</span
      >
      <input
        :value="qrColor"
        class="color-input mt-2 h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1"
        type="color"
        title="Choose QR color"
        @change="emitQrColor"
      />
    </label>

    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Background</span
      >
      <div class="mt-2 flex gap-2">
        <input
          :value="backgroundColor"
          class="color-input h-11 min-w-0 flex-1 cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1 disabled:cursor-not-allowed disabled:opacity-45"
          type="color"
          title="Choose background color"
          :disabled="backgroundTransparent"
          @change="emitBackgroundColor"
        />
        <label
          class="form-control flex h-11 cursor-pointer select-none items-center rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-3 text-(--color-text-primary) transition hover:border-(--color-neon-cyan)"
        >
          <input
            :checked="backgroundTransparent"
            class="peer sr-only"
            type="checkbox"
            @change="emitBackgroundTransparent"
          />
          <span class="peer-checked:text-(--color-neon-cyan)">Clear</span>
        </label>
      </div>
    </label>
  </div>

  <div class="mt-3 grid grid-cols-2 gap-4">
    <FormSelect
      :model-value="String(exportSize)"
      :options="exportSizeOptions"
      label="Size"
      @update:model-value="emitExportSize"
    />
    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Filename</span
      >
      <input
        :value="filename"
        class="form-control mt-2 h-11 w-full rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-4 py-0 text-(--color-text-primary) outline-none transition focus:border-(--color-neon-cyan)"
        type="text"
        autocomplete="off"
        placeholder="qr"
        @input="emitFilename"
      />
    </label>
  </div>
</template>

<script lang="ts">
import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
} from "qr-code-styling";
import { defineComponent, type PropType } from "vue";
import {
  cornerOptions,
  dotOptions,
  errorCorrectionOptions,
  exportSizeOptions,
  marginOptions,
} from "../qr/qrSelectOptions";
import type { ExportSize, MarginLevel } from "../qr/qrTypes";
import FormSelect from "./FormSelect.vue";

export default defineComponent({
  name: "QrBasicControls",
  components: { FormSelect },
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    backgroundTransparent: {
      type: Boolean,
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
    marginLevel: {
      type: String as PropType<MarginLevel>,
      required: true,
    },
    qrColor: {
      type: String,
      required: true,
    },
  },
  emits: {
    "update:backgroundColor": (value: string) => value.length > 0,
    "update:backgroundTransparent": (value: boolean) =>
      typeof value === "boolean",
    "update:cornerType": (value: CornerSquareType) => value.length > 0,
    "update:dotType": (value: DotType) => value.length > 0,
    "update:errorCorrectionLevel": (value: ErrorCorrectionLevel) =>
      value.length > 0,
    "update:exportSize": (value: ExportSize) =>
      [512, 1024, 2048].includes(value),
    "update:filename": (value: string) => typeof value === "string",
    "update:marginLevel": (value: MarginLevel) => value.length > 0,
    "update:qrColor": (value: string) => value.length > 0,
  },
  setup(_, { emit }) {
    function getInputValue(event: Event) {
      return event.target instanceof HTMLInputElement
        ? event.target.value.trim()
        : "";
    }

    function emitBackgroundColor(event: Event) {
      emit("update:backgroundColor", getInputValue(event));
    }

    function emitBackgroundTransparent(event: Event) {
      emit(
        "update:backgroundTransparent",
        event.target instanceof HTMLInputElement && event.target.checked,
      );
    }

    function emitCornerType(value: string) {
      emit("update:cornerType", value as CornerSquareType);
    }

    function emitDotType(value: string) {
      emit("update:dotType", value as DotType);
    }

    function emitErrorCorrectionLevel(value: string) {
      emit("update:errorCorrectionLevel", value as ErrorCorrectionLevel);
    }

    function emitExportSize(value: string) {
      emit("update:exportSize", Number(value) as ExportSize);
    }

    function emitFilename(event: Event) {
      emit("update:filename", getInputValue(event));
    }

    function emitMarginLevel(value: string) {
      emit("update:marginLevel", value as MarginLevel);
    }

    function emitQrColor(event: Event) {
      emit("update:qrColor", getInputValue(event));
    }

    return {
      cornerOptions,
      dotOptions,
      emitBackgroundColor,
      emitBackgroundTransparent,
      emitCornerType,
      emitDotType,
      emitErrorCorrectionLevel,
      emitExportSize,
      emitFilename,
      emitMarginLevel,
      emitQrColor,
      errorCorrectionOptions,
      exportSizeOptions,
      marginOptions,
    };
  },
});
</script>

<style scoped>
.color-input {
  overflow: hidden;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: 0;
  border-radius: 0.5rem;
}

.color-input::-moz-color-swatch {
  border: 0;
  border-radius: 0.5rem;
}
</style>
