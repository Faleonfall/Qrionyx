export const minimumLogoPercent = 20;
const logoPercentStep = 5;

type LogoSizeLimitOptions = {
  moduleCount: number;
  naturalHeight: number;
  naturalWidth: number;
};

type HiddenLogoSize = {
  height: number;
  width: number;
};

function calculateHiddenLogoSize({
  moduleCount,
  naturalHeight,
  naturalWidth,
  percent,
}: LogoSizeLimitOptions & { percent: number }): HiddenLogoSize {
  const aspectRatio = naturalHeight / naturalWidth;
  const maxHiddenDots = Math.floor(
    (percent / 100) ** 2 * moduleCount * moduleCount,
  );
  const maxHiddenAxisDots = moduleCount - 14;

  if (
    aspectRatio <= 0 ||
    maxHiddenAxisDots <= 0 ||
    maxHiddenDots <= 0 ||
    moduleCount <= 0
  ) {
    return { height: 0, width: 0 };
  }

  let hideXDots = Math.floor(Math.sqrt(maxHiddenDots / aspectRatio));

  if (hideXDots <= 0) {
    hideXDots = 1;
  }
  if (maxHiddenAxisDots < hideXDots) {
    hideXDots = maxHiddenAxisDots;
  }
  if (hideXDots % 2 === 0) {
    hideXDots -= 1;
  }

  let hideYDots = 1 + 2 * Math.ceil((hideXDots * aspectRatio - 1) / 2);
  let width = hideXDots;
  let height = Math.round(width * aspectRatio);

  if (hideYDots * hideXDots > maxHiddenDots || maxHiddenAxisDots < hideYDots) {
    if (maxHiddenAxisDots < hideYDots) {
      hideYDots = maxHiddenAxisDots;
    } else {
      hideYDots -= 2;
    }
    height = hideYDots;
    width = Math.round(height / aspectRatio);
  }

  return { height, width };
}

function isSameLogoSize(first: HiddenLogoSize, second: HiddenLogoSize) {
  return first.height === second.height && first.width === second.width;
}

export function getLogoSizeMaxPercent(options: LogoSizeLimitOptions) {
  let previousSize: HiddenLogoSize | null = null;
  let maxUsefulPercent = minimumLogoPercent;

  for (
    let percent = minimumLogoPercent;
    percent <= 100;
    percent += logoPercentStep
  ) {
    const currentSize = calculateHiddenLogoSize({ ...options, percent });

    if (previousSize && !isSameLogoSize(previousSize, currentSize)) {
      maxUsefulPercent = percent;
    }

    previousSize = currentSize;
  }

  return maxUsefulPercent;
}

export function clampLogoSizePercent(value: number, maxPercent: number) {
  const steppedValue = Math.round(value / logoPercentStep) * logoPercentStep;

  return Math.min(Math.max(steppedValue, minimumLogoPercent), maxPercent);
}

export function getPointerLogoSizePercent(
  clientX: number,
  track: Pick<DOMRect, "left" | "width">,
) {
  return ((clientX - track.left) / track.width) * 100;
}

export function getLogoSizeKeyStep(key: string) {
  if (key === "ArrowRight" || key === "ArrowUp") {
    return logoPercentStep;
  }

  return key === "ArrowLeft" || key === "ArrowDown" ? -logoPercentStep : 0;
}
