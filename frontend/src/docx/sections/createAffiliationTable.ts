import { Paragraph, Table, TableRow, TableCell } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ServiceSurveyed {
  feedback: FeedbackItem[];
}

export const createAffiliationTable = ({ feedback }: ServiceSurveyed) => {
  const affiliations = [...new Set(feedback.map(f => f.client.affiliation))];

  const monthData: Record<string, Record<string, number>> = {};

  feedback.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
    });

    monthData[month] ??= {};

    monthData[month][item.client.affiliation] =
      (monthData[month][item.client.affiliation] ?? 0) + 1;
  });

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Month")],
          }),
          ...affiliations.map(
            (affiliation) =>
              new TableCell({
                children: [new Paragraph(affiliation)],
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
            ...affiliations.map(
              (affiliation) =>
                new TableCell({
                  children: [
                    new Paragraph((counts[affiliation] ?? 0).toString()),
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
      text: "Affiliation",
    }),
    table,
  ];
};