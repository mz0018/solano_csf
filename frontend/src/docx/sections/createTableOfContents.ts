import { AlignmentType, Paragraph, TextRun } from "docx";
import { formatDate } from "./createCoverPage";

export interface TableOfContentsInput {
  selectedDateFrom?: string;
  selectedDateTo?: string;
}

export const createTableOfContents = ({ selectedDateFrom, selectedDateTo }: TableOfContentsInput) => {
  return [
    // ==========================================
    // TABLE OF CONTENTS TITLE
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 700,
        after: 200,
      },

      children: [
        new TextRun({
          text: "Table of Contents",
          size: 34,
        }),
      ],
    }),

    // ==========================================
    // I
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "I.         ",
        }),
        new TextRun({
          text: "Agency Profile",
        }),
      ],
    }),

    // ==========================================
    // II
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "II.        ",
        }),
        new TextRun({
          text: "Overview",
        }),
      ],
    }),

    // ==========================================
    // III
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "III.       ",
        }),
        new TextRun({
          text: "Scope",
        }),
      ],
    }),

    // ==========================================
    // IV
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "IV.       ",
        }),
        new TextRun({
          text: "Methodology",
        }),
      ],
    }),

    // ==========================================
    // V
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "V.        ",
        }),
        new TextRun({
          text: `Results of the harmonized CSM for ${formatDate(selectedDateFrom)} to ${formatDate(selectedDateTo)}`,
        }),
      ],
    }),

    // ==========================================
    // VI
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "VI.       ",
        }),
        new TextRun({
          text: "Results of the Agency Action Plan reported in FY 2023",
        }),
      ],
    }),

    // ==========================================
    // VII
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "VII.      ",
        }),
        new TextRun({
          text: "Continuous Agency Improvement Plan for FY 2025",
        }),
      ],
    }),

    // ==========================================
    // VIII
    // ==========================================
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 0,
      },
      children: [
        new TextRun({
          text: "VIII.     ",
        }),
        new TextRun({
          text: "Index",
        }),
      ],
    }),
  ];
};
