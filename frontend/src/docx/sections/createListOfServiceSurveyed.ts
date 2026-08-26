import { Paragraph, Table, TableRow, TableCell, TextRun } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ServiceSurveyed {
    feedback: FeedbackItem[]
    selectedOfficeName?: string
}

export const createListOfServiceSurveyed = ({ feedback, selectedOfficeName }: ServiceSurveyed) => {

    const serviceCounts = feedback.reduce<Record<string, number>>((acc, item) => {
        acc[item.service] = (acc[item.service] ?? 0) + 1;
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