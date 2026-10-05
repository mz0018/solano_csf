import {
  Paragraph,
  ImageRun,
  PageBreak,
  AlignmentType,
  TextRun,
} from "docx";

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
      spacing: {
        after: 300,
      },
      children: [
        new TextRun({
          text: "LOCAL GOVERNMENT UNIT OF SOLANO",
          bold: true,
          font: "Baskerville Old Face",
          size: 40,
          characterSpacing: 20,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 8000,
        after: 500,
      },
      children: [
        new TextRun({
          text: "Client Satisfaction Measurement Report",
          bold: true,
          size: 40,
          characterSpacing: 15,
        }),

        new TextRun({
          text: selectedOfficeName ?? "",

          size: 38,
          characterSpacing: 10,
          break: 1,
        }),

        new TextRun({
          text:
            selectedDateFrom && selectedDateTo
              ? `${selectedDateFrom} to ${selectedDateTo}`
              : "Date Range: All Time",
          size: 32,
          break: 1,
        }),
      ],
    }),

    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
};
