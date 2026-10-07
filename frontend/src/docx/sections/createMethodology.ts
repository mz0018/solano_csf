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
                            new Paragraph("How to send feedback"),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph("Fill out the client feedback form and drop it at the designated drop boxes located in conspicuous places in the building or boxes located outside the offices."),
                        ],
                    }),
                ],
            }),

            // Row 2
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph("How feedback is processed"),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph("At the end of every month, the Human Resource Management Section staff, with a witness from the concerned office, open and collect feedback forms from drop boxes and from offices. These forms will be encoded in the Feedback System. Feedback that requires answer is transmitted to appropriate office for action."),
                        ],
                    }),
                ],
            }),

            // Row 3
            new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph("How to file a complaint"),
                    ],
                }),

                new TableCell({
                        children: [
                            new Paragraph(
                                "Fill out the client feedback form and drop it at the designated drop boxes located in conspicuous places in the building or boxes in the offices. Complaints may also be filed through the contact information provided."
                            ),

                            new Paragraph({
                                spacing: { before: 100, after: 100 },
                                children: [
                                    new TextRun({
                                        text: "The following data are required:",
                                    }),
                                ],
                            }),

                            // Bullet 1
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
                                    after: 0,
                                    line: 1,
                                },
                                children: [
                                    new TextRun({
                                        text: "Name of person being complained",
                                    }),
                                ],
                            }),

                            // Bullet 2
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
                                    after: 0,
                                    line: 1,
                                },
                                children: [
                                    new TextRun({
                                        text: "Incident",
                                    }),
                                ],
                            }),

                            // Bullet 3
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
                                    after: 0,
                                    line: 1,
                                },
                                children: [
                                    new TextRun({
                                        text: "Evidence/Proof",
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),

            // Row 4
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph("How to complaints are processed"),
                        ],
                    }),
                    new TableCell({
                        children: [
                            new Paragraph(
                                "The complaints are received through the HRMS. Upon evaluation, the Administrative Officer, or the duly authorized Complaints Officer, shall start the investigation and submit the report or appropriate action to the Head of Agency."
                            ),

                            new Paragraph(
                                "The Complaints Officer shall give the feedback to the complainant."
                            ),
                        ],
                    }),
                ],
            }),

            // Row 5
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph("Contact Information"),
                        ],
                    }),
                    new TableCell({
                        children: [
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
                                    after: 0,
                                    line: 1,
                                },
                                children: [
                                    new TextRun({
                                        text: "(078) 321-2440",
                                    }),
                                ],
                            }),

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
                                    after: 0,
                                    line: 1,
                                },
                                children: [
                                    new TextRun({
                                        text: "0917-595-1931",
                                    }),
                                ],
                            }),
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
                                    after: 0,
                                    line: 1,
                                },
                                children: [
                                    new TextRun({
                                        text: "hrms.lgusolano@gmail.com",
                                    }),
                                ],
                            }),
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
