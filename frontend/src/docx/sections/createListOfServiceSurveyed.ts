import { Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType } from "docx";
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

    const table = new Table({
        rows: [
        new TableRow({
            children: [
            new TableCell({
                children: [new Paragraph(`${selectedOfficeName}`)],
            }),
            new TableCell({
                children: [new Paragraph("Responses")],
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
        spacing: {
            after: 200,
        },
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

    new Paragraph({
        children: [
            new TextRun({
            text: "List of services surveyed",
            bold: true,
            }),
        ],
    }),

    table,
    tableSpacing,
  ];
};