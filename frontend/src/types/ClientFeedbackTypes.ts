export type FeedbackFormButtons = {
    onNext: () => void;
    onBack: () => void;
    onSubmit: (arg: string) => void;
    isLoading?: boolean;
}

export type FeedbackFormRatingKey = 
    | "responsiveness"
    | "reliability"
    | "accessFacilities"
    | "communication"
    | "costs"
    | "integrity"
    | "assurance"
    | "outcome";

export type FeedbackRating = {
    labelKey: FeedbackFormRatingKey;
    questionKey: string;
}

export type FeedbackRatingScale = {
    value: number;
    emoji: string;
    labelKey: string;
}
