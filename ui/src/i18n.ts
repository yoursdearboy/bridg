import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const resources = {
  en: {
    translation: {
      Patients: "Patients",
      intlDateTime: "{{val, datetime}}",
      dayjsDuration: "{{val, duration}}",
    },
  },
  ru: {
    translation: {
      Patients: "Пациенты",
      intlDateTime: "{{val, datetime}}",
      dayjsDuration: "{{val, duration}}",
    },
  },
};

export const languages = Object.keys(resources);

i18next.use(LanguageDetector).use(initReactI18next).init({
  supportedLngs: languages,
  resources,
});

i18next.services!.formatter!.add("dayjsDuration", (value, lng) => {
  return value.locale(lng!).humanize();
});
