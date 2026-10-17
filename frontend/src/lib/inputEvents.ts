type InputTarget = Partial<
  Pick<HTMLInputElement, "checked" | "files" | "value">
>;

function getInputTarget(event: Event): InputTarget {
  return (event.target ?? {}) as InputTarget;
}

export function readInputValue(event: Event) {
  return getInputTarget(event).value?.trim() ?? "";
}

export function readInputChecked(event: Event) {
  return getInputTarget(event).checked === true;
}

export function readInputFile(event: Event) {
  return getInputTarget(event).files?.[0] ?? null;
}
