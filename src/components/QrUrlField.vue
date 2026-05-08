<template>
  <label
    class="block select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
    for="qr-url"
    >URL</label
  >
  <input
    id="qr-url"
    :value="url"
    class="form-control mt-2 h-11 w-full rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) px-4 py-0 text-(--color-text-primary) outline-none transition focus:border-(--color-neon-cyan)"
    type="url"
    inputmode="url"
    autocomplete="url"
    placeholder="https://example.com"
    @input="emitUrl"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QrUrlField",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  emits: {
    "update:url": (value: string) => typeof value === "string",
  },
  setup(_, { emit }) {
    function emitUrl(event: Event) {
      emit(
        "update:url",
        event.target instanceof HTMLInputElement
          ? event.target.value.trim()
          : "",
      );
    }

    return { emitUrl };
  },
});
</script>
