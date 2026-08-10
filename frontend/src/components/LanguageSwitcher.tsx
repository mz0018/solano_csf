import { useTranslation } from "react-i18next"
import { SUPPORTED_LANGUAGES } from "../i18n/config"

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="bg-transparent text-[var(--theme-text)] border border-[var(--theme-border)] rounded px-2 py-1"
    >
      {SUPPORTED_LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  )
}