import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
} from "docx";

import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ServiceSurveyed {
  feedback: FeedbackItem[];
}

export const createFreeResponses = ({ feedback }: ServiceSurveyed) => {
  const monthGroups: Record<string, string[]> = {};

  feedback.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
    });

    if (
      item.comments &&
      item.comments.trim() !== "" &&
      item.comments !== "NA"
    ) {
      monthGroups[month] ??= [];
      monthGroups[month].push(item.comments);
    }
  });

  const children: (Paragraph | Table)[] = [
    new Paragraph({
      children: [new TextRun({ text: "Free Responses", bold: true })],
    }),
  ];

  if (Object.keys(monthGroups).length === 0) {
    children.push(
      new Table({
        indent: { size: 1070, type: "dxa" },

        rows: [
          // Header
          new TableRow({
            children: [
              new TableCell({
                margins: {
                  top: 20,
                  bottom: 20,
                  left: 50,
                  right: 50,
                },
                shading: { fill: "1E90FF" },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "Comments",
                        color: "FCF55F",
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // No response
          new TableRow({
            children: [
              new TableCell({
                margins: {
                  top: 20,
                  bottom: 20,
                  left: 50,
                  right: 50,
                },
                children: [
                  new Paragraph("No Response"),
                ],
              }),
            ],
          }),
        ],
      })
    );

    return children;
  }

  Object.entries(monthGroups).forEach(([month, comments]) => {
    children.push(
      new Table({
        indent: { size: 1070, type: "dxa" },

        rows: [
          // Month header
          new TableRow({
            children: [
              new TableCell({
                margins: {
                  top: 20,
                  bottom: 20,
                  left: 50,
                  right: 50,
                },
                shading: { fill: "1E90FF" },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: `${month}`,
                        color: "FCF55F",
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Comments
          ...comments.map(
            (comment) =>
              new TableRow({
                children: [
                  new TableCell({
                    margins: {
                      top: 20,
                      bottom: 20,
                      left: 50,
                      right: 50,
                    },
                    children: [
                      new Paragraph(comment),
                    ],
                  }),
                ],
              })
          ),
        ],
      })
    );
  });

  return children;
};
