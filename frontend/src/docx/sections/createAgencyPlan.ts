import {
    Paragraph,
    AlignmentType,
    TextRun,
    WidthType,
    Table,
    TableCell,
    TableRow,
    ExternalHyperlink
} from "docx";

export const createAgencyPlan = () => {
    const rows = [
        ["Clause 4.1", "Understanding the Organization and its Context"],
        ["Clause 4.2", "Understanding the needs and expectation of interested parties"],
        ["Clause 4.4", "Processes"],
        ["Clause 5.1.2", "Customer Focus"],
        ["Clause 7.1", "Support"],
        ["Clause 8.2.2", "Determining the requirements for products and services"],
        ["Clause 8.2.3", "Review of the requirements for products and services"],
        ["Clause 8.3.3", "Design and development inputs"],
        ["Clause 8.4.2", "Type and extent of control"],
        ["Clause 8.5.5", "Post Delivery Activities"],
    ];

    const linksTable = new Table({
        indent: { size: 1070, type: "dxa" },
        rows: [
            // Header row
            new TableRow({
                children: ["Month/Year", "Link to form"].map(
                    (text) =>
                        new TableCell({
                            margins: {
                                top: 20,
                                bottom: 20,
                                left: 50,
                                right: 50,
                            },
                            shading: { fill: "4472C4" },
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun({
                                            text,
                                            color: "FFFF00",
                                            bold: true,
                                        }),
                                    ],
                                }),
                            ],
                        })
                ),
            }),

            // Data rows for links
            ...[
                ["January 2024", "https://forms.office.com/r/47ftYWZQTm"],
                ["February 2024", "https://forms.office.com/r/xnbsN7dr8e"],
                ["March 2024", "https://forms.office.com/r/J7ej8Df4X1"],
                ["April 2024", "https://forms.office.com/r/qncNsTyJzc"],
                ["May 2024", "https://forms.office.com/r/q3NBMBA01v"],
                ["June 2024", "https://forms.office.com/r/L9icVr75Nf"],
            ].map(
                ([month, link]) =>
                    new TableRow({
                        children: [
                            new TableCell({
                                margins: {
                                    top: 20,
                                    bottom: 20,
                                    left: 50,
                                    right: 50,
                                },
                                children: [new Paragraph(month)],
                            }),
                            new TableCell({
                                margins: {
                                    top: 20,
                                    bottom: 20,
                                    left: 50,
                                    right: 50,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new ExternalHyperlink({
                                                link,
                                                children: [
                                                    new TextRun({
                                                        text: link,
                                                        style: "Hyperlink",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    })
            ),
        ],
    });

    const table = new Table({
        indent: { size: 1070, type: "dxa" },
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: rows.map(
            (row) =>
                new TableRow({
                    children: row.map(
                        (cellText) =>
                            new TableCell({
                                margins: {
                                    top: 20,
                                    bottom: 20,
                                    left: 50,
                                    right: 50,
                                },
                                width: {
                                    size: 50,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: cellText,
                                            }),
                                        ],
                                    }),
                                ],
                            })
                    ),
                })
        ),
    });

    const numberedParagraph = (number: number, text: string) =>
        new Paragraph({
            indent: {
                left: 1080,
                hanging: 360,
            },
            tabStops: [
                {
                    type: "left",
                    position: 360,
                },
            ],
            children: [
                new TextRun({
                    text: `${number}.\t${text}`,
                }),
            ],
        });

    return [
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "VI.         ",
                    bold: true,
                }),
                new TextRun({
                    text: "Results of Agency Action Plan reported in FY 2023",
                    bold: true,
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 1070 },
            children: [
                new TextRun({
                    text: "No data",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "VII.         ",
                    bold: true,
                }),
                new TextRun({
                    text: "Continuous Agency Improvement Plan for FY 2025",
                    bold: true,
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "(Proposal based on observations and the ISO 9001:2015 International Standard)",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "A.   The use of a HARMONIZED CSM for the LGU.",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "Reason: ",
                }),
            ],
        }),

        numberedParagraph(1, "LGU Solano may be reprimanded by the Authority"),

        numberedParagraph(2, "There is a major risk of non-conformity findings in implementing client satisfaction survey forms that is not compliant to a statutory or regulatory requirement"),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ indent: { left: 1070 }, children: [ new TextRun({ text: "ISO 9001:2015 Clauses non-conformities: " }) ] }),
        table,

        new Paragraph({ spacing: { after: 200 } }),
        numberedParagraph(3, "Alignment of Citizen's Charter to its Client Satisfaction Measurement"),

        numberedParagraph(4, "Paperless Client Satisfaction Feedback Form: The HRMS proposes a paperless feedback mechanism by using an electronic platform, such as but not limited to, Google Form and Microsoft 365 Form. This will save resources such as time and materials."),
        new Paragraph({ spacing: { after: 300 } }),


        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "VIII.         ",
                    bold: true,
                }),
                new TextRun({
                    text: "Index",
                    bold: true,
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "A.   Clear image of physical CSM survey used",
                    bold: true
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "B.   Generated Microsoft 365 sheets",
                    bold: true
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "C.   Generated Microsoft 365 Excel Sheet",
                    bold: true
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "D.   Link to the Client Satisfaction Feedback form",
                    bold: true
                }),
            ],
        }),

        linksTable,

    ];
};