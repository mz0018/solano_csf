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
  selectedOfficeName?: string;
  serviceTransactions: { service: string; totalTransactions: number }[];
}

export const calculateSampleSize = (N: number) => {
  const z = 1.96;
  const p = 0.50;
  const e = 0.05;

  const numerator = N * z * z * p * (1 - p);

  const denominator =
    e * e * (N - 1) + z * z * p * (1 - p);

  return Math.ceil(numerator / denominator);
};

export const calculateResponseRate = (
  responses: number,
  minimumSampleSize: number
) => {
  if (minimumSampleSize <= 0) return "0.00";
  return ((responses / minimumSampleSize) * 100).toFixed(2);
};

export const createResponseRate = ({
  feedback,
  serviceTransactions,
  selectedOfficeName,
}: ResponseRateProps) => {
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
    const minSampleSize = calculateSampleSize(totalTransactions);
    const rate = calculateResponseRate(responses, minSampleSize);

    return { service, responses, totalTransactions, rate, minSampleSize };
  });

  const totalResponses = combined.reduce((sum, r) => sum + r.responses, 0);
  const totalTransactions = combined.reduce(
    (sum, r) => sum + r.totalTransactions,
    0
  );
  const totalSampleSize = calculateSampleSize(totalTransactions);
  const totalResponseRate = calculateResponseRate(
    totalResponses,
    totalSampleSize
  );

  const headerCell = (text: string, alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT) =>
    new TableCell({
      margins: { top: 20, bottom: 20, left: 50, right: 50 },
      shading: { fill: "#1E90FF" },
      children: [
        new Paragraph({
          alignment,
          children: [
            new TextRun({ text, color: "#FFEA00", bold: true }),
          ],
        }),
      ],
    });

  const dataCell = (
    text: string,
    alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT,
    bold = false,
    fill?: string,
    textFill?: string
  ) =>
    new TableCell({
      margins: { top: 20, bottom: 20, left: 50, right: 50 },
      ...(fill && { shading: { fill } }),
      children: [
        new Paragraph({
          alignment,
          children: [new TextRun({ text, bold, ...(textFill && { color: textFill }) })],
        }),
      ],
    });

  const table = new Table({
    indent: { size: 1070, type: "dxa" },
    rows: [
      new TableRow({
        children: [
          headerCell(`${selectedOfficeName}`),
          headerCell("Responses", AlignmentType.CENTER),
          headerCell("Total Transactions", AlignmentType.CENTER),
          headerCell("Minimum Sample Size", AlignmentType.CENTER),
          headerCell("Response Rate", AlignmentType.CENTER),
        ],
      }),

      ...combined.map(
        ({ service, responses, totalTransactions, rate, minSampleSize }) =>
          new TableRow({
            children: [
              dataCell(service),
              dataCell(responses.toString(), AlignmentType.CENTER),
              dataCell(totalTransactions.toString(), AlignmentType.CENTER),
              dataCell(minSampleSize.toString(), AlignmentType.CENTER),
              dataCell(`${rate}%`, AlignmentType.CENTER),
            ],
          })
      ),

      new TableRow({
        children: [
          dataCell("Total", AlignmentType.END, true),
          dataCell(totalResponses.toString(), AlignmentType.CENTER, true, "#FFEA00", "#1E90FF"),
          dataCell(totalTransactions.toString(), AlignmentType.CENTER, true, "#FFEA00", "#1E90FF"),
          dataCell(totalSampleSize.toString(), AlignmentType.CENTER, true, "#FFEA00", "#1E90FF"),
          dataCell(totalResponseRate.toString(), AlignmentType.CENTER, true, "#FFEA00", "#1E90FF"),
        ],
      }),
    ],
  });

  const analysisText =
    combined.length === 0
      ? "No response rate data was provided for analysis."
      : (() => {
          const rateOf = (r: string) => Number(r);

          const byRate = [...combined].sort(
            (a, b) => rateOf(b.rate) - rateOf(a.rate)
          );
          const highest = byRate[0];
          const lowest = byRate[byRate.length - 1];

          const perfect = combined.filter((c) => rateOf(c.rate) >= 100);
          const belowAverage = combined.filter(
            (c) => rateOf(c.rate) < rateOf(totalResponseRate)
          );

          const listNames = (names: string[]) =>
            names.length === 1
              ? `"${names[0]}"`
              : `${names.slice(0, -1).map((n) => `"${n}"`).join(", ")} and "${names[names.length - 1]}"`;

          const perfectSentence =
            perfect.length > 0
              ? ` Services such as ${listNames(perfect.map((c) => c.service))} achieved a 100% response rate, indicating prompt and comprehensive handling of these requests.`
              : ` The highest response rate was recorded by "${highest.service}" at ${highest.rate}%.`;

          const belowSentence =
            belowAverage.length > 0
              ? ` In contrast, services such as ${listNames(belowAverage.map((c) => c.service))} fell below the overall response rate of ${totalResponseRate}%, suggesting potential areas for improvement in responsiveness or procedural efficiency.`
              : ` All services met or exceeded the overall response rate of ${totalResponseRate}%.`;

          return `The data provided details of the response rates for various services offered by the ${selectedOfficeName}. Response rates are crucial indicators of engagement and efficiency in service delivery. Across ${combined.length} services, ${totalResponses} responses were recorded out of ${totalTransactions} total transactions, resulting in an overall response rate of ${totalResponseRate}%.${perfectSentence}${belowSentence} The lowest response rate was recorded by "${lowest.service}" at ${lowest.rate}%, pinpointing an area for targeted improvement. Overall, the data underscores both strengths and areas needing attention, crucial for optimizing service delivery and customer satisfaction within municipal operations.`;
        })();

  return [
    new Paragraph({
      indent: { left: 720 },
      spacing: { after: 300 },
      children: [new TextRun({ text: "E.  Response Rate" })],
    }),

    new Paragraph({ spacing: { after: 300 } }),

    table,

    new Paragraph({ spacing: { after: 300 } }),

    new Paragraph({
      indent: { left: 1060 },
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: analysisText,
        }),
      ],
    }),
  ];
};