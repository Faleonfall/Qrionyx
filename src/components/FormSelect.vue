<template>
  <div class="block" :class="{ 'pointer-events-none opacity-40': disabled }">
    <span
      class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
      >{{ label }}</span
    >
    <span class="relative mt-2 block">
      <select
        :disabled="disabled"
        :value="modelValue"
        class="form-control h-11 w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) py-0 pr-8 pl-3 text-(--color-text-primary) outline-none transition focus:border-(--color-neon-cyan)"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { SelectOption } from "../qr/qrTypes";

export default defineComponent({
  name: "FormSelect",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
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
