<template>
  <div class="self-center">
    <div class="relative">
      <div
        v-if="scanStatus !== 'idle'"
        class="absolute -top-10 left-0 right-0 flex justify-center"
      >
        <div
          class="scan-status select-none rounded-xl border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
          :class="scanStatusClass"
        >
          {{ scanStatusLabel }}
        </div>
      </div>
      <aside
        class="rounded-2xl border border-(--color-panel-border) bg-(--color-panel)/80 p-4 shadow-2xl shadow-black/30"
      >
        <div
          class="mx-auto max-w-87.5 p-1.25"
          :class="{ 'transparent-preview': backgroundTransparent }"
          :style="[previewBackgroundStyle, backgroundRoundStyle]"
        >
          <div
            class="relative aspect-square overflow-hidden"
            :style="backgroundRoundStyle"
          >
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
          class="preview-url mt-3 text-sm leading-6 text-(--color-text-muted)"
          :title="title"
        >
          {{ previewUrl }}
        </p>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type PropType } from "vue";
import type { QrScanStatus } from "../qr/scanQr";

export default defineComponent({
  name: "QrPreview",
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    backgroundRound: {
      type: Number,
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
    scanStatus: {
      type: String as PropType<QrScanStatus>,
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
    const backgroundRoundStyle = computed(() => ({
      borderRadius: `${String(props.backgroundRound * 50)}%`,
    }));
    const scanStatusLabel = computed(() => {
      if (props.scanStatus === "checking") {
        return "Checking";
      }

      return props.scanStatus === "scannable"
        ? "✓ Scannable"
        : "✕ Low confidence";
    });
    const scanStatusClass = computed(() => {
      if (props.scanStatus === "scannable") {
        return "border-(--color-status-success) bg-(--color-status-success)/15 text-(--color-status-success)";
      }

      if (props.scanStatus === "checking") {
        return "border-(--color-panel-border) bg-(--color-panel)/80 text-(--color-text-muted)";
      }

      return "border-(--color-neon-pink) bg-(--color-neon-pink)/15 text-(--color-neon-pink)";
    });

    return {
      backgroundRoundStyle,
      container,
      previewBackgroundStyle,
      scanStatusClass,
      scanStatusLabel,
    };
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

.preview-url {
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
}
</style>
