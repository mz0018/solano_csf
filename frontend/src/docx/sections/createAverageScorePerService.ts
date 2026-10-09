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
  selectedOfficeName?: string;
}

export const createAverageScorePerService = ({
  feedback,
  selectedOfficeName
}: ServiceSurveyed) => {
  const serviceGroups: Record<string, FeedbackItem[]> = {};

  feedback.forEach((item) => {
    const codes: string[] = Array.isArray((item).service)
      ? (item).service
      : [(item).service];

    codes.forEach((c) => {
      const key = c.startsWith("Other Service:") ? "Other Service" : c;
      serviceGroups[key] ??= [];
      serviceGroups[key].push(item);
    });
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
                    text: "Service",
                    color: "FCF55F",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),

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
                    text: "Responses",
                    color: "FCF55F",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),

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
                    text: "Average Score",
                    color: "FCF55F",
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

      // Data rows
      ...Object.entries(serviceGroups).map(([service, items]) => {
        const sum = items.reduce((acc, item) => {
          const ratings = Object.values(item.ratings);

          return (
            acc +
            ratings.reduce((a, b) => a + b, 0) / ratings.length
          );
        }, 0);

        const avg =
          items.length > 0
            ? (sum / items.length).toFixed(2)
            : "0.00";

        return new TableRow({
          children: [
            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [
                new Paragraph(service),
              ],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [
                new Paragraph(items.length.toString()),
              ],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [
                new Paragraph(avg),
              ],
            }),
          ],
        });
      }),
    ],
  });

  // ---- accurate paragraph: everything computed from feedback ----
  const serviceStats = Object.entries(serviceGroups).map(([service, items]) => {
    const total = items.reduce((acc, item) => {
      const ratings = Object.values(item.ratings);
      return acc + ratings.reduce((a, b) => a + b, 0) / ratings.length;
    }, 0);
    return {
      service,
      responses: items.length,
      avg: items.length > 0 ? total / items.length : 0,
    };
  });

  const byAvg = [...serviceStats].sort((a, b) => b.avg - a.avg);
  const highest = byAvg[0];
  const lowest = byAvg[byAvg.length - 1];
  const minAvg = Math.min(...serviceStats.map((s) => s.avg));
  const maxAvg = Math.max(...serviceStats.map((s) => s.avg));
  const overallAvg = serviceStats.reduce((a, s) => a + s.avg, 0) / serviceStats.length;

  const perfect = serviceStats.filter((s) => s.avg === 5);
  const mostResponses = [...serviceStats].sort((a, b) => b.responses - a.responses)[0];
  const minResp = Math.min(...serviceStats.map((s) => s.responses));
  const maxResp = Math.max(...serviceStats.map((s) => s.responses));

  const fmt = (n: number) => n.toFixed(2);
  const listNames = (names: string[]) =>
    names.length === 1
      ? `"${names[0]}"`
      : `${names.slice(0, -1).map((n) => `"${n}"`).join(", ")} and "${names[names.length - 1]}"`;

  const satWord = overallAvg >= 4.5 ? "high" : overallAvg >= 3.5 ? "moderate" : "low";
  const perfectSentence =
    perfect.length > 0
      ? ` Services with perfect scores, such as ${listNames(perfect.map((s) => s.service))}, highlight exemplary performance and customer delight.`
      : ` The highest-scoring service, "${highest.service}", reached an average of ${fmt(highest.avg)}, highlighting exemplary performance.`;

  const analysisText =
    feedback.length === 0 || serviceStats.length === 0
      ? "No responses were provided for analysis."
      : `The external services offered by the ${selectedOfficeName ?? "office"} generally reflect ${satWord} levels of customer satisfaction, as indicated by average scores ranging from ${fmt(minAvg)} to ${fmt(maxAvg)}. ${perfectSentence} Response counts range from ${minResp} to ${maxResp} per service, with "${mostResponses.service}" recording the most at ${mostResponses.responses} responses. The lowest-scoring service, "${lowest.service}" recorded an average of ${fmt(lowest.avg)}, pinpointing an area for continued focus. Overall, continued focus on improving response coverage and maintaining high service standards will be essential for sustaining positive public perception and operational excellence.`;
  // ---------------------------------------------------------------

  return [
    new Paragraph({
      indent: { left: 720 },
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "C.  Average Score per service",
        }),
      ],
    }),

    new Paragraph({
      indent: { left: 1060 },
      children: [
        new TextRun({
          text: "External Service",
        }),
      ],
    }),

    table,

    //gap
    new Paragraph({
        spacing: { after: 300 },
    }),

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