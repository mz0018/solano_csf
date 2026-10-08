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

const SERVICE_QUALITY_DIMENSIONS = [
  { label: "Responsiveness", key: "responsiveness" as const },
  { label: "Reliability", key: "reliability" as const },
  { label: "Access and Facilities", key: "accessFacilities" as const },
  { label: "Communication", key: "communication" as const },
  { label: "Costs", key: "costs" as const },
  { label: "Integrity", key: "integrity" as const },
  { label: "Assurance", key: "assurance" as const },
  { label: "Outcome", key: "outcome" as const },
];

export const createCountServiceQuality = ({ feedback }: ServiceSurveyed) => {
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
                    text: "Service Quality",
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
                    text: "Very Satisfied",
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
                    text: "Satisfied",
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
                    text: "Neutral",
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
                    text: "Dissatisfied",
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
                    text: "Very Dissatisfied",
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
                    text: "Respondents",
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
                    text: "Rating",
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
      ...SERVICE_QUALITY_DIMENSIONS.map(({ label, key }) => {
        const counts: Record<number, number> = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        };

        feedback.forEach((item) => {
          const rating = item.ratings[key];
          counts[rating] = (counts[rating] ?? 0) + 1;
        });

        const respondents = feedback.length;
        const sum = feedback.reduce(
          (acc, item) => acc + item.ratings[key],
          0
        );

        const rating =
          respondents > 0 ? (sum / respondents).toFixed(2) : "0.00";

        return new TableRow({
          children: [
            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(label)],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(counts[5].toString())],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(counts[4].toString())],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(counts[3].toString())],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(counts[2].toString())],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(counts[1].toString())],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(respondents.toString())],
            }),

            new TableCell({
              margins: {
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              },
              children: [new Paragraph(rating)],
            }),
          ],
        });
      }),
    ],
  });

  // ---- accurate paragraph: everything computed from feedback ----
  const dimensionAverages = SERVICE_QUALITY_DIMENSIONS.map(({ label, key }) => {
    const avg =
      feedback.length > 0
        ? feedback.reduce((acc, item) => acc + item.ratings[key], 0) / feedback.length
        : 0;
    return { label, avg };
  });

  const sorted = [...dimensionAverages].sort((a, b) => b.avg - a.avg);
  const highest = sorted[0];
  const second = sorted[1];
  const lowest = sorted[sorted.length - 1];

  const overallAvg =
    dimensionAverages.reduce((acc, d) => acc + d.avg, 0) / dimensionAverages.length;
  const fmt = (n: number) => n.toFixed(2);

  const analysisText =
    feedback.length === 0
      ? "No responses were provided for analysis."
      : `Upon analyzing the provided data on service quality dimensions, several insights emerge. Ratings across dimensions range from ${fmt(lowest.avg)} to ${fmt(highest.avg)}, with an overall average of ${fmt(overallAvg)}, indicating ${overallAvg >= 4 ? "a high" : overallAvg >= 3 ? "a moderate" : "a low"} level of satisfaction. ${highest.label} received the highest rating at ${fmt(highest.avg)}, followed closely by ${second.label} at ${fmt(second.avg)}. ${lowest.label} scored the lowest at ${fmt(lowest.avg)}, pinpointing an area for targeted improvement. Overall, these findings underscore areas of strength while highlighting opportunities for enhancement in service provision.`;
  // ---------------------------------------------------------------

  return [
    new Paragraph({
        indent: { left: 720 },
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: "B.  Count of Citizen's Charter and Service Quality Dimension results",
            }),
        ],
    }),

    new Paragraph({
      indent: { left: 1060 },
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "Count of Service Quality Dimensions results",
        }),
      ],
    }),

    table,

    //gap
    new Paragraph({
        spacing: { after: 100 },
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