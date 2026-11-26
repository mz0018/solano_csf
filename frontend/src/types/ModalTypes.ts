import type { ListOfServicesResponse } from './HeadOfficeAdminType';

export type GenerateTicketModalProps = {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
}

export type ViewFeedbackModalProps = {
  feedbackModalOpen: boolean;
  setFeedbackModalOpen: (open: boolean) => void;
  selectedFeedback: string | null;
};

export type ViewServiceModalProps = {
  service: ListOfServicesResponse | null;
  onClose: () => void;
  onServiceUpdated: (service: ListOfServicesResponse) => void;
};

