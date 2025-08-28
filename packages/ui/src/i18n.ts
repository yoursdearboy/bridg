import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import duration, { type Duration } from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const resources = { en, ru };

export const languages = Object.keys(resources);

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: languages,
    resources,
  })
  .catch(console.error);

i18next.services.formatter!.add("dayjsDuration", (value: Duration, lng) => {
  return value.locale(lng!).humanize();
});

export default i18next;
