<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Corner box</span
      >
      <input
        :value="cornerSquareColor"
        class="color-input mt-2 h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1"
        type="color"
        title="Choose corner square color"
        @change="emitCornerSquareColor"
      />
    </label>
    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Corner dot</span
      >
      <input
        :value="cornerDotColor"
        class="color-input mt-2 h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1"
        type="color"
        title="Choose corner dot color"
        @change="emitCornerDotColor"
      />
    </label>
    <FormSelect
      :model-value="shapeType"
      :options="shapeOptions"
      label="Shape"
      @update:model-value="emitShapeType"
    />
    <FormSelect
      :model-value="String(backgroundRound)"
      :options="backgroundRoundOptions"
      label="Bg round"
      @update:model-value="emitBackgroundRound"
    />
  </div>

  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <FormSelect
      :model-value="dotsGradientType"
      :options="gradientOptions"
      label="Gradient"
      @update:model-value="emitDotsGradientType"
    />
    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Gradient from</span
      >
      <input
        :value="dotsGradientStartColor"
        class="color-input mt-2 h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1 disabled:cursor-not-allowed disabled:opacity-45"
        type="color"
        title="Choose gradient start color"
        :disabled="dotsGradientType === 'none'"
        @change="emitDotsGradientStartColor"
      />
    </label>
    <label class="block">
      <span
        class="select-none text-xs uppercase tracking-[0.18em] text-(--color-text-muted)"
        >Gradient to</span
      >
      <input
        :value="dotsGradientEndColor"
        class="color-input mt-2 h-11 w-full cursor-pointer rounded-xl border border-(--color-panel-border) bg-(--color-cyber-background) p-1 disabled:cursor-not-allowed disabled:opacity-45"
        type="color"
        title="Choose gradient end color"
        :disabled="dotsGradientType === 'none'"
        @change="emitDotsGradientEndColor"
      />
    </label>
  </div>
</template>

<script lang="ts">
import type { ShapeType } from "qr-code-styling";
import { defineComponent, type PropType } from "vue";
import { gradientOptions, shapeOptions } from "../qr/qrSelectOptions";
import type { GradientMode } from "../qr/qrTypes";
import { backgroundRoundOptions } from "./controlOptions";
import FormSelect from "./FormSelect.vue";

export default defineComponent({
  name: "QrAdvancedVisualControls",
  components: { FormSelect },
  props: {
    backgroundRound: {
      type: Number,
      required: true,
    },
    cornerDotColor: {
      type: String,
      required: true,
    },
    cornerSquareColor: {
      type: String,
      required: true,
    },
    dotsGradientEndColor: {
      type: String,
      required: true,
    },
    dotsGradientStartColor: {
      type: String,
      required: true,
    },
    dotsGradientType: {
      type: String as PropType<GradientMode>,
      required: true,
    },
    shapeType: {
      type: String as PropType<ShapeType>,
      required: true,
    },
  },
  emits: {
    "update:backgroundRound": (value: number) => value >= 0,
    "update:cornerDotColor": (value: string) => value.length > 0,
    "update:cornerSquareColor": (value: string) => value.length > 0,
    "update:dotsGradientEndColor": (value: string) => value.length > 0,
    "update:dotsGradientStartColor": (value: string) => value.length > 0,
    "update:dotsGradientType": (value: GradientMode) => value.length > 0,
    "update:shapeType": (value: ShapeType) => value.length > 0,
  },
  setup(_, { emit }) {
    function getInputValue(event: Event) {
      return event.target instanceof HTMLInputElement
        ? event.target.value.trim()
        : "";
    }

    function emitBackgroundRound(value: string) {
      emit("update:backgroundRound", Number(value));
    }

    function emitCornerDotColor(event: Event) {
      emit("update:cornerDotColor", getInputValue(event));
    }

    function emitCornerSquareColor(event: Event) {
      emit("update:cornerSquareColor", getInputValue(event));
    }

    function emitDotsGradientEndColor(event: Event) {
      emit("update:dotsGradientEndColor", getInputValue(event));
    }

    function emitDotsGradientStartColor(event: Event) {
      emit("update:dotsGradientStartColor", getInputValue(event));
    }

    function emitDotsGradientType(value: string) {
      emit("update:dotsGradientType", value as GradientMode);
    }

    function emitShapeType(value: string) {
      emit("update:shapeType", value as ShapeType);
    }

    return {
      backgroundRoundOptions,
      emitBackgroundRound,
      emitCornerDotColor,
      emitCornerSquareColor,
      emitDotsGradientEndColor,
      emitDotsGradientStartColor,
      emitDotsGradientType,
      emitShapeType,
      gradientOptions,
      shapeOptions,
    };
  },
});
</script>

<style scoped>
.color-input {
  overflow: hidden;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: 0;
  border-radius: 0.5rem;
}

.color-input::-moz-color-swatch {
  border: 0;
  border-radius: 0.5rem;
}
</style>
