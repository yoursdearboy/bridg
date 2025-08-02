import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import duration from "dayjs/plugin/duration";
import LocalizedFormat from "dayjs/plugin/LocalizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);

const resources = {
  en: {
    translation: {
      Patients: "Patients",
      intlDateTime: "{{val, datetime}}",
      dayjsDuration: "{{val, dayjsDuration}}",
      Status: {
        Candidate: "candidate",
        Eligible: "eligible",
        FollowUp: "follow-up",
        Ineligible: "ineligible",
        NotRegistered: "not-registered",
        OffStudy: "off-study",
        OnStudy: "on-study",
        OnStudyIntervention: "on-study-intervention",
        OnStudyObservation: "on-study-observation",
        PendingOnStudy: "pending-on-study",
        PotentialCandidate: "potential-candidate",
        Screening: "screening",
        Withdrawn: "withdrawn",
      },
      Gender: {
        F: "Female",
        M: "Male",
        U: "Unknown",
      },
    },
  },
  ru: {
    translation: {
      Patients: "Пациенты",
      intlDateTime: "{{val, datetime}}",
      dayjsDuration: "{{val, dayjsDuration}}",
      Status: {
        Candidate: "Кандидат",
        Eligible: "eligible",
        FollowUp: "follow-up",
        Ineligible: "ineligible",
        NotRegistered: "not-registered",
        OffStudy: "off-study",
        OnStudy: "on-study",
        OnStudyIntervention: "on-study-intervention",
        OnStudyObservation: "on-study-observation",
        PendingOnStudy: "pending-on-study",
        PotentialCandidate: "potential-candidate",
        Screening: "screening",
        Withdrawn: "withdrawn",
      },
      Gender: {
        F: "Женский",
        M: "Мужской",
        U: "Неизвестно",
      },
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
