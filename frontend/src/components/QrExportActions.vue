<template>
  <div class="mt-3.5 sm:mt-4 flex items-center justify-between gap-1 sm:gap-2">
    <div class="flex gap-1 sm:gap-2">
      <button
        class="export-btn border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-page disabled:hover:text-neon-cyan"
        type="button"
        :disabled="!canDownload"
        @click="emit('download-png')"
      >
        PNG
      </button>
      <button
        class="export-btn border-ink text-ink hover:bg-ink hover:text-page disabled:hover:text-ink"
        type="button"
        :disabled="!canDownload"
        @click="emit('download-webp')"
      >
        WEBP
      </button>
      <button
        class="export-btn border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-on-accent disabled:hover:text-neon-pink"
        type="button"
        :disabled="!canDownload"
        @click="emit('download-svg')"
      >
        SVG
      </button>
    </div>
    <button
      class="export-btn border-line text-ink-muted hover:border-neon-cyan hover:text-neon-cyan"
      type="button"
      @click="emit('reset')"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ canDownload: boolean }>();

const emit = defineEmits<{
  "download-png": [];
  "download-svg": [];
  "download-webp": [];
  reset: [];
}>();
</script>
