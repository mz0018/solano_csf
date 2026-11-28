import { useState } from "react";
import { Input } from "../ui/form/Input";
import { useTranslation } from "react-i18next";
import { CsfFormUI } from "../ui/form/CsfFormUI";
import { ErrorText } from "../ui/form/ErrorText";
import { useSearchParams } from "react-router-dom";
import { useFeedback } from "../hooks/useFeedback";
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { useMutateVerifyQueueTicketHook } from "../hooks/client/useMutateVerifyQueueTicketHook";

import type { FeedbackFormButtons } from "../types/ClientFeedbackTypes";

export const VerifyQueueForm = ({ onNext, onBack }: Pick<FeedbackFormButtons, "onNext" | "onBack">) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const urlCode = searchParams.get('code');
  const [code, setCode] = useState<string>(urlCode ?? "");
  const { setVerified, updateFormData } = useFeedback();
  const { mutate: verifyCode, isPending: verifyingCode, error: verifyError } = useMutateVerifyQueueTicketHook();

  const handleNext = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedCode = code.trim();

    if (!trimmedCode) return;
    
    verifyCode(code, {
      onSuccess: (data) => {

        if (!data.exists) return;

        setVerified({
          code: trimmedCode,
          officeCode: data.officeCode,
          services: data.services,
          selectedService: data.selectedService ? [data.selectedService] : [],
          selectedChildService: data.selectedChildService
            ? [data.selectedChildService]
            : [],
        });

        updateFormData({ queueNumber: trimmedCode, service: data.selectedService });
        onNext();
      }
    })
  }

  return (
    <CsfFormUI>
      <form onSubmit={handleNext} className="flex flex-col">
        <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">{t("feedback.verifyQueue.title")}</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-[var(--theme-text)]">{t("feedback.verifyQueue.queueNumber")}</span>
            <Input
              id="queue-number"
              name="queueNumber"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mt-1 p-3"
              placeholder={t("feedback.verifyQueue.queuePlaceholder")}
            />
          </label>
        </div>

        {verifyError && <ErrorText message={verifyError.message} />}

        <div className="flex justify-between mt-8">
          <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition">
            <ArrowLeft size={18} /> {t("common.back")}
          </button>
          <button type="submit" disabled={verifyingCode}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50">
            {verifyingCode ? t("feedback.verifyQueue.checking") : t("common.next")} <ArrowRightToLine size={18} />
          </button>
        </div>
      </form>
    </CsfFormUI>
  );
};