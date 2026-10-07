import { Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType } from "docx";
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
      indent: { size: 1070, type: "dxa" },
      // width: { size: 8290, type: WidthType.DXA },

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
                                      text: "Month",
                                      color: "FCF55F",
                                      bold: true,
                                  }),
                              ],
                          }),
                      ],
                  }),

                  ...affiliations.map(
                      (affiliation) =>
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
                                              text: affiliation,
                                              color: "FCF55F",
                                              bold: true,
                                          }),
                                      ],
                                  }),
                              ],
                          })
                  ),
              ],
          }),

          // Data rows
          ...Object.entries(monthData).map(([month, counts]) =>
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
                              new Paragraph(month),
                          ],
                      }),

                      ...affiliations.map(
                          (affiliation) =>
                              new TableCell({
                                  margins: {
                                      top: 20,
                                      bottom: 20,
                                      left: 50,
                                      right: 50,
                                  },
                                  children: [
                                      new Paragraph(
                                          (counts[affiliation] ?? 0).toString()
                                      ),
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
        alignment: AlignmentType.LEFT,
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: "V.         ",
                bold: true,
            }),
            new TextRun({
                text: "Results of the harmonized CSM for 2023",
                bold: true,
            }),
        ],
    }),

    new Paragraph({
        indent: { left: 720 },
        children: [
            new TextRun({
                text: "A.  Client Demography",
            }),
        ],
    }),

    new Paragraph({
        indent: { left: 1060 },
        children: [
            new TextRun({
                text: "Affiliation",
            }),
        ],
    }),

    table,
  ];
};