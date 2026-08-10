import { Paragraph, Table, TableRow, TableCell } from "docx";
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

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Month")],
          }),
          ...genders.map(
            (gender) =>
              new TableCell({
                children: [new Paragraph(gender)],
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
            ...genders.map(
              (gender) =>
                new TableCell({
                  children: [
                    new Paragraph((counts[gender] ?? 0).toString()),
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
      text: "Gender",
    }),
    table,
  ];
};