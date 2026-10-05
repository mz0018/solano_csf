import { Paragraph, HeadingLevel, ImageRun, PageBreak, AlignmentType } from "docx";

export interface CoverPageInput {
  selectedOfficeName?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;
}

export const createCoverPage = async ({ selectedOfficeName, selectedDateFrom, selectedDateTo }: CoverPageInput) => {
  
  const response = await fetch("/img/logo.png");
  const buffer = await response.arrayBuffer();
  const convertedLogo = new Uint8Array(buffer);

  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 500,
      },
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
      alignment: AlignmentType.CENTER,
      text: "Local Government Unit of Solano",
      heading: HeadingLevel.TITLE,
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      text: "Client Satisfaction Measurement Report",
      heading: HeadingLevel.TITLE,
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      text: `${selectedOfficeName}`,
      heading: HeadingLevel.TITLE,
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      text:
        selectedDateFrom && selectedDateTo
          ? `Selected Date Range: ${selectedDateFrom} to ${selectedDateTo}`
          : "Date Range: All Time",
    }),

    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
};
