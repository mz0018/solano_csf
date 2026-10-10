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

export const createGenderTable = ({ feedback }: ServiceSurveyed) => {
  const genders = [...new Set(feedback.map(f => f.client.gender))];

  const monthData: Record<string, Record<string, number>> = {};

  feedback.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
    });

    monthData[month] ??= {};

    monthData[month][item.client.gender] =
      (monthData[month][item.client.gender] ?? 0) + 1;
  });

  const totalCounts = genders.map((gender) =>
    Object.values(monthData).reduce(
      (sum, counts) => sum + (counts[gender] ?? 0),
      0
    )
  );

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

          ...genders.map(
            (gender) =>
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
                        text: gender,
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

            ...genders.map(
              (gender) =>
                new TableCell({
                  margins: {
                    top: 20,
                    bottom: 20,
                    left: 50,
                    right: 50,
                  },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: (counts[gender] ?? 0).toString()
                        })
                      ]
                    }),
                  ],
                })
            ),
          ],
        })
      ),

      // Total row
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
              new Paragraph({
                alignment: AlignmentType.END,
                children: [
                  new TextRun({
                    text: "Total",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),

          ...totalCounts.map(
            (count) =>
              new TableCell({
                margins: {
                  top: 20,
                  bottom: 20,
                  left: 50,
                  right: 50,
                },
                shading: { fill: "#FFEA00" },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: count.toString(),
                        bold: true,
                        color: "#1E90FF",
                      }),
                    ],
                  }),
                ],
              })
          ),
        ],
      }),
    ],
  });

  return [

    new Paragraph({
      indent: { left: 1060 },
      children: [
        new TextRun({
          text: "Sex",
        }),
      ],
    }),

    table,
  ];
};