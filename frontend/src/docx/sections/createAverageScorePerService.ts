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

export const createAverageScorePerService = ({
  feedback,
}: ServiceSurveyed) => {
  const serviceGroups: Record<string, FeedbackItem[]> = {};

  feedback.forEach((item) => {
    const codes: string[] = Array.isArray((item).service)
      ? (item).service
      : [(item).service];

    codes.forEach((c) => {
      serviceGroups[c] ??= [];
      serviceGroups[c].push(item);
    });
  });

  const table = new Table({
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
                    text: "Service",
                    color: "FCF55F",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),

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
                    text: "Responses",
                    color: "FCF55F",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),

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
                    text: "Average Score",
                    color: "FCF55F",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

      // Data rows
      ...Object.entries(serviceGroups).map(([service, items]) => {
        const sum = items.reduce((acc, item) => {
          const ratings = Object.values(item.ratings);

          return (
            acc +
            ratings.reduce((a, b) => a + b, 0) / ratings.length
          );
        }, 0);

        const avg =
          items.length > 0
            ? (sum / items.length).toFixed(2)
            : "0.00";

        return new TableRow({
          children: [
            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [
                new Paragraph(service),
              ],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [
                new Paragraph(items.length.toString()),
              ],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [
                new Paragraph(avg),
              ],
            }),
          ],
        });
      }),
    ],
  });

  return [
    new Paragraph({
      indent: { left: 720 },
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "C.  Average Score per service",
        }),
      ],
    }),

    new Paragraph({
      indent: { left: 1060 },
      children: [
        new TextRun({
          text: "External Service",
        }),
      ],
    }),

    table,
  ];
};
