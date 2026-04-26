<template>
  <aside class="rounded-3xl border border-[var(--color-panel-border)] bg-[color:var(--color-panel)]/80 p-5 shadow-2xl shadow-black/30 md:p-6">
    <div class="rounded-3xl bg-white p-5">
      <div class="relative aspect-square overflow-hidden rounded-2xl">
        <div ref="container" class="flex h-full w-full items-center justify-center [&>canvas]:block [&>canvas]:max-h-full [&>canvas]:max-w-full"></div>
        <p v-if="!hasQr" class="absolute inset-0 grid place-items-center px-6 text-center text-sm leading-6 text-slate-500">Enter a URL to generate a QR code.</p>
      </div>
    </div>
    <p class="mt-4 truncate text-sm leading-6 text-[var(--color-text-muted)]" :title="title">{{ previewUrl }}</p>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "QrPreview",
  props: {
    hasQr: {
      type: Boolean,
      required: true,
    },
    previewUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const container = ref<HTMLElement | null>(null);

    return { container };
  },
});
</script>
