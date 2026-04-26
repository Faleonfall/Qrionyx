<template>
  <form class="rounded-3xl border border-[var(--color-panel-border)] bg-[color:var(--color-panel)]/80 p-5 shadow-2xl shadow-black/30 md:p-6" @submit.prevent>
    <label class="block select-none text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]" for="qr-url">URL</label>
    <input
      id="qr-url"
      :value="url"
      class="mt-3 w-full rounded-2xl border border-[var(--color-panel-border)] bg-[var(--color-cyber-background)] px-4 py-4 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-neon-cyan)]"
      type="url"
      inputmode="url"
      autocomplete="url"
      placeholder="https://example.com"
      @input="emitUrl"
    />

    <div class="mt-5 grid gap-4 md:grid-cols-2">
      <FormSelect :model-value="dotType" :options="dotOptions" label="Dots" @update:model-value="emitDotType" />
      <FormSelect :model-value="errorCorrectionLevel" :options="errorCorrectionOptions" label="Correction" @update:model-value="emitErrorCorrectionLevel" />
    </div>

    <div class="mt-5 grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="select-none text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">QR Color</span>
        <input :value="qrColor" class="color-input mt-3 h-14 w-full cursor-pointer rounded-2xl border border-[var(--color-panel-border)] bg-[var(--color-cyber-background)] p-0" type="color" title="Choose QR color" @change="emitQrColor" />
      </label>

      <label class="block">
        <span class="select-none text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Background</span>
        <input :value="backgroundColor" class="color-input mt-3 h-14 w-full cursor-pointer rounded-2xl border border-[var(--color-panel-border)] bg-[var(--color-cyber-background)] p-0" type="color" title="Choose background color" @change="emitBackgroundColor" />
      </label>
    </div>

    <div class="mt-6 flex flex-wrap gap-3">
      <button class="cursor-pointer select-none rounded-full border border-[var(--color-neon-cyan)] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-neon-cyan)] transition hover:bg-[var(--color-neon-cyan)] hover:text-[var(--color-cyber-background)]" type="button" @click="emitButtonAction($event, 'download-png')">
        PNG
      </button>
      <button class="cursor-pointer select-none rounded-full border border-[var(--color-neon-pink)] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-neon-pink)] transition hover:bg-[var(--color-neon-pink)] hover:text-white" type="button" @click="emitButtonAction($event, 'download-svg')">
        SVG
      </button>
      <button class="cursor-pointer select-none rounded-full border border-[var(--color-panel-border)] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition hover:border-[var(--color-neon-cyan)] hover:text-[var(--color-neon-cyan)]" type="button" @click="emitButtonAction($event, 'reset')">
        Reset
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import type { DotType, ErrorCorrectionLevel } from "qr-code-styling";
import { defineComponent, type PropType } from "vue";
import { dotOptions, errorCorrectionOptions } from "../qr/config";
import FormSelect from "./FormSelect.vue";

type ButtonAction = "download-png" | "download-svg" | "reset";

export default defineComponent({
  name: "QrForm",
  components: { FormSelect },
  props: {
    backgroundColor: {
      type: String,
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
    qrColor: {
      type: String,
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
    reset: null,
    "update:backgroundColor": (value: string) => value.length > 0,
    "update:dotType": (value: DotType) => value.length > 0,
    "update:errorCorrectionLevel": (value: ErrorCorrectionLevel) => value.length > 0,
    "update:qrColor": (value: string) => value.length > 0,
    "update:url": (value: string) => typeof value === "string",
  },
  setup(_, { emit }) {
    function getInputValue(event: Event) {
      return event.target instanceof HTMLInputElement ? event.target.value.trim() : "";
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

    function emitErrorCorrectionLevel(value: string) {
      emit("update:errorCorrectionLevel", value as ErrorCorrectionLevel);
    }

    function emitButtonAction(event: MouseEvent, action: ButtonAction) {
      if (event.currentTarget instanceof HTMLButtonElement) {
        event.currentTarget.blur();
      }

      emit(action);
    }

    return {
      dotOptions,
      emitButtonAction,
      emitBackgroundColor,
      emitDotType,
      emitErrorCorrectionLevel,
      emitQrColor,
      emitUrl,
      errorCorrectionOptions,
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
  border-radius: 1rem;
}

.color-input::-moz-color-swatch {
  border: 0;
  border-radius: 1rem;
}
</style>
