import { CsfFormUI } from "../ui/form/CsfFormUI";
import { Input } from "../ui/form/Input";
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeedback } from "../context/FeedbackContext";

type Props = { onNext: () => void; onBack: () => void; };

type Rating = { label: string; labelKey: string; questionKey: string; value: number; };
type RatingScale = { value: number; emoji: string; labelKey: string; };

export const ServiceRatingForm = ({ onNext, onBack }: Props) => {
    const { t } = useTranslation();
    const { updateFormData } = useFeedback();

    const ratings: Rating[] = [
        { label: "Responsiveness", labelKey: "responsiveness", questionKey: "responsivenessQ", value: 0 },
        { label: "Reliability", labelKey: "reliability", questionKey: "reliabilityQ", value: 0 },
        { label: "Access and Facilities", labelKey: "accessFacilities", questionKey: "accessFacilitiesQ", value: 0 },
        { label: "Communication", labelKey: "communication", questionKey: "communicationQ", value: 0 },
        { label: "Costs", labelKey: "costs", questionKey: "costsQ", value: 0 },
        { label: "Integrity", labelKey: "integrity", questionKey: "integrityQ", value: 0 },
        { label: "Assurance", labelKey: "assurance", questionKey: "assuranceQ", value: 0 },
        { label: "Outcome", labelKey: "outcome", questionKey: "outcomeQ", value: 0 },
    ];

    const ratingsScale: RatingScale[] = [
        { value: 1, emoji: "😣", labelKey: "stronglyDisagree" },
        { value: 2, emoji: "🙁", labelKey: "disagree" },
        { value: 3, emoji: "😐", labelKey: "neutral" },
        { value: 4, emoji: "😊", labelKey: "agree" },
        { value: 5, emoji: "😁", labelKey: "stronglyAgree" },
    ];

    const [answers, setAnswers] = useState<Record<string, number>>({});
    const allAnswered = ratings.every((r) => answers[r.labelKey] !== undefined && answers[r.labelKey] !== null);

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateFormData(answers);
        onNext();
    };

    const progressItems = ratings.map((rating) => ({
        key: rating.labelKey,
        completed: answers[rating.labelKey] !== undefined,
    }));

    return (
        <CsfFormUI>
            <form onSubmit={handleNext} className="flex flex-col h-[500px]">
                <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">{t("feedback.serviceRating.title")}</h2>
                <div className="flex items-center w-full mb-6">
                    {progressItems.map((item, index) => (
                        <div key={item.key} className="flex items-center flex-1 last:flex-none">
                            <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition
                                    ${
                                        item.completed
                                            ? "bg-green-500 border-green-500"
                                            : "bg-white border-gray-300"
                                    }`}
                            >
                                {item.completed && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                )}
                            </div>

                            {index < progressItems.length - 1 && (
                                <div
                                    className={`h-0.5 flex-1 mx-1 transition
                                        ${
                                            progressItems[index + 1].completed
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="h-[60vh] overflow-y-auto space-y-4 pr-2">
                    {ratings.map((rate) => (
                        <div key={rate.label} className="space-y-2">
                            <h3 className="text-sm font-medium text-[var(--theme-text)]">{t(`feedback.serviceRating.${rate.labelKey}`)}</h3>
                            <p className="text-sm text-gray-500">{t(`feedback.serviceRating.${rate.questionKey}`)}</p>
                            <div className="grid grid-cols-5 gap-2 mt-3">
                                {ratingsScale.map((score) => (
                                    <label
                                        key={score.value}
                                        className={`flex flex-col items-center justify-center rounded-lg border p-3 cursor-pointer transition
                                            ${
                                                answers[rate.labelKey] === Number(score.value)
                                                    ? "border-[var(--theme-btn-bg)] bg-[var(--theme-btn-bg)]/10"
                                                    : "border-[var(--theme-border)] hover:bg-gray-50"
                                            }`}
                                    >
                                        <Input
                                            type="radio"
                                            name={rate.labelKey}
                                            value={score.value}
                                            checked={answers[rate.labelKey] === Number(score.value)}
                                            onChange={() =>
                                                setAnswers((p) => ({
                                                    ...p,
                                                    [rate.labelKey]: Number(score.value),
                                                }))
                                            }
                                            className="hidden"
                                        />
                                        <span className="text-3xl">{score.emoji}</span>
                                        <span className="mt-2 text-center text-[11px] leading-tight text-[var(--theme-text)]">
                                            <span className="hidden sm:inline">
                                                {t(`feedback.serviceRating.${score.labelKey}`)}
                                            </span>
                                            <span className="inline sm:hidden">
                                                {score.value}
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-8">
                    <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition"><ArrowLeft size={18} /> {t("common.back")}</button>
                    <button type="submit" disabled={!allAnswered} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50">{t("common.next")} <ArrowRightToLine size={18} /></button>
                </div>
            </form>
        </CsfFormUI>
    );
};