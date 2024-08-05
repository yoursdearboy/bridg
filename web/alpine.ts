import Alpine from "alpinejs";
import { DateTime } from "luxon";

(window as any).Alpine = Alpine;

Alpine.magic("formatISODate", () => (value, format) => {
  return value ? DateTime.fromISO(value).toFormat(format) : "";
});

Alpine.start();
