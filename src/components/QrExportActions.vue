<template>
  <div class="mt-4 flex flex-wrap items-center justify-between gap-2">
    <div class="flex flex-wrap gap-2">
      <button
        class="flex h-11 cursor-pointer select-none items-center rounded-xl border border-(--color-neon-cyan) px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-neon-cyan) transition hover:bg-(--color-neon-cyan) hover:text-(--color-cyber-background) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--color-neon-cyan)"
        type="button"
        :disabled="!canDownload"
        @click="emitButtonAction($event, 'download-png')"
      >
        PNG
      </button>
      <button
        class="flex h-11 cursor-pointer select-none items-center rounded-xl border border-(--color-text-primary) px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-text-primary) transition hover:bg-(--color-text-primary) hover:text-(--color-cyber-background) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--color-text-primary)"
        type="button"
        :disabled="!canDownload"
        @click="emitButtonAction($event, 'download-webp')"
      >
        WEBP
      </button>
      <button
        class="flex h-11 cursor-pointer select-none items-center rounded-xl border border-(--color-neon-pink) px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-neon-pink) transition hover:bg-(--color-neon-pink) hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--color-neon-pink)"
        type="button"
        :disabled="!canDownload"
        @click="emitButtonAction($event, 'download-svg')"
      >
        SVG
      </button>
    </div>
    <button
      class="flex h-11 cursor-pointer select-none items-center rounded-xl border border-(--color-panel-border) px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted) transition hover:border-(--color-neon-cyan) hover:text-(--color-neon-cyan)"
      type="button"
      @click="emitButtonAction($event, 'reset')"
    >
      Reset
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type ButtonAction = "download-png" | "download-svg" | "download-webp" | "reset";

export default defineComponent({
  name: "QrExportActions",
  props: {
    canDownload: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    "download-png": null,
    "download-svg": null,
    "download-webp": null,
    reset: null,
  },
  setup(_, { emit }) {
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

    return { emitButtonAction };
  },
});
</script>
