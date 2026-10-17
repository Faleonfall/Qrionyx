<template>
  <div :class="{ 'pointer-events-none opacity-40': disabled }">
    <span class="field-label">{{ label }}</span>
    <span class="relative mt-1 sm:mt-2 block">
      <select
        :disabled="disabled"
        :value="modelValue"
        class="form-control h-9 sm:h-11 w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-line bg-page py-0 pr-6 pl-2 sm:pr-8 sm:pl-3 text-ink outline-none transition focus:border-neon-cyan"
        @change="emit('update:modelValue', readInputValue($event))"
      >
        <slot>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </slot>
      </select>
      <span
        class="pointer-events-none absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 select-none text-[8px] sm:text-[10px] text-ink-muted"
        aria-hidden="true"
        >▼</span
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import { readInputValue } from "../lib/inputEvents";
import type { SelectOption } from "../lib/qrTypes";

withDefaults(
  defineProps<{
    disabled?: boolean;
    label: string;
    modelValue: string;
    options: SelectOption[];
  }>(),
  { disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>
