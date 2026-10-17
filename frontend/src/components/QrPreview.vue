<template>
  <div>
    <div class="relative">
      <!-- Inside the card top on phones, above the card on desktop -->
      <div
        v-if="scanStatus !== 'idle'"
        class="absolute top-2 left-0 right-0 z-10 flex justify-center lg:-top-10"
      >
        <div
          class="select-none rounded-xl border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] lg:py-1 lg:text-[11px]"
          :class="getScanStatusClass(scanStatus)"
        >
          {{ getScanStatusLabel(scanStatus) }}
        </div>
      </div>

      <aside class="panel-card relative p-4 pt-8 lg:pt-4">
        <div
          class="mx-auto max-w-87.5 p-1.25"
          :class="{ 'transparent-preview': backgroundTransparent }"
          :style="{
            backgroundColor: backgroundTransparent
              ? undefined
              : backgroundColor,
            borderRadius: getPreviewRadius(backgroundRound),
          }"
        >
          <div
            class="relative aspect-square overflow-hidden"
            :style="{ borderRadius: getPreviewRadius(backgroundRound) }"
          >
            <div
              ref="container"
              class="preview-qr flex h-full w-full items-center justify-center"
            ></div>
            <p
              v-if="!hasQr"
              class="absolute inset-0 grid select-none place-items-center px-5 text-center text-sm leading-6 text-preview-ink"
            >
              Enter a URL to generate a QR code.
            </p>
          </div>
        </div>
        <p
          class="preview-url mt-3 text-sm leading-6 text-ink-muted"
          :title="title"
        >
          {{ previewUrl }}
        </p>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import {
  getPreviewRadius,
  getScanStatusClass,
  getScanStatusLabel,
} from "../lib/previewDisplay";
import type { QrScanStatus } from "../lib/scanQr";

defineProps<{
  backgroundColor: string;
  backgroundRound: number;
  backgroundTransparent: boolean;
  hasQr: boolean;
  previewUrl: string;
  scanStatus: QrScanStatus;
  title: string;
}>();

const previewContainer = useTemplateRef<HTMLElement>("container");

defineExpose({ container: previewContainer });
</script>
