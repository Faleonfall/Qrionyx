<template>
  <div>
    <div
      class="mt-1.5 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1.5 sm:gap-4"
    >
      <FormSelect
        :model-value="dotType"
        :options="dotOptions"
        label="Style"
        @update:model-value="emit('update:dotType', $event as DotType)"
      />
      <FormSelect
        :model-value="errorCorrectionLevel"
        :options="errorCorrectionOptions"
        label="Correction"
        @update:model-value="
          emit('update:errorCorrectionLevel', $event as ErrorCorrectionLevel)
        "
      />
      <FormSelect
        :model-value="marginLevel"
        :options="marginOptions"
        label="Margin"
        @update:model-value="emit('update:marginLevel', $event as MarginLevel)"
      />
      <FormSelect
        :model-value="cornerType"
        :options="cornerOptions"
        label="Corners"
        @update:model-value="
          emit('update:cornerType', $event as CornerSquareType)
        "
      />
    </div>

    <div class="mt-1.5 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-4">
      <div>
        <span class="field-label">QR Color</span>
        <input
          :value="qrColor"
          class="color-input color-field mt-1 sm:mt-2 w-full"
          type="color"
          title="Choose QR color"
          @change="emit('update:qrColor', readInputValue($event))"
        />
      </div>

      <div>
        <span class="field-label">Background</span>
        <div class="mt-1 sm:mt-2 flex gap-1.5 sm:gap-2">
          <input
            :value="backgroundColor"
            class="color-input color-field min-w-0 flex-1"
            type="color"
            title="Choose background color"
            :disabled="backgroundTransparent"
            @change="emit('update:backgroundColor', readInputValue($event))"
          />
          <label
            class="form-control flex h-9 sm:h-11 cursor-pointer select-none items-center rounded-xl border border-line bg-page px-2 sm:px-3 text-ink transition hover:border-neon-cyan"
          >
            <input
              :checked="backgroundTransparent"
              class="peer sr-only"
              type="checkbox"
              @change="
                emit('update:backgroundTransparent', readInputChecked($event))
              "
            />
            <span class="peer-checked:text-neon-cyan">Clear</span>
          </label>
        </div>
      </div>
    </div>

    <div class="mt-1.5 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-4">
      <FormSelect
        :model-value="String(exportSize)"
        :options="exportSizeOptions"
        label="Size"
        @update:model-value="
          emit('update:exportSize', Number($event) as ExportSize)
        "
      />
      <div>
        <span class="field-label">Filename</span>
        <input
          :value="filename"
          class="form-control mt-1 sm:mt-2 h-9 sm:h-11 w-full rounded-xl border border-line bg-page px-3 sm:px-4 py-0 text-ink outline-none transition focus:border-neon-cyan"
          type="text"
          autocomplete="off"
          placeholder="qr"
          @input="emit('update:filename', readInputValue($event))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
} from "qr-code-styling";
import { readInputChecked, readInputValue } from "../lib/inputEvents";
import {
  cornerOptions,
  dotOptions,
  errorCorrectionOptions,
  exportSizeOptions,
  marginOptions,
} from "../lib/qrSelectOptions";
import type { ExportSize, MarginLevel } from "../lib/qrTypes";
import FormSelect from "./FormSelect.vue";

defineProps<{
  backgroundColor: string;
  backgroundTransparent: boolean;
  cornerType: CornerSquareType;
  dotType: DotType;
  errorCorrectionLevel: ErrorCorrectionLevel;
  exportSize: ExportSize;
  filename: string;
  marginLevel: MarginLevel;
  qrColor: string;
}>();

const emit = defineEmits<{
  "update:backgroundColor": [value: string];
  "update:backgroundTransparent": [value: boolean];
  "update:cornerType": [value: CornerSquareType];
  "update:dotType": [value: DotType];
  "update:errorCorrectionLevel": [value: ErrorCorrectionLevel];
  "update:exportSize": [value: ExportSize];
  "update:filename": [value: string];
  "update:marginLevel": [value: MarginLevel];
  "update:qrColor": [value: string];
}>();
</script>
