import { Paragraph, HeadingLevel } from "docx";

export interface CoverPageInput {
  selectedOfficeName?: string
  selectedDateFrom?: string
  selectedDateTo?: string
}

export const createCoverPage = ({ selectedOfficeName, selectedDateFrom, selectedDateTo }: CoverPageInput) => {

  return [
    new Paragraph({
      text: "Citizen Satisfaction Report",
      heading: HeadingLevel.TITLE
    }),

    new Paragraph({
      text: selectedOfficeName ? `Selected Office: ${selectedOfficeName}` : "Office: All Offices"
    }),

    new Paragraph({
      text: selectedDateFrom && selectedDateTo 
        ? `Selected Date Range: ${selectedDateFrom} to ${selectedDateTo}`
        : "Date Range: All Time"
    }),

    new Paragraph({
      text: ""
    })
  ];
};