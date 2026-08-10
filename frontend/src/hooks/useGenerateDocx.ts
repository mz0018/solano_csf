import { Packer } from "docx";
import { buildDocument } from "../docx/buildDocument";
import type { FeedbackItem } from "../components/buttons/BtnGenerateReport";

export type DocxInput = {
  chartImages: string[]
  feedback: FeedbackItem[]
  selectedOfficeName?: string
  selectedDateFrom?: string      
  selectedDateTo?: string 
}

export const useGenerateDocx = () => {
  const downloadDocx = async (
    { chartImages, feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }:DocxInput,
    filename = "report.docx"
  ) => {

    const doc = buildDocument({ 
      chartImages, 
      feedback,
      selectedOfficeName,
      selectedDateFrom,
      selectedDateTo
    });

    const blob = await Packer.toBlob(doc);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  return { downloadDocx };
};