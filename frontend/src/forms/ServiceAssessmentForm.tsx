import { useState } from "react";
import { CsfFormUI } from "../ui/form/CsfFormUI";
import { Input } from "../ui/form/Input";
import { useTranslation } from "react-i18next";
import { useFeedback } from "../context/FeedbackContext";
import { ArrowLeft, ArrowRightToLine } from "lucide-react";

type Props = { onNext: () => void; onBack: () => void; };

export const ServiceAssessmentForm = ({ onNext, onBack }: Props) => {
    const { t } = useTranslation();
    const { verified, updateFormData, formData } = useFeedback();
    const services = verified?.services ?? [];

    const selectedService = Array.isArray(verified?.selectedService)
        ? verified.selectedService
        : verified?.selectedService
            ? [verified.selectedService]
            : [];

    const ticketService = selectedService[0] ?? "";

    const isLocked = selectedService.length > 0;

    const [selected, setSelected] = useState<string>(
        isLocked ? ticketService : (formData.service || "")
    );

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateFormData(Object.fromEntries(new FormData(e.currentTarget)));
        onNext();
    };

    console.log(services)
    console.log(selectedService)

    return (
        <CsfFormUI>
            <form onSubmit={handleNext} className="flex flex-col">
                <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">{t("feedback.serviceAssessment.title")}</h2>
                <div className="space-y-4">
                    <div className="block">
                        <span className="text-sm text-[var(--theme-text)] mb-2 block">{t("feedback.serviceAssessment.label")}</span>
                        {services.length === 0 ? (
                            <p className="text-sm text-[var(--theme-text)] opacity-70">{t("feedback.serviceAssessment.empty")}</p>
                        ) : (
                            <div className="space-y-3 mt-2">
                            {[...services]
                                .sort((a, b) => {
                                if (a.code === "OTHER_SERVICE") return 1;
                                if (b.code === "OTHER_SERVICE") return -1;
                                return 0;
                                })
                                .map((s) => (
                                 <label key={s.code} className={`flex items-center gap-3 ${isLocked ? "cursor-default" : "cursor-pointer"}`}>
                                    <Input
                                        type="checkbox"
                                        name="service"
                                        value={s.code}
                                        checked={
                                            isLocked
                                                ? selectedService.includes(s.code)
                                                : selected === s.code
                                        }
                                        disabled={isLocked}
                                        onChange={(e) => setSelected(e.target.value)}
                                        className="h-4 w-4"
                                    />
                                    <span className="text-[var(--theme-text)]">{s.name}</span>
                                    {isLocked && selectedService.includes(s.code) && (
                                        <span className="text-sm italic opacity-70 tracking-wider text-[var(--theme-text)]">
                                            (Selected)
                                        </span>
                                    )}
                                </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-between mt-8">
                    <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition"><ArrowLeft size={18} /> {t("common.back")}</button>
                    <button type="submit" disabled={services.length === 0 || !selected} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50">{t("common.next")} <ArrowRightToLine size={18} /></button>
                </div>
            </form>
        </CsfFormUI>
    );
};