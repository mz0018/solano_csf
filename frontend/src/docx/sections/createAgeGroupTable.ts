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

export const createAgeGroupTable = ({ feedback }: ServiceSurveyed) => {
  const ageGroups = [...new Set(feedback.map(f => f.client.ageGroup))];

  const monthData: Record<string, Record<string, number>> = {};

  feedback.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
    });

    monthData[month] ??= {};

    monthData[month][item.client.ageGroup] =
      (monthData[month][item.client.ageGroup] ?? 0) + 1;
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

          ...ageGroups.map(
            (ageGroup) =>
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
                        text: ageGroup,
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

            ...ageGroups.map(
              (ageGroup) =>
                new TableCell({
                  margins: {
                    top: 20,
                    bottom: 20,
                    left: 50,
                    right: 50,
                  },
                  children: [
                    new Paragraph(
                      (counts[ageGroup] ?? 0).toString()
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
          text: "Age Group",
        }),
      ],
    }),

    table,
  ];
};