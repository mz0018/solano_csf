import { Paragraph, Table, TableRow, TableCell, TextRun } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";
export interface ServiceSurveyed {
  feedback: FeedbackItem[];
}
export const createAverageScorePerService = ({ feedback }: ServiceSurveyed) => {
  const serviceGroups: Record<string, FeedbackItem[]> = {};
  feedback.forEach((item) => {
    serviceGroups[item.service] ??= [];
    serviceGroups[item.service].push(item);
  });
  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Service")] }),
          new TableCell({ children: [new Paragraph("Responses")] }),
          new TableCell({ children: [new Paragraph("Average Score")] }),
        ],
      }),
      ...Object.entries(serviceGroups).map(([service, items]) => {
        const sum = items.reduce((acc, item) => {
          const ratings = Object.values(item.ratings);
          return acc + ratings.reduce((a, b) => a + b, 0) / ratings.length;
        }, 0);
        const avg = items.length > 0 ? (sum / items.length).toFixed(2) : "0.00";
        return new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(service)] }),
            new TableCell({ children: [new Paragraph(items.length.toString())] }),
            new TableCell({ children: [new Paragraph(avg)] }),
          ],
        });
      }),
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
            text: "Average Score Per Service",
            bold: true,
            }),
        ],
    }),
    table,
    tableSpacing,
  ];
};