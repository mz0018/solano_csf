export type GenerateTicketModalProps = {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
}

export type ViewFeedbackModalProps = {
  feedbackModalOpen: boolean;
  setFeedbackModalOpen: (open: boolean) => void;
  selectedFeedback: string | null;
};