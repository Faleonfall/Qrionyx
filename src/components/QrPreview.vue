<template>
  <aside
    class="rounded-2xl border border-(--color-panel-border) bg-(--color-panel)/80 p-4 shadow-2xl shadow-black/30"
  >
    <div class="rounded-2xl bg-white p-1.25">
      <div class="relative aspect-square overflow-hidden rounded-xl">
        <div
          ref="container"
          class="flex h-full w-full items-center justify-center [&>canvas]:block [&>canvas]:max-h-full [&>canvas]:max-w-full"
        ></div>
        <p
          v-if="!hasQr"
          class="absolute inset-0 grid select-none place-items-center px-5 text-center text-sm leading-6 text-slate-500"
        >
          Enter a URL to generate a QR code.
        </p>
      </div>
    </div>
    <p
      class="mt-3 truncate text-sm leading-6 text-(--color-text-muted)"
      :title="title"
    >
      {{ previewUrl }}
    </p>
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
