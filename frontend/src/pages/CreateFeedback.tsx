import { useState } from "react";
import { DearClientForm } from "../forms/DearClientForm";
import { VerifyQueueForm } from "../forms/VerifyQueueForm";
import { RespondentProfileForm } from "../forms/RespondentProfileForm";
import { ServiceAssessmentForm } from "../forms/ServiceAssessmentForm";
import { AffiliationForm } from "../forms/AffiliationForm";
import { AgeGroupForm } from "../forms/AgeGroupForm";
import { AddressForm } from "../forms/AddressForm";
import { EmploymentStatusForm } from "../forms/EmploymentStatusForm";
import { ServiceRatingForm } from "../forms/ServiceRatingsForm";
import { OtherSuggestionForm } from "../forms/OtherSuggestionForm";
import { FeedbackProvider, useFeedback } from "../context/FeedbackContext";
import { useSubmitFeedback } from "../hooks/useSubmitFeedback";
import type { FeedbackFormData } from "../context/feedbackTypes";

const FeedbackFlow = () => {
    const [step, setStep] = useState<number>(0);
    const { formData, reset } = useFeedback();
    const { handleSubmit, isLoading } = useSubmitFeedback();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {step === 0 && (
                <DearClientForm
                    onNext={() => setStep(1)}
                />
            )}

            {step === 1 && (
                <VerifyQueueForm
                    onNext={() => setStep(2)}
                    onBack={() => setStep(0)}
                />
            )}

            {step === 2 && (
                <RespondentProfileForm
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                />
            )}

            {step === 3 && (
                <ServiceAssessmentForm
                    onNext={() => setStep(4)}
                    onBack={() => setStep(2)}
                />
            )}

            {step === 4 && (
                <AffiliationForm
                    onNext={() => setStep(5)}
                    onBack={() => setStep(3)}
                />
            )}

            {step === 5 && (
                <AgeGroupForm
                    onNext={() => setStep(6)}
                    onBack={() => setStep(4)}
                />
            )}

            {step === 6 && (
                <AddressForm
                    onNext={() => setStep(7)}
                    onBack={() => setStep(5)}
                />
            )}

            {step === 7 && (
                <EmploymentStatusForm
                    onNext={() => setStep(8)}
                    onBack={() => setStep(6)}
                />
            )}

            {step === 8 && (
                <ServiceRatingForm
                    onNext={() => setStep(9)}
                    onBack={() => setStep(7)}
                />
            )}

            {step === 9 && (
                <OtherSuggestionForm
                    onBack={() => setStep(8)}
                    isLoading={isLoading}
                    onSubmit={(comments) => {
                        handleSubmit({ ...formData, comments } as FeedbackFormData);
                        reset();
                        setStep(0);
                    }}
                />
            )}
        </div>
    );
};

const CreateFeedback = () => {
    return (
        <FeedbackProvider>
            <FeedbackFlow />
        </FeedbackProvider>
    );
};

export default CreateFeedback;
