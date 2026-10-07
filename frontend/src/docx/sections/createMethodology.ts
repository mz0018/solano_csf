import { Paragraph, AlignmentType, TextRun, Table, TableRow, TableCell, WidthType } from "docx"

export const createMethodology = () => {

    //Table Settings
    const table = new Table({
        indent: { size: 1070, type: "dxa" },
        width: { size: 8290, type: WidthType.DXA },

        rows: [
            // Header spanning both columns
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        shading: { fill: "1E90FF" },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Feedback and Collection Mechanism",
                                        color: "FCF55F",
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),

            // Row 1
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph("Client Satisfaction Feedback Form"),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph("150"),
                        ],
                    }),
                ],
            }),

            // Row 2
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph("Suggestion Box"),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph("75"),
                        ],
                    }),
                ],
            }),

            // Row 3
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph("Online Feedback"),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph("50"),
                        ],
                    }),
                ],
            }),
        ],
    });

    return [
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "IV.         ",
                    bold: true,
                }),
                new TextRun({
                    text: "Methodology",
                    bold: true,
                }),
            ],
        }),

        //Sampling
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "a.   ",
                    bold: true,
                }),
                new TextRun({
                    text: "Sampling",
                    bold: true,
                }),
            ],
        }),

        // numbering 1
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: {
                left: 1440,
                hanging: 360,
            },
            numbering: {
                reference: "roman-list",
                level: 0,
            },
            spacing: { after: 150 },
            children: [
                new TextRun({
                    text: "The mode of survey implementation is on-site. The CSF form is given to the client once transaction is completed. The CSF form is then dropped in the CSF boxes near the entrance of the office.",
                }),
            ],
        }),

        // numbering 2
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: {
                left: 1440,
                hanging: 360,
            },
            numbering: {
                reference: "roman-list",
                level: 0,
            },
            spacing: { after: 150 },
            children: [
                new TextRun({
                    text: "As of June 30, 2024, no online surveys are implemented by the LGU Solano.",
                }),
            ],
        }),
        //------------------

        //Feedback and Collection Mechanism
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 300 },
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "b.   ",
                    bold: true,
                }),
                new TextRun({
                    text: "Feedback and Collection Mechanism",
                    bold: true,
                }),
            ],
        }),

        //Table Feedback and Collection Mechanism
        table,
    ]
}
