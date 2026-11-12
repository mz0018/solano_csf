import { Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, WidthType } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";
import { formatDate } from "./createCoverPage";

export interface ServiceSurveyed {
    feedback: FeedbackItem[];
    serviceTransactions: { service: string; totalTransactions: number }[];
    selectedOfficeName?: string;
    selectedDateFrom?: string;
    selectedDateTo?: string;
    services: { service: string; type: string }[];
}

export const createListOfServiceSurveyed = ({
    feedback,
    serviceTransactions,
    selectedOfficeName,
    selectedDateFrom,
    selectedDateTo,
    services,
}: ServiceSurveyed) => {

    const getServiceKey = (s: string) => (s.startsWith("Other Service:") ? "Other Service" : s);

    const typeByService = new Map(
        services.map(({ service, type }) => [service, type.toLowerCase()])
    );

    const getServiceType = (s: string) => {
        const key = getServiceKey(s);
        const type = typeByService.get(s) ?? typeByService.get(key);
        return type ? type.toLowerCase() : "";
    };

    const responsesPerService = feedback.reduce<Record<string, number>>((acc, item) => {
        const codes: string[] = Array.isArray(item.service) ? item.service : [item.service];
        codes.forEach((c) => {
            const key = getServiceKey(c);
            acc[key] = (acc[key] ?? 0) + 1;
        });
        return acc;
    }, {});

    const headerCell = (text: string) =>
        new TableCell({
            margins: { top: 20, bottom: 20, left: 50, right: 50 },
            shading: { fill: "4472C4" },
            children: [
                new Paragraph({
                    children: [new TextRun({ text, color: "FFFF00", bold: true })],
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

    const externalServices = serviceTransactions.filter(
        (t) => getServiceType(t.service) === "external"
    );

    const internalServices = serviceTransactions.filter(
        (t) => getServiceType(t.service) === "internal"
    );

    const totalResponsesExternal = externalServices.reduce(
        (sum, t) => sum + (responsesPerService[getServiceKey(t.service)] ?? 0),
        0
    );
    const totalTransactionsExternal = externalServices.reduce(
        (sum, t) => sum + t.totalTransactions,
        0
    );

    const totalResponsesInternal = internalServices.reduce(
        (sum, t) => sum + (responsesPerService[getServiceKey(t.service)] ?? 0),
        0
    );
    const totalTransactionsInternal = internalServices.reduce(
        (sum, t) => sum + t.totalTransactions,
        0
    );

    const externalTable = new Table({
        indent: { size: 1070, type: "dxa" },
        width: { size: 8290, type: WidthType.DXA },
        rows: [
            new TableRow({
                children: [
                    headerCell(`${selectedOfficeName}`),
                    headerCell("Responses"),
                    headerCell("Total Transactions"),
                ],
            }),

            ...externalServices.map(({ service, totalTransactions }) =>
                new TableRow({
                    children: [
                        dataCell(service),
                        dataCell((responsesPerService[getServiceKey(service)] ?? 0).toString(), AlignmentType.CENTER),
                        dataCell(totalTransactions.toString(), AlignmentType.CENTER),
                    ],
                })
            ),

            new TableRow({
                children: [
                    dataCell("Total", AlignmentType.END, true),
                    dataCell(totalResponsesExternal.toString(), AlignmentType.CENTER, true, "#FFFF00", "#4472C4"),
                    dataCell(totalTransactionsExternal.toString(), AlignmentType.CENTER, true, "#FFFF00", "#4472C4"),
                ],
            }),
        ],
    });

    const internalTable = new Table({
        indent: { size: 1070, type: "dxa" },
        width: { size: 8290, type: WidthType.DXA },
        rows: [
            new TableRow({
                children: [
                    headerCell(`${selectedOfficeName}`),
                    headerCell("Responses"),
                    headerCell("Total Transactions"),
                ],
            }),

            ...internalServices.map(({ service, totalTransactions }) =>
                new TableRow({
                    children: [
                        dataCell(service),
                        dataCell((responsesPerService[getServiceKey(service)] ?? 0).toString(), AlignmentType.CENTER),
                        dataCell(totalTransactions.toString(), AlignmentType.CENTER),
                    ],
                })
            ),

            new TableRow({
                children: [
                    dataCell("Total", AlignmentType.END, true),
                    dataCell(totalResponsesInternal.toString(), AlignmentType.CENTER, true, "#FFFF00", "#4472C4"),
                    dataCell(totalTransactionsInternal.toString(), AlignmentType.CENTER, true, "#FFFF00", "#4472C4"),
                ],
            }),
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
                new TextRun({ text: "III.         ", bold: true }),
                new TextRun({ text: "Scope", bold: true }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 },
            children: [
                new TextRun({ text: "a.   ", bold: true }),
                new TextRun({ text: "Period Covered", bold: true }),
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
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 },
            children: [
                new TextRun({ text: "b.   ", bold: true }),
                new TextRun({ text: "Office Coverage", bold: true }),
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

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 },
            children: [
                new TextRun({ text: "c.   ", bold: true }),
                new TextRun({ text: "List of Services Surveyed (as reflected in the CSF Form SOL.F.020)", bold: true }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 1070 },
            children: [
                new TextRun({ text: "External Services" }),
            ],
        }),

        externalTable,
        tableSpacing,

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 1070 },
            spacing: { before: 200 },
            children: [
                new TextRun({ text: "Internal Services" }),
            ],
        }),

        internalTable,
        tableSpacing,

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 },
            children: [
                new TextRun({ text: "d.   ", bold: true }),
                new TextRun({ text: "The Service Quality Dimensions", bold: true }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 1070 },
            spacing: { after: 300 },
            children: [
                new TextRun({ text: "The survey used the following: " }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 1070 },
            children: [
                new TextRun({ text: "A standard harmonized CSM questionnaire. It asked clients demographic" }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 1070 },
            spacing: { after: 300 },
            children: [
                new TextRun({ text: "questions, and (8) questions related to the following Service Quality Dimensions:" }),
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