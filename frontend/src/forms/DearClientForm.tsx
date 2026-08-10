import { CsfFormUI } from "../ui/form/CsfFormUI";
import { Globe, ArrowRightToLine } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = { onNext: () => void; };

export const DearClientForm = ({ onNext }: Props) => {
    const { t, i18n } = useTranslation();
    const toggleLang = () => i18n.changeLanguage(i18n.language === "en" ? "fil" : "en");

    return (
        <CsfFormUI>
            <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="flex flex-col">
                <h1 className="text-3xl font-bold text-center mb-6 text-[var(--theme-text)]">
                    {t("feedback.dearClient.title")}
                </h1>
                <div className="text-gray-600 leading-relaxed space-y-4 mb-8">
                    <p>{t("feedback.dearClient.p1")}</p>
                    <p>{t("feedback.dearClient.p2")}</p>
                    <p>{t("feedback.dearClient.p3")}</p>
                    <p>{t("feedback.dearClient.p4")}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button type="button" onClick={toggleLang}
                        className="w-full border border-[var(--theme-border)] text-[var(--theme-text)] px-6 py-2 rounded-lg hover:bg-[var(--theme-border)] transition flex items-center justify-center gap-2">
                        <Globe size={18} />
                        {t("common.translate")}
                    </button>
                    <button type="submit"
                        className="w-full bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2">
                        <ArrowRightToLine size={18} />
                        {t("common.gotIt")}
                    </button>
                </div>
            </form>
        </CsfFormUI>
    );
};