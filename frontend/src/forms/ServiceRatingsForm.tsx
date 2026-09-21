import { CsfFormUI } from "../ui/form/CsfFormUI";
import { Input } from "../ui/form/Input";
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeedback } from "../context/FeedbackContext";

type Props = {
    onNext: () => void;
    onBack: () => void;
};

type Rating = {
    labelKey: string;
    questionKey: string;
};

type RatingScale = {
    value: number;
    emoji: string;
    labelKey: string;
};

export const ServiceRatingForm = ({ onNext, onBack }: Props) => {
    const { t } = useTranslation();
    const { updateFormData, formData } = useFeedback();

    const ratings: Rating[] = [
        {
            labelKey: "responsiveness",
            questionKey: "responsivenessQ",
        },
        {
            labelKey: "reliability",
            questionKey: "reliabilityQ",
        },
        {
            labelKey: "accessFacilities",
            questionKey: "accessFacilitiesQ",
        },
        {
            labelKey: "communication",
            questionKey: "communicationQ",
        },
        {
            labelKey: "costs",
            questionKey: "costsQ",
        },
        {
            labelKey: "integrity",
            questionKey: "integrityQ",
        },
        {
            labelKey: "assurance",
            questionKey: "assuranceQ",
        },
        {
            labelKey: "outcome",
            questionKey: "outcomeQ",
        },
    ];

    const ratingsScale: RatingScale[] = [
        { value: 1, emoji: "😣", labelKey: "stronglyDisagree" },
        { value: 2, emoji: "🙁", labelKey: "disagree" },
        { value: 3, emoji: "😐", labelKey: "neutral" },
        { value: 4, emoji: "😊", labelKey: "agree" },
        { value: 5, emoji: "😁", labelKey: "stronglyAgree" },
    ];

    const [answers, setAnswers] = useState<Record<string, number>>(() => {
    const initial = {} as Record<string, number>;
        ratings.forEach(r => { initial[r.labelKey] = (formData as any)[r.labelKey] || 0; });
        return initial;
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentRating = ratings[currentIndex];

    const handleAnswer = (value: number) => {
        const updatedAnswers = {
            ...answers,
            [currentRating.labelKey]: value,
        };

        setAnswers(updatedAnswers);

        if (currentIndex < ratings.length - 1) {
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 200);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            onBack();
        }
    };

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentIndex < ratings.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            return;
        }

        updateFormData(answers);
        onNext();
    };

    return (
        <CsfFormUI>
            <form
                onSubmit={handleNext}
                className="flex flex-col h-[370px]"
            >
                <h2 className="text-xl font-semibold text-[var(--theme-text)]">
                    {t("feedback.serviceRating.title")}
                </h2>

                {/* Current Question */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="text-start mb-8">
                        <p className="text-sm text-gray-400 mb-2">
                            {currentIndex + 1} / {ratings.length}
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--theme-text)] mb-3">
                            {t(
                                `feedback.serviceRating.${currentRating.labelKey}`
                            )}
                        </h3>

                        <p className="text-sm text-gray-500 max-w-xl mx-auto">
                            {t(
                                `feedback.serviceRating.${currentRating.questionKey}`
                            )}
                        </p>
                    </div>

                    {/* Rating options */}
                    <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto w-full">
                        {ratingsScale.map((score) => (
                            <label
                                key={score.value}
                                className={`
                                    flex flex-col items-center
                                    justify-center rounded-lg
                                    border p-4 cursor-pointer
                                    transition-all duration-200
                                    hover:-translate-y-1
                                    ${
                                        answers[currentRating.labelKey] ===
                                        score.value
                                            ? "border-[var(--theme-btn-bg)] bg-[var(--theme-btn-bg)]/10 scale-105"
                                            : "border-[var(--theme-border)] hover:bg-gray-50"
                                    }
                                `}
                            >
                                <Input
                                    type="radio"
                                    name={currentRating.labelKey}
                                    value={score.value}
                                    checked={
                                        answers[currentRating.labelKey] ===
                                        score.value
                                    }
                                    onChange={() =>
                                        handleAnswer(score.value)
                                    }
                                    className="hidden"
                                />

                                <span className="text-4xl">
                                    {score.emoji}
                                </span>

                                <span className="mt-2 text-center text-xs leading-tight text-[var(--theme-text)]">
                                    <span className="hidden sm:inline">
                                        {t(
                                            `feedback.serviceRating.${score.labelKey}`
                                        )}
                                    </span>

                                    <span className="inline sm:hidden">
                                        {score.value}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition"
                    >
                        <ArrowLeft size={18} />
                        {t("common.back")}
                    </button>

                    <button
                        type="submit"
                        disabled={!answers[currentRating.labelKey]}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50"
                    >
                        {currentIndex === ratings.length - 1
                            ? t("common.submit")
                            : t("common.next")}

                        <ArrowRightToLine size={18} />
                    </button>
                </div>
            </form>
        </CsfFormUI>
    );
};
