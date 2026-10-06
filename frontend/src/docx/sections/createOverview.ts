import { Paragraph, TextRun, AlignmentType } from "docx";

export const createOverview = () => {

    return [
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "II.         ",
                    bold: true,
                }),
                new TextRun({
                    text: "Overview",
                    bold: true,
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 650 },
            spacing: { after: 300 },

            children: [
                new TextRun({
                    text: "The Client Satisfaction Measurement (CSM) Report for the Municipal Planning and Development Office of Solano covers the period from January to June 2024. This report, mandated under Republic Act No. 9485 (Anti-Red Tape Act of 2007), assesses the satisfaction of clients with frontline services provided by the LGU. The report aims to gauge efficiency and effectiveness across various service quality dimensions.",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 650 },
            spacing: { after: 300 },

            children: [
                new TextRun({
                text: "Key Findings: ",
                bold: true,
                }),

                new TextRun({
                text: "The survey encompassed a wide range of services including zoning certifications, locational clearances, and data requests, among others. Across these services, the overall satisfaction rating averaged at 4.88 on a scale of 1 to 5, reflecting a high level of satisfaction among respondents. Notably, Access and Facilities received the highest rating at 4.95, indicating robust infrastructure support and accessibility. Responsiveness and Assurance also scored high, each achieving ratings of 4.94, highlighting prompt service delivery and client confidence in service commitments. However, areas for improvement include cost-related concerns, with the Costs dimension rating slightly lower at 4.83.",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 650 },
            spacing: { after: 300 },

            children: [
                new TextRun({
                text: "Methodology: ",
                bold: true,
                }),

                new TextRun({
                text: "The survey employed a standard harmonized CSM questionnaire distributed physically on-site to clients upon service completion. Response rates varied across services showing efficient handling. Feedback was collected monthly and processed through the Human Resource Management Section to ensure systematic review and action on client suggestions and complaints.",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 650 },
            spacing: { after: 300 },

            children: [
                new TextRun({
                text: "Continuous Improvement: ",
                bold: true,
                }),

                new TextRun({
                text: "Looking ahead to FY 2025, recommendations include enhancing the electronic feedback mechanism to streamline operations and conserve resources. Alignment with ISO 9001:2015 International Standard is proposed to ensure compliance and mitigate risks of non-conformity, emphasizing the LGU's commitment to continual service enhancement. ",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 650 },
            spacing: { after: 300 },

            children: [
                new TextRun({
                text: "Conclusion: ",
                bold: true,
                }),

                new TextRun({
                text: "Overall, the CSM Report for January to June 2024 underscores the Municipal Planning and Development Office's commitment to excellence in public service delivery. By leveraging client feedback and adhering to regulatory standards, LGU Solano aims to sustain high levels of client satisfaction and operational efficiency.",
                }),
            ],
        }),

    ]
}