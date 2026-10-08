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

export const createEmploymentStatusTable = ({ feedback }: ServiceSurveyed) => {
  const employmentStatuses = [
    ...new Set(feedback.map(f => f.client.employmentStatus)),
  ];

  const monthData: Record<string, Record<string, number>> = {};

  feedback.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
    });

    monthData[month] ??= {};

    monthData[month][item.client.employmentStatus] =
      (monthData[month][item.client.employmentStatus] ?? 0) + 1;
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
                    text: "Month",
                    color: "FCF55F",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),

          ...employmentStatuses.map(
            (employmentStatus) =>
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
                        text: employmentStatus,
                        color: "FCF55F",
                        bold: true,
                      }),
                    ],
                  }),
                ],
              })
          ),
        ],
      }),

      // Data rows
      ...Object.entries(monthData).map(([month, counts]) =>
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
                new Paragraph(month),
              ],
            }),

            ...employmentStatuses.map(
              (employmentStatus) =>
                new TableCell({
                  margins: {
                    top: 20,
                    bottom: 20,
                    left: 50,
                    right: 50,
                  },
                  children: [
                    new Paragraph(
                      (counts[employmentStatus] ?? 0).toString()
                    ),
                  ],
                })
            ),
          ],
        })
      ),
    ],
  });

  return [
    new Paragraph({
      indent: { left: 1060 },
      children: [
        new TextRun({
          text: "Employment Status",
        }),
      ],
    }),

    table,
  ];
};