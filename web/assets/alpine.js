Alpine.magic("formatISODate", () => (value, format) => {
  return value ? luxon.DateTime.fromISO(value).toFormat(format) : "";
});
