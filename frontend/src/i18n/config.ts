import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "./locales/en.json"
import fil from "./locales/fil.json"

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fil", label: "Filipino" },
] as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, fil: { translation: fil } },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage"], caches: ["localStorage"] },
  })

export default i18n