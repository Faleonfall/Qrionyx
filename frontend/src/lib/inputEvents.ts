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

// Empties the input after reading, so picking the same file again still fires
export function readInputFile(event: Event) {
  const target = getInputTarget(event);
  const file = target.files?.[0] ?? null;

  target.value = "";
  return file;
}
