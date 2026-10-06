import {
  Paragraph,
  ImageRun,
  AlignmentType,
  TextRun,
} from "docx";

export interface CoverPageInput {
  selectedOfficeName?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;
}

export const formatDate = (date?: string) => {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const createCoverPage = async ({
  selectedOfficeName,
  selectedDateFrom,
  selectedDateTo,
}: CoverPageInput) => {
  const response = await fetch("/img/logo.png");

  if (!response.ok) {
    throw new Error(`Failed to load logo: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const convertedLogo = new Uint8Array(buffer);

  return [
    // =========================================================
    // COVER - LOGO
    // =========================================================
    new Paragraph({
      alignment: AlignmentType.CENTER,

      // Keep logo with the LGU name
      keepNext: true,

      spacing: {
        before: 3000,
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

    // =========================================================
    // COVER - LGU NAME
    // =========================================================
    new Paragraph({
      alignment: AlignmentType.CENTER,

      // Keep LGU name with report information
      keepNext: true,

      spacing: {
        before: 500,
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

    // =========================================================
    // COVER - REPORT INFORMATION
    // =========================================================
    new Paragraph({
      alignment: AlignmentType.CENTER,

      // IMPORTANT:
      // Do NOT use keepNext here.
      // This is the final paragraph of the cover.

      spacing: {
        before: 5500,
        after: 500,
      },

      children: [
        // Report title
        new TextRun({
          text: "Client Satisfaction Measurement Report",
          bold: true,
          size: 40,
          characterSpacing: 15,
        }),

        // Office name
        new TextRun({
          text: selectedOfficeName ?? "",
          size: 38,
          characterSpacing: 15,
          break: 1,
        }),

        // Date range
        new TextRun({
          text:
            selectedDateFrom && selectedDateTo
              ? `${formatDate(selectedDateFrom)} to ${formatDate(
                  selectedDateTo
                )}`
              : "Date Range: All Time",
          size: 28,
          characterSpacing: 15,
          break: 1,
        }),
      ],
    }),
  ];
};
