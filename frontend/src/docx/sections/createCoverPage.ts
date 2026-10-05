import { Paragraph, HeadingLevel, ImageRun } from "docx";

export interface CoverPageInput {
  selectedOfficeName?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;
}

export const createCoverPage = async ({
  selectedOfficeName,
  selectedDateFrom,
  selectedDateTo,
}: CoverPageInput) => {
  const response = await fetch("/img/logo.png");
  const buffer = await response.arrayBuffer();
  const convertedLogo = new Uint8Array(buffer);

  return [
    new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: convertedLogo,
          transformation: {
            width: 150,
            height: 150,
          },
        }),
      ],
    }),

    new Paragraph({
      text: "Citizen Satisfaction Report",
      heading: HeadingLevel.TITLE,
    }),

    new Paragraph({
      text: selectedOfficeName
        ? `Selected Office: ${selectedOfficeName}`
        : "Office: All Offices",
    }),

    new Paragraph({
      text:
        selectedDateFrom && selectedDateTo
          ? `Selected Date Range: ${selectedDateFrom} to ${selectedDateTo}`
          : "Date Range: All Time",
    }),

    new Paragraph({
      text: "",
    }),
  ];
};