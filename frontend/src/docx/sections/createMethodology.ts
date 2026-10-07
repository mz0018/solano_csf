import { Paragraph, AlignmentType, TextRun, Table, TableRow, TableCell, WidthType } from "docx"

export const createMethodology = () => {

    //Table Settings
    const table = new Table({
        indent: { size: 1070, type: "dxa" },
        width: { size: 8290, type: WidthType.DXA },
        layout: "fixed",
        columnWidths: [4000, 4290],

        rows: [
            // Header spanning both columns
            new TableRow({
                children: [
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
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
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        children: [
                            new Paragraph("How to send feedback"),
                        ],
                    }),
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
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
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        children: [
                            new Paragraph("How feedback is processed"),
                        ],
                    }),
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
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
                    margins: { top: 20, bottom: 20, left: 50, right: 50 },
                    children: [
                        new Paragraph("How to file a complaint"),
                    ],
                }),

                new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
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
                                    after: 50,
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
                                    after: 50,
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
                                    after: 50,
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
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        children: [
                            new Paragraph("How to complaints are processed"),
                        ],
                    }),
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        children: [
                            new Paragraph(
                                "The complaints are received through the HRMS. Upon evaluation, the Administrative Officer, or the duly authorized Complaints Officer, shall start the investigation and submit the report or appropriate action to the Head of Agency."
                            ),

                            new Paragraph({
                                spacing: { before: 300 },
                                children: [
                                    new TextRun(
                                        "The Complaints Officer shall give the feedback to the complainant."
                                    ),
                                ],
                            }),
                        ],
                    }),
                ],
            }),

            // Row 5
            new TableRow({
                children: [
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        children: [
                            new Paragraph("Contact Information"),
                        ],
                    }),
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
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
                                    after: 50,
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
                                    after: 50,
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
                                    after: 50,
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

    //Contact object data
    const contactData = [
        {
            office: "Municipal Mayor’s Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0917-595-1931",
        },
        {
            office: "Human Resource Management Section",
            address: "Solano, Nueva Vizcaya",
            contact: "0905-416-9123",
        },
        {
            office: "Business Permits and Licensing Section",
            address: "Solano, Nueva Vizcaya",
            contact: "0997-423-2079",
        },
        {
            office: "Sangguniang Bayan Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0919-091-9974",
        },
        {
            office: "Municipal Planning and Development Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0965-377-2450",
        },
        {
            office: "Municipal Civil Registrar’s Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0917-568-0286",
        },
        {
            office: "Municipal General Services Office",
            address: "Solano, Nueva Vizcaya",
            contact: "(078) 392-1082",
        },
        {
            office: "Municipal Budget Office",
            address: "Solano, Nueva Vizcaya",
            contact: "(075) 392-0825",
        },
        {
            office: "Municipal Accounting Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0916-333-6115",
        },
        {
            office: "Municipal Treasurer’s Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0955-920-8671",
        },
        {
            office: "Municipal Assessor’s Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0995-912-5472",
        },
        {
            office: "Municipal Health Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0967-910-3054",
        },
        {
            office: "Municipal Social Welfare and Development Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0953-372-8687",
        },
        {
            office: "Municipal Agriculture Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0915-485-6010",
        },
        {
            office: "Municipal Engineering Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0926-274-8598",
        },
        {
            office: "Solano Economic Enterprise and Development Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0953-752-6267",
        },
        {
            office: "Municipal Disaster Risk Reduction and Management Office",
            address: "Solano, Nueva Vizcaya",
            contact: "0926-383-3744",
        },
    ];

    //Contact Table
    const contactTable = new Table({
        indent: { size: 1070, type: "dxa" },
        width: { size: 8290, type: WidthType.DXA },
        layout: "fixed",
        columnWidths: [3500, 2400, 2390],

        rows: [
            // Header
            new TableRow({
                children: [
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        shading: { fill: "1E90FF" },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Office",
                                        color: "FCF55F",
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        shading: { fill: "1E90FF" },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Address",
                                        color: "FCF55F",
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        shading: { fill: "1E90FF" },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Contact Information",
                                        color: "FCF55F",
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),

            ...contactData.map((data) =>
                new TableRow({
                    children: [
                        new TableCell({
                            margins: { top: 20, bottom: 20, left: 50, right: 50 },
                            children: [
                                new Paragraph(data.office),
                            ],
                        }),

                        new TableCell({
                            margins: { top: 20, bottom: 20, left: 50, right: 50 },
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun(data.address),
                                    ],
                                }),
                            ],
                        }),

                        new TableCell({
                            margins: { top: 20, bottom: 20, left: 50, right: 50 },
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun(data.contact),
                                    ],
                                }),
                            ],
                        }),
                    ],
                })
            ),
        ],
    });

    //Scoring object data
    const scoringData = [
        {
            rating: "5",
            description: "Very Satisfied",
        },
        {
            rating: "4",
            description: "Satisfied",
        },
        {
            rating: "3",
            description: "Neutral",
        },
        {
            rating: "2",
            description: "Dissatisfied",
        },
        {
            rating: "1",
            description: "Very Dissatisfied",
        },
    ];

    //Scoring System Table
    const scoringSystemTable = new Table({
        indent: { size: 1800, type: "dxa" },
        width: { size: 5000, type: WidthType.DXA },
        layout: "fixed",
        columnWidths: [2500, 2500],

        rows: [
            // Header
            new TableRow({
                children: [
                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
                        shading: { fill: "1E90FF" },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Scale",
                                        color: "FCF55F",
                                        bold: true,
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new TableCell({
                        margins: { top: 20, bottom: 20, left: 50, right: 50 },
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

            // Dynamic rows
            ...scoringData.map((data) =>
                new TableRow({
                    children: [
                        new TableCell({
                            margins: { top: 20, bottom: 20, left: 50, right: 50 },
                            children: [
                                new Paragraph({ 
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun({ text: data.rating })
                                    ],
                                }),
                            ],
                        }),

                        new TableCell({
                            margins: { top: 20, bottom: 20, left: 50, right: 50 },
                            children: [
                                new Paragraph(data.description),
                            ],
                        }),
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

        //gap
        new Paragraph({
            spacing: { after: 300 },
        }),

        //Contact table
        contactTable,

        //gap
        new Paragraph({
            spacing: { after: 300 },
        }),

        //Scoring System
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "c.   ",
                    bold: true,
                }),
                new TextRun({
                    text: "Scoring System",
                    bold: true,
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 1500 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "i.   ",
                    bold: true,
                }),
                new TextRun({
                    text: "Table of the scale and its equivalent number",
                    bold: true,
                }),
            ],
        }),

        scoringSystemTable,
        
    ]
}
