import { CsfFormUI } from "../ui/form/CsfFormUI"
import { Input } from "../ui/form/Input"
import { Select } from "../ui/form/Select"
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeedback } from "../context/FeedbackContext";
import { Barangays } from "../utils/barangays";

type Props = { onNext: () => void; onBack: () => void; };

export const AddressForm = ({ onNext, onBack }: Props) => {
    const { t } = useTranslation();
    const { updateFormData } = useFeedback();
    const [selected, setSelected] = useState<string>("");
    const [barangay, setBarangay] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");

    const canProceed =
        selected === "Within Solano" ? Boolean(barangay) :
        selected === "Outside Solano" ? Boolean(addressDetail) :
        false;

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canProceed) return;
        updateFormData(Object.fromEntries(new FormData(e.currentTarget)));
        onNext();
    };

    return (
        <CsfFormUI>
            <form onSubmit={handleNext} className="flex flex-col">
                <h2 className="text-xl font-semibold text-[var(--theme-text)] mb-6">{t("feedback.address.title")}</h2>

                <label className="block">
                    <span className="text-sm text-[var(--theme-text)] mb-2 block">{t("feedback.address.label")}</span>
                    <div className="space-y-3 mt-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <Input type="radio" name="address" value="Within Solano" checked={selected === "Within Solano"} onChange={(e) => setSelected(e.target.value)} className="h-4 w-4" />
                            <span className="text-[var(--theme-text)]">{t("feedback.address.withinSolano")}</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <Input type="radio" name="address" value="Outside Solano" checked={selected === "Outside Solano"} onChange={(e) => setSelected(e.target.value)} className="h-4 w-4" />
                            <span className="text-[var(--theme-text)]">{t("feedback.address.outsideSolano")}</span>
                        </label>
                    </div>
                </label>

                {selected === "Within Solano" && (
                    <div className="mt-4">
                        <span className="text-sm text-[var(--theme-text)] mb-2 block">{t("feedback.address.barangayLabel")}</span>
                        <Select name="barangay" value={barangay} onChange={(e) => setBarangay(e.target.value)} className="w-full">
                            <option value="">{t("feedback.address.barangayPlaceholder")}</option>
                            {Barangays.map((b) => (
                                <option key={b.title} value={b.title}>{b.title}</option>
                            ))}
                        </Select>
                    </div>
                )}

                {selected === "Outside Solano" && (
                    <div className="mt-4">
                        <span className="text-sm text-[var(--theme-text)] mb-2 block">{t("feedback.address.specifyLabel")}</span>
                        <Input name="addressDetail" type="text" value={addressDetail}
                            onChange={(e) => setAddressDetail(e.target.value)} className="w-full mt-1 p-3"
                            placeholder={t("feedback.address.specifyPlaceholder")} />
                    </div>
                )}

                <div className="flex justify-between mt-8">
                    <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition"><ArrowLeft size={18} /> {t("common.back")}</button>
                    <button type="submit" disabled={!canProceed} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] hover:opacity-90 transition disabled:opacity-50">{t("common.next")} <ArrowRightToLine size={18} /></button>
                </div>
            </form>
        </CsfFormUI>
    )
}