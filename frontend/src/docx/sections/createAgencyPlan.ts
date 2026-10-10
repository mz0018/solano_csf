import { Paragraph, AlignmentType, TextRun } from "docx"

export const createAgencyPlan = () => {

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
            indent: { left: 720 },
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
            children: [
                new TextRun({
                    text: "(Proposal based on observations and the ISO 9001:2015 International Standard)",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "A.   The use of a HARMONIZED CSM for the LGU.",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "Reason: ",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "1.   LGU Solano may be reprimanded by the Authority",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "2.   There is a major risk of non-conformity findings in implementing client satisfaction survey forms that is not compliant to a statutory or regulatory requirement",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "3.   Alignment of Citizen's Charter to its Client Satisfaction Measurement",
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 720 },
            children: [
                new TextRun({
                    text: "4.   Paperless Client Satisfaction Feedback Form: The HRMS proposes a paperless feedback mechanism by using an electronic platform, such as but not limited to, Google Form and Microsoft 365 Form. This will save resources such as time and materials.",
                }),
            ],
        }),
    ]
}