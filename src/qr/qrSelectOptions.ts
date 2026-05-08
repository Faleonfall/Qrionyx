import type { SelectOption } from "./qrTypes";

export const dotOptions: SelectOption[] = [
  { label: "Square", value: "square" },
  { label: "Rounded", value: "rounded" },
  { label: "Dots", value: "dots" },
  { label: "Angled", value: "classy" },
  { label: "Soft angled", value: "classy-rounded" },
  { label: "Capsule", value: "extra-rounded" },
];

export const errorCorrectionOptions: SelectOption[] = [
  { label: "Low", value: "L" },
  { label: "Medium", value: "M" },
  { label: "Balanced", value: "Q" },
  { label: "High", value: "H" },
];

export const marginOptions: SelectOption[] = [
  { label: "None", value: "none" },
  { label: "Compact", value: "tight" },
  { label: "Default", value: "standard" },
  { label: "Spacious", value: "wide" },
];

export const shapeOptions: SelectOption[] = [
  { label: "Square", value: "square" },
  { label: "Circle", value: "circle" },
];

export const cornerOptions: SelectOption[] = [
  { label: "Square", value: "square" },
  { label: "Rounded", value: "rounded" },
  { label: "Circle", value: "dot" },
  { label: "Angled", value: "classy" },
  { label: "Soft angled", value: "classy-rounded" },
  { label: "Capsule", value: "extra-rounded" },
];

export const exportSizeOptions: SelectOption[] = [
  { label: "512 px", value: "512" },
  { label: "1024 px", value: "1024" },
  { label: "2048 px", value: "2048" },
];

export const gradientOptions: SelectOption[] = [
  { label: "None", value: "none" },
  { label: "Linear", value: "linear" },
  { label: "Radial", value: "radial" },
];
