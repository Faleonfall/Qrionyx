<template>
  <aside
    class="rounded-2xl border border-(--color-panel-border) bg-(--color-panel)/80 p-4 shadow-2xl shadow-black/30"
  >
    <div
      class="mx-auto max-w-[350px] rounded-2xl p-1.25"
      :class="{ 'transparent-preview': backgroundTransparent }"
      :style="previewBackgroundStyle"
    >
      <div class="relative aspect-square overflow-hidden rounded-xl">
        <div
          ref="container"
          class="preview-qr flex h-full w-full items-center justify-center"
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
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "QrPreview",
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    backgroundTransparent: {
      type: Boolean,
      required: true,
    },
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
  setup(props) {
    const container = ref<HTMLElement | null>(null);
    const previewBackgroundStyle = computed(() => ({
      backgroundColor: props.backgroundTransparent
        ? undefined
        : props.backgroundColor,
    }));

    return { container, previewBackgroundStyle };
  },
});
</script>

<style scoped>
.transparent-preview {
  background-color: #ffffff;
  background-image:
    linear-gradient(45deg, #d6dfef 25%, transparent 25%),
    linear-gradient(-45deg, #d6dfef 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #d6dfef 75%),
    linear-gradient(-45deg, transparent 75%, #d6dfef 75%);
  background-position:
    0 0,
    0 8px,
    8px -8px,
    -8px 0;
  background-size: 16px 16px;
}

.preview-qr :deep(canvas),
.preview-qr :deep(svg) {
  display: block;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  width: 100%;
}
</style>
