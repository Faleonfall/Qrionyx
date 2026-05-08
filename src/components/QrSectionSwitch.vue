<template>
  <div
    class="mt-3 inline-flex rounded-full border border-(--color-panel-border) bg-(--color-cyber-background) p-1"
  >
    <button
      class="form-control cursor-pointer select-none rounded-full px-3 py-1 text-[12px] transition"
      :class="getSectionClass('basic')"
      type="button"
      @click="$emit('update:activeSection', 'basic')"
    >
      Basic
    </button>
    <button
      class="form-control cursor-pointer select-none rounded-full px-3 py-1 text-[12px] transition"
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
import type { FormSection } from "./formTypes";

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
        ? "bg-(--color-neon-cyan) text-(--color-cyber-background)"
        : "text-(--color-text-muted) hover:text-(--color-neon-cyan)";
    }

    return { getSectionClass };
  },
});
</script>
