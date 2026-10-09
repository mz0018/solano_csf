import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
} from "docx";

import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ResponseRateProps {
  feedback: FeedbackItem[];
  serviceTransactions: { service: string; totalTransactions: number }[];
}

export const createResponseRate = ({ feedback, serviceTransactions }: ResponseRateProps) => {
  const serviceGroups: Record<string, FeedbackItem[]> = {};

  feedback.forEach((item) => {
    const codes: string[] = Array.isArray(item.service)
      ? item.service
      : [item.service];

    codes.forEach((c) => {
      const key = c.startsWith("Other Service:") ? "Other Service" : c;
      serviceGroups[key] ??= [];
      serviceGroups[key].push(item);
    });
  });

  const transactionsMap = new Map(
    serviceTransactions.map((t) => [t.service, t.totalTransactions])
  );

  const combined = Object.entries(serviceGroups).map(([service, items]) => {
    const responses = items.length;
    const totalTransactions = transactionsMap.get(service) ?? 0;
    const rate =
      totalTransactions > 0
        ? ((responses / totalTransactions) * 100).toFixed(2)
        : "0.00";

    return { service, responses, totalTransactions, rate };
  });

  const headerCell = (text: string) =>
    new TableCell({
      margins: { top: 20, bottom: 20, left: 50, right: 50 },
      shading: { fill: "1E90FF" },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text, color: "FCF55F", bold: true })],
        }),
      ],
    });

  const dataCell = (text: string) =>
    new TableCell({
      margins: { top: 20, bottom: 20, left: 50, right: 50 },
      children: [new Paragraph(text)],
    });

  const table = new Table({
    indent: { size: 1070, type: "dxa" },
    rows: [
      new TableRow({
        children: [
          headerCell("Service"),
          headerCell("Responses"),
          headerCell("Total Transactions"),
          headerCell("Response Rate"),
        ],
      }),
      ...combined.map(
        ({ service, responses, totalTransactions, rate }) =>
          new TableRow({
            children: [
              dataCell(service),
              dataCell(responses.toString()),
              dataCell(totalTransactions.toString()),
              dataCell(`${rate}%`),
            ],
          })
      ),
    ],
  });

  return [
    new Paragraph({
      indent: { left: 720 },
      spacing: { after: 300 },
      children: [new TextRun({ text: "E.  Response Rate" })],
    }),

    table,

    new Paragraph({ spacing: { after: 300 } }),
  ];
};