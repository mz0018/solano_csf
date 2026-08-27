import { CsfFormUI } from "../ui/form/CsfFormUI";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeedback } from "../context/FeedbackContext";
import { ErrorText } from "../ui/form/ErrorText";

type Props = {
    onBack: () => void;
    onSubmit: (comments: string) => void;
    isLoading: boolean
};

const COMMENTS_MAX = 100;

export const OtherSuggestionForm = ({ onBack, isLoading, onSubmit }: Props) => {
    const { t } = useTranslation();
    const { updateFormData } = useFeedback();
    const [comments, setComments] = useState<string>("");

    const commentsError = comments.length > COMMENTS_MAX;
    const hasError = commentsError;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (hasError) return;
        updateFormData(Object.fromEntries(new FormData(e.currentTarget)));
        onSubmit(comments);
    };

    return (
        <CsfFormUI>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">
                    {t("feedback.otherSuggestion.title")}
                </h2>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm text-[var(--theme-text)]">{t("feedback.otherSuggestion.label")}</span>
                        <textarea
                            id="comments"
                            name="comments"
                            rows={4}
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full mt-1 p-3 rounded-lg border border-[var(--theme-border)] bg-transparent text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-btn-bg)] resize-none"
                            placeholder={t("feedback.otherSuggestion.placeholder")}
                        />
                        {commentsError && (
                            <ErrorText message={t("feedback.otherSuggestion.commentsError", { max: COMMENTS_MAX })} />
                        )}
                    </label>
                </div>
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition"
                    >
                        <ArrowLeft size={18} />
                        {t("common.back")}
                    </button>
                    <button
                        type="submit"
                        disabled={hasError || isLoading}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50"
                    >
                        {t("common.submit")}
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </CsfFormUI>
    );
};