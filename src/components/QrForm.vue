<template>
  <form
    class="rounded-2xl border border-(--color-panel-border) bg-(--color-panel)/80 p-4 shadow-2xl shadow-black/30"
    @submit.prevent
  >
    <label
      class="block select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
      for="qr-url"
      >URL</label
    >
    <input
      id="qr-url"
      :value="url"
      class="mt-2 w-full rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-3 py-2.5 text-[13px] text-(--color-text-primary) outline-none transition focus:border-(--color-neon-cyan)"
      type="url"
      inputmode="url"
      autocomplete="url"
      placeholder="https://example.com"
      @input="emitUrl"
    />

    <div class="mt-3 grid grid-cols-4 gap-3">
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

    <div class="mt-3 grid grid-cols-2 gap-3">
      <label class="block">
        <span
          class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
          >QR Color</span
        >
        <input
          :value="qrColor"
          class="color-input mt-2 h-10 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1"
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
        <input
          :value="backgroundColor"
          class="color-input mt-2 h-10 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1"
          type="color"
          title="Choose background color"
          @change="emitBackgroundColor"
        />
      </label>
    </div>

    <div class="mt-3 grid grid-cols-2 gap-3">
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
          class="mt-2 w-full rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-3 py-2.5 text-[13px] text-(--color-text-primary) outline-none transition focus:border-(--color-neon-cyan)"
          type="text"
          autocomplete="off"
          placeholder="qr"
          @input="emitFilename"
        />
      </label>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap gap-2">
        <button
          class="cursor-pointer select-none rounded-full border border-(--color-neon-cyan) px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-neon-cyan) transition hover:bg-(--color-neon-cyan) hover:text-(--color-cyber-background) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--color-neon-cyan)"
          type="button"
          :disabled="!canDownload"
          @click="emitButtonAction($event, 'download-png')"
        >
          PNG
        </button>
        <button
          class="cursor-pointer select-none rounded-full border border-(--color-text-primary) px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-text-primary) transition hover:bg-(--color-text-primary) hover:text-(--color-cyber-background) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--color-text-primary)"
          type="button"
          :disabled="!canDownload"
          @click="emitButtonAction($event, 'download-webp')"
        >
          WEBP
        </button>
        <button
          class="cursor-pointer select-none rounded-full border border-(--color-neon-pink) px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-neon-pink) transition hover:bg-(--color-neon-pink) hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--color-neon-pink)"
          type="button"
          :disabled="!canDownload"
          @click="emitButtonAction($event, 'download-svg')"
        >
          SVG
        </button>
      </div>
      <button
        class="cursor-pointer select-none rounded-full border border-(--color-panel-border) px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted) transition hover:border-(--color-neon-cyan) hover:text-(--color-neon-cyan)"
        type="button"
        @click="emitButtonAction($event, 'reset')"
      >
        Reset
      </button>
    </div>
  </form>
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
  type ExportSize,
  type MarginLevel,
} from "../qr/config";
import FormSelect from "./FormSelect.vue";

type ButtonAction = "download-png" | "download-svg" | "download-webp" | "reset";

export default defineComponent({
  name: "QrForm",
  components: { FormSelect },
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    canDownload: {
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
    qrColor: {
      type: String,
      required: true,
    },
    marginLevel: {
      type: String as PropType<MarginLevel>,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  emits: {
    "download-png": null,
    "download-svg": null,
    "download-webp": null,
    reset: null,
    "update:backgroundColor": (value: string) => value.length > 0,
    "update:cornerType": (value: CornerSquareType) => value.length > 0,
    "update:dotType": (value: DotType) => value.length > 0,
    "update:errorCorrectionLevel": (value: ErrorCorrectionLevel) =>
      value.length > 0,
    "update:exportSize": (value: ExportSize) =>
      [512, 1024, 2048].includes(value),
    "update:filename": (value: string) => typeof value === "string",
    "update:marginLevel": (value: MarginLevel) => value.length > 0,
    "update:qrColor": (value: string) => value.length > 0,
    "update:url": (value: string) => typeof value === "string",
  },
  setup(_, { emit }) {
    function getInputValue(event: Event) {
      return event.target instanceof HTMLInputElement
        ? event.target.value.trim()
        : "";
    }

    function emitUrl(event: Event) {
      emit("update:url", getInputValue(event));
    }

    function emitQrColor(event: Event) {
      emit("update:qrColor", getInputValue(event));
    }

    function emitBackgroundColor(event: Event) {
      emit("update:backgroundColor", getInputValue(event));
    }

    function emitDotType(value: string) {
      emit("update:dotType", value as DotType);
    }

    function emitCornerType(value: string) {
      emit("update:cornerType", value as CornerSquareType);
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

    function emitButtonAction(event: MouseEvent, action: ButtonAction) {
      if (event.currentTarget instanceof HTMLButtonElement) {
        event.currentTarget.blur();
      }

      if (action === "download-png") {
        emit("download-png");
      } else if (action === "download-svg") {
        emit("download-svg");
      } else if (action === "download-webp") {
        emit("download-webp");
      } else {
        emit("reset");
      }
    }

    return {
      cornerOptions,
      dotOptions,
      emitButtonAction,
      emitBackgroundColor,
      emitCornerType,
      emitDotType,
      emitErrorCorrectionLevel,
      emitExportSize,
      emitFilename,
      emitMarginLevel,
      emitQrColor,
      emitUrl,
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
