import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
  WidthType,
} from "docx";

import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ServiceSurveyed {
  feedback: FeedbackItem[];
  selectedDateFrom?: string;
  selectedDateTo?: string;
}

export const createFreeResponses = ({
  feedback,
  selectedDateFrom,
  selectedDateTo,
}: ServiceSurveyed) => {
  const monthGroups: Record<string, string[]> = {};

  feedback.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
    });

    if (
      item.comments &&
      item.comments.trim() !== "" &&
      item.comments !== "NA"
    ) {
      monthGroups[month] ??= [];
      monthGroups[month].push(item.comments);
    }
  });

  // every month in the selected date range, in order (inclusive)
  const rangeMonths: string[] = [];

  if (selectedDateFrom && selectedDateTo) {
    const start = new Date(`${selectedDateFrom}T00:00:00`);
    const end = new Date(`${selectedDateTo}T00:00:00`);
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);

    while (cursor <= end) {
      rangeMonths.push(
        cursor.toLocaleString("default", { month: "long" })
      );

      cursor.setMonth(cursor.getMonth() + 1);
    }
  }

  // use the full range; if no dates given, fall back to months found in the data
  const allMonths =
    rangeMonths.length > 0
      ? [...new Set(rangeMonths)]
      : [
          ...new Set(
            feedback.map((item) =>
              new Date(item.createdAt).toLocaleString("default", {
                month: "long",
              })
            )
          ),
        ];

  const tables: Table[] = [];

  if (allMonths.length === 0) {
    tables.push(
      new Table({
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
                        text: "Comments",
                        color: "FCF55F",
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // No Free responses
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
                  new Paragraph("No Free Responses"),
                ],
              }),
            ],
          }),
        ],
      })
    );
  } else {
    allMonths.forEach((month) => {
      const comments = monthGroups[month] ?? [];

      tables.push(
        new Table({
          indent: { size: 1070, type: "dxa" },
          width: { size: 8290, type: WidthType.DXA },

          rows: [
            // Month header
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
                          text: `${month}`,
                          color: "FCF55F",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Comments or No Free Responses
            ...(comments.length > 0
              ? [
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          top: 20,
                          bottom: 20,
                          left: 50,
                          right: 50,
                        },

                        // All comments are placed inside ONE cell
                        // as bullet paragraphs.
                        children: comments.map(
                          (comment) =>
                            new Paragraph({
                              numbering: {
                                reference: "light-bullet",
                                level: 0,
                              },
                              indent: {
                                left: 720,
                                hanging: 360,
                              },
                              spacing: {
                                before: 0,
                                after: 50,
                                line: 1,
                              },
                              children: [
                                new TextRun({
                                  text: comment,
                                }),
                              ],
                            })
                        ),
                      }),
                    ],
                  }),
                ]
              : [
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
                          new Paragraph("No Free Responses"),
                        ],
                      }),
                    ],
                  }),
                ]),
          ],
        })
      );
    });
  }

  return [
    new Paragraph({
      indent: { left: 720 },
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "D.  Free responses",
        }),
      ],
    }),

    new Paragraph({
      indent: { left: 1060 },
      children: [
        new TextRun({
          text: "The following are the verbatim comments/suggestions of the respondents:",
        }),
      ],
    }),

    ...tables,
  ];
};