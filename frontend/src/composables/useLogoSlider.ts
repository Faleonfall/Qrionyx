import { computed, useTemplateRef } from "vue";
import {
  clampLogoSizePercent,
  getLogoSizeKeyStep,
  getPointerLogoSizePercent,
} from "../lib/logoSizeLimit";

type LogoSliderOptions = {
  imageSize: () => number;
  maxPercent: () => number;
  onChange: (imageSize: number) => void;
};

export function useLogoSlider({
  imageSize,
  maxPercent,
  onChange,
}: LogoSliderOptions) {
  const track = useTemplateRef<HTMLElement>("logoSlider");
  const imageSizePercent = computed(() => Math.round(imageSize() * 100));

  function change(nextPercent: number) {
    const clampedPercent = clampLogoSizePercent(nextPercent, maxPercent());

    if (clampedPercent !== imageSizePercent.value) {
      onChange(clampedPercent / 100);
    }
  }

  function changeFromPointer(event: PointerEvent) {
    const rect = track.value?.getBoundingClientRect();

    change(
      rect
        ? getPointerLogoSizePercent(event.clientX, rect)
        : imageSizePercent.value,
    );
  }

  function onPointerDown(event: PointerEvent) {
    const target = event.currentTarget;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    target.setPointerCapture(event.pointerId);
    const up = (upEvent: PointerEvent) => {
      if (target.hasPointerCapture(upEvent.pointerId)) {
        target.releasePointerCapture(upEvent.pointerId);
      }
      target.removeEventListener("pointermove", changeFromPointer);
      target.removeEventListener("pointerup", up);
      target.removeEventListener("pointercancel", up);
    };

    changeFromPointer(event);
    target.addEventListener("pointermove", changeFromPointer);
    target.addEventListener("pointerup", up);
    target.addEventListener("pointercancel", up);
  }

  function onKeyDown(event: KeyboardEvent) {
    const step = getLogoSizeKeyStep(event.key);

    if (step === 0) {
      return;
    }

    event.preventDefault();
    change(imageSizePercent.value + step);
  }

  return { imageSizePercent, onKeyDown, onPointerDown };
}
