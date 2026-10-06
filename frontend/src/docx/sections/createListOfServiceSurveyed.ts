import { Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, WidthType } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";
import { formatDate } from "./createCoverPage";

export interface ServiceSurveyed {
    feedback: FeedbackItem[]
    selectedOfficeName?: string
    selectedDateFrom?: string
    selectedDateTo?: string
}

export const createListOfServiceSurveyed = ({ feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }: ServiceSurveyed) => {

    const serviceCounts = feedback.reduce<Record<string, number>>((acc, item) => {
        const codes: string[] = Array.isArray((item).service) ? (item).service : [(item).service]
        codes.forEach(c => {
            acc[c] = (acc[c] ?? 0) + 1;
        })
        return acc;
    }, {});

    //Table Settings
    const table = new Table({
        indent: { size: 1070, type: "dxa" },
        width: { size: 8290, type: WidthType.DXA },
        rows: [
        new TableRow({
            children: [
                new TableCell({
                    shading: { fill: "1E90FF" },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${selectedOfficeName}`,
                                    color: "FCF55F",
                                    bold: true,
                                }),
                            ],
                            }),
                        ],
                    }),
                new TableCell({
                    shading: { fill: "1E90FF" },
                    children: [
                    new Paragraph({
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
            ],
        }),

        ...Object.entries(serviceCounts).map(
            ([service, count]) =>
            new TableRow({
                children: [
                new TableCell({
                    children: [new Paragraph(service)],
                }),
                new TableCell({
                    children: [new Paragraph(count.toString())],
                }),
                ],
            })
        ),
        ],
    });

    const tableSpacing = new Paragraph({
        text: "",
        spacing: { after: 200 },
    });

  return [
    new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: "III.         ",
                bold: true,
            }),
            new TextRun({
                text: "Scope",
                bold: true,
            }),
        ],
    }),

    //Period Covered
    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 720 },
        children: [
            new TextRun({
                text: "a.   ",
                bold: true,
            }),
            new TextRun({
                text: "Period Covered",
                bold: true,
            }),
        ],
    }),

    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 1070 },
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: `The Local Government Unit of Solano conducted surveys throughout the month of ${formatDate(selectedDateFrom)} to ${formatDate(selectedDateTo)}.`,
            }),
        ],
    }),

    //Office Coverage
    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 720 },
        children: [
            new TextRun({
                text: "b.   ",
                bold: true,
            }),
            new TextRun({
                text: "Office Coverage",
                bold: true,
            }),
        ],
    }),

    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 1070 },
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: `LGU Solano conducted physical and on-site surveys in the ${selectedOfficeName}.`,
            }),
        ],
    }),

    //List of Services Surveyed
    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 720 },
        children: [
            new TextRun({
                text: "c.   ",
                bold: true,
            }),
            new TextRun({
                text: "List of Services Surveyed (as reflected in the CSF Form SOL.F.020)",
                bold: true,
            }),
        ],
    }),

    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 1070 },
        children: [
            new TextRun({
                text: "External Services",
            }),
        ],
    }),

    //List of Services Surveyed Table
    table,
    tableSpacing,

    //The Service Quality Dimensions
    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 720 },
        children: [
            new TextRun({
                text: "d.   ",
                bold: true,
            }),
            new TextRun({
                text: "The Service Quality Dimensions",
                bold: true,
            }),
        ],
    }),

    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 1070 },
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: "The survey used the following: ",
            }),
        ],
    }),

    //A standard harmonized CSM
    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 1070 },
        children: [
            new TextRun({
                text: "A standard harmonized CSM questionnaire. It asked clients demographic",
            }),
        ],
    }),

    new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 1070 },
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: "questions, and (8) questions related to the following Service Quality Dimensions:",
            }),
        ],
    }),

    new Paragraph({
        alignment: AlignmentType.LEFT,
        indent: { left: 1500 },
        children: [
            new TextRun({ text: "a.  Responsiveness", break: 0 }),
            new TextRun({ text: "b.  Reliability", break: 1 }),
            new TextRun({ text: "c.  Access and Facilities", break: 1 }),
            new TextRun({ text: "d.  Communication", break: 1 }),
            new TextRun({ text: "e.  Costs", break: 1 }),
            new TextRun({ text: "f.  Integrity", break: 1 }),
            new TextRun({ text: "g.  Assurance", break: 1 }),
            new TextRun({ text: "h.  Outcome", break: 1 }),
        ],
    }),
  ];
  
};