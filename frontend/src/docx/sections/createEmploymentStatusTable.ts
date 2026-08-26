import { Paragraph, Table, TableRow, TableCell, TextRun } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ServiceSurveyed {
  feedback: FeedbackItem[];
}

export const createEmploymentStatusTable = ({ feedback }: ServiceSurveyed) => {
  const employmentStatuses = [...new Set(feedback.map(f => f.client.employmentStatus))];

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
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Month")],
          }),
          ...employmentStatuses.map(
            (employmentStatus) =>
              new TableCell({
                children: [new Paragraph(employmentStatus)],
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
            ...employmentStatuses.map(
              (employmentStatus) =>
                new TableCell({
                  children: [
                    new Paragraph((counts[employmentStatus] ?? 0).toString()),
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
            text: "Employment Status",
            bold: true,
            }),
        ],
    }),
    table,
    tableSpacing,
  ];
};