import { CsfFormUI } from "../ui/form/CsfFormUI";
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useVerifyQueue } from "../hooks/useVerifyQueue";
import { ErrorText } from "../ui/form/ErrorText";
import { Input } from "../ui/form/Input";
import { useFeedback } from "../context/FeedbackContext";

type Props = { onNext: () => void; onBack: () => void };

export const VerifyQueueForm = ({ onNext, onBack }: Props) => {
  const { t } = useTranslation();
  const { setVerified, updateFormData } = useFeedback();
  const { code, setCode, isLoading, error, verify, isRateLimited } = useVerifyQueue();

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await verify();
    if (data?.exists) {
      setVerified(data);
      updateFormData({ queueNumber: code });
      onNext();
    }
  };

  return (
    <CsfFormUI>
      <form onSubmit={handleNext} className="flex flex-col">
        <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">{t("feedback.verifyQueue.title")}</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-[var(--theme-text)]">{t("feedback.verifyQueue.queueNumber")}</span>
            <Input
              name="queueNumber"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mt-1 p-3"
              placeholder={t("feedback.verifyQueue.queuePlaceholder")}
            />
          </label>
        </div>

        {error && <ErrorText message={error} />}

        <div className="flex justify-between mt-8">
          <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition">
            <ArrowLeft size={18} /> {t("common.back")}
          </button>
          <button type="submit" disabled={isLoading || isRateLimited}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50">
            {isLoading ? t("feedback.verifyQueue.checking") : t("common.next")} <ArrowRightToLine size={18} />
          </button>
        </div>
      </form>
    </CsfFormUI>
  );
};