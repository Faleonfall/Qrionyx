<template>
  <div
    class="mt-1.5 sm:mt-4 relative grid h-9 sm:h-11 w-44 sm:w-52 grid-cols-2 rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1"
  >
    <!-- Sliding pill background -->
    <div
      class="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-lg bg-(--color-neon-cyan) transition-transform duration-150 ease-out"
      :class="activeSection === 'basic' ? 'translate-x-0' : 'translate-x-full'"
    ></div>

    <button
      class="form-control relative z-10 flex h-full cursor-pointer select-none items-center justify-center rounded-lg border border-transparent text-[11px] sm:text-[12px] transition-colors duration-150"
      :class="getSectionClass('basic')"
      type="button"
      @click="$emit('update:activeSection', 'basic')"
    >
      Basic
    </button>
    <button
      class="form-control relative z-10 flex h-full cursor-pointer select-none items-center justify-center rounded-lg border border-transparent text-[11px] sm:text-[12px] transition-colors duration-150"
      :class="getSectionClass('advanced')"
      type="button"
      @click="$emit('update:activeSection', 'advanced')"
    >
      Advanced
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { FormSection } from "../qr/qrTypes";

export default defineComponent({
  name: "QrSectionSwitch",
  props: {
    activeSection: {
      type: String as PropType<FormSection>,
      required: true,
    },
  },
  emits: {
    "update:activeSection": (value: string) =>
      value === "basic" || value === "advanced",
  },
  setup(props) {
    function getSectionClass(section: FormSection) {
      return props.activeSection === section
        ? "text-(--color-cyber-background) font-bold"
        : "text-(--color-text-muted) hover:text-(--color-neon-cyan)";
    }

    return { getSectionClass };
  },
});
</script>
