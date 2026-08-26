import { Paragraph, Table, TableRow, TableCell, TextRun } from "docx";
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
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Month")],
          }),
          ...ageGroups.map(
            (ageGroup) =>
              new TableCell({
                children: [new Paragraph(ageGroup)],
              })
          ),
        ],
      }),

      ...Object.entries(monthData).map(([month, counts]) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(month)],
            }),
            ...ageGroups.map(
              (ageGroup) =>
                new TableCell({
                  children: [
                    new Paragraph((counts[ageGroup] ?? 0).toString()),
                  ],
                })
            ),
          ],
        })
      ),
    ],
  });

  const tableSpacing = new Paragraph({
      text: "",
      spacing: {
          after: 200,
      },
  });

  return [
    new Paragraph({
        children: [
            new TextRun({
            text: "Age Group",
            bold: true,
            }),
        ],
    }),
    table,
    tableSpacing,
  ];
};