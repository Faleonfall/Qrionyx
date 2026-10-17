<template>
  <span class="field-label block">URL</span>
  <input
    id="qr-url"
    :value="url"
    class="form-control mt-1.5 sm:mt-2 h-9 sm:h-11 w-full rounded-xl border border-line bg-page px-3 sm:px-4 py-0 text-ink outline-none transition focus:border-neon-cyan"
    type="url"
    inputmode="url"
    autocomplete="url"
    placeholder="https://example.com"
    @input="emit('update:url', readInputValue($event))"
  />
</template>

<script setup lang="ts">
import { readInputValue } from "../lib/inputEvents";

defineProps<{ url: string }>();

const emit = defineEmits<{ "update:url": [value: string] }>();
</script>
