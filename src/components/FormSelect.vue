<template>
  <label class="block">
    <span
      class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
      >{{ label }}</span
    >
    <span class="relative mt-2 block">
      <select
        :value="modelValue"
        class="w-full min-w-0 appearance-none rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) py-2.5 pr-7.5 pl-2.5 text-[13px] text-(--color-text-primary) outline-none transition focus:border-(--color-neon-cyan)"
        @change="emitValue"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span
        class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 select-none text-[10px] text-(--color-text-muted)"
        aria-hidden="true"
        >▼</span
      >
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
