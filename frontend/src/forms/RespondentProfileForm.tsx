import { CsfFormUI } from "../ui/form/CsfFormUI"
import { Input } from "../ui/form/Input"
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeedback } from "../context/FeedbackContext";
import { ErrorText } from "../ui/form/ErrorText";

type Props = { onNext: () => void; onBack: () => void; };

const NAME_MAX = 100;
const TEL_MAX = 15;

export const RespondentProfileForm = ({ onNext, onBack }: Props) => {
    const { t } = useTranslation();
    const { updateFormData } = useFeedback();
    const [clientName, setClientName] = useState<string>("");
    const [contactNumber, setContactNumber] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const nameError = clientName.length > NAME_MAX;
    const contactError = contactNumber.length > TEL_MAX;
    const hasError = nameError || contactError;

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (hasError) return;
        updateFormData(Object.fromEntries(new FormData(e.currentTarget)));
        onNext();
    };

    return (
        <CsfFormUI>
            <form onSubmit={handleNext} className="flex flex-col">
                <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">{t("feedback.respondentProfile.title")}</h2>
                <div className="space-y-4">
                    <label htmlFor="client-name" className="block">
                        <span className="text-sm text-[var(--theme-text)]">{t("feedback.respondentProfile.nameLabel")}</span>
                        <Input id="client-name" name="clientName" type="text" value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full mt-1 p-3" placeholder={t("feedback.respondentProfile.namePlaceholder")}
                            error={nameError ? "error" : undefined} />
                        {nameError && <ErrorText message={t("feedback.respondentProfile.nameError", { max: NAME_MAX })} />}
                    </label>
                    <label htmlFor="contact-number" className="block">
                        <span className="text-sm text-[var(--theme-text)]">{t("feedback.respondentProfile.telLabel")}</span>
                        <Input id="contact-number" name="contactNumber" type="tel" value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ""))}
                            className="w-full mt-1 p-3" placeholder={t("feedback.respondentProfile.telPlaceholder")}
                            error={contactError ? "error" : undefined} />
                        {contactError && <ErrorText message={t("feedback.respondentProfile.contactError", { max: TEL_MAX })} />}
                    </label>
                    <div className="block">
                        <span className="text-sm text-[var(--theme-text)] mb-2 block">{t("feedback.respondentProfile.genderLabel")}</span>
                        <div className="space-y-3 mt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} className="h-4 w-4" />
                                <span className="text-[var(--theme-text)]">{t("feedback.respondentProfile.male")}</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} className="h-4 w-4" />
                                <span className="text-[var(--theme-text)]">{t("feedback.respondentProfile.female")}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-8">
                    <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition"><ArrowLeft size={18} /> {t("common.back")}</button>
                    <button type="submit" disabled={hasError || !gender} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50">{t("common.next")} <ArrowRightToLine size={18} /></button>
                </div>
            </form>
        </CsfFormUI>
    )
}