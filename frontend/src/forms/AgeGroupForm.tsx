import { CsfFormUI } from "../ui/form/CsfFormUI"
import { Input } from "../ui/form/Input"
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeedback } from "../context/FeedbackContext";

type Props = { onNext: () => void; onBack: () => void; };

const AGE_GROUPS = [
  { value: "17 and below", key: "17below" },
  { value: "18-29", key: "18_29" },
  { value: "30-39", key: "30_39" },
  { value: "40-49", key: "40_49" },
  { value: "50-59", key: "50_59" },
  { value: "60 and above", key: "60above" },
];

export const AgeGroupForm = ({ onNext, onBack }: Props) => {
    const { t } = useTranslation();
    const { updateFormData } = useFeedback();
    const [selected, setSelected] = useState<string>("");

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateFormData(Object.fromEntries(new FormData(e.currentTarget)));
        onNext();
    };

    return (
        <CsfFormUI>
            <form onSubmit={handleNext} className="flex flex-col">
                <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">{t("feedback.ageGroup.title")}</h2>
                <div className="block">
                    <span className="text-sm text-[var(--theme-text)] mb-2 block">{t("feedback.ageGroup.label")}</span>
                    <div className="space-y-3 mt-2">
                        {AGE_GROUPS.map((g) => (
                            <label key={g.value} className="flex items-center gap-3 cursor-pointer">
                                <Input type="radio" name="ageGroup" value={g.value} checked={selected === g.value} onChange={(e) => setSelected(e.target.value)} className="h-4 w-4" />
                                <span className="text-[var(--theme-text)]">{t(`feedback.ageGroup.${g.key}`)}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between mt-8">
                    <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition"><ArrowLeft size={18} /> {t("common.back")}</button>
                    <button type="submit" disabled={!selected} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50">{t("common.next")} <ArrowRightToLine size={18} /></button>
                </div>
            </form>
        </CsfFormUI>
    )
}