<template>
  <label class="block">
    <span class="text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">{{ label }}</span>
    <span class="relative mt-3 block">
      <select
        :value="modelValue"
        class="w-full appearance-none rounded-2xl border border-[var(--color-panel-border)] bg-[var(--color-cyber-background)] py-4 pr-12 pl-4 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-neon-cyan)]"
        @change="emitValue"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <span class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-[var(--color-text-muted)]">▼</span>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { SelectOption } from "../qr/config";

export default defineComponent({
  name: "FormSelect",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
  },
  emits: {
    "update:modelValue": (value: string) => value.length > 0,
  },
  setup(_, { emit }) {
    function emitValue(event: Event) {
      if (event.target instanceof HTMLSelectElement) {
        emit("update:modelValue", event.target.value);
      }
    }

    return { emitValue };
  },
});
</script>
