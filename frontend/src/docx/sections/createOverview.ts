import { Paragraph, TextRun, AlignmentType } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";
import { formatDate } from "./createCoverPage";

const SERVICE_QUALITY_DIMENSIONS = [
  { label: "Responsiveness", key: "responsiveness" as const },
  { label: "Reliability", key: "reliability" as const },
  { label: "Access and Facilities", key: "accessFacilities" as const },
  { label: "Communication", key: "communication" as const },
  { label: "Costs", key: "costs" as const },
  { label: "Integrity", key: "integrity" as const },
  { label: "Assurance", key: "assurance" as const },
  { label: "Outcome", key: "outcome" as const },
];

export interface OverviewInput {
  feedback: FeedbackItem[];
  selectedOfficeName?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;
}

export const createOverview = ({
  feedback,
  selectedOfficeName,
  selectedDateFrom,
  selectedDateTo,
}: OverviewInput) => {
  const period = `${formatDate(selectedDateFrom)} to ${formatDate(selectedDateTo)}`;

  const dimensionAverages = SERVICE_QUALITY_DIMENSIONS.map(({ label, key }) => {
    const avg =
      feedback.length > 0
        ? feedback.reduce((acc, item) => acc + item.ratings[key], 0) / feedback.length
        : 0;
    return { label, avg };
  });

  const sorted = [...dimensionAverages].sort((a, b) => b.avg - a.avg);
  const highest = sorted[0];
  const second = sorted[1];
  const lowest = sorted[sorted.length - 1];

  const overallAvg =
    dimensionAverages.reduce((acc, d) => acc + d.avg, 0) /
    dimensionAverages.length;

  const fmt = (n: number) => n.toFixed(2);

  const serviceNames = [
    ...new Set(
      feedback.flatMap((f) =>
        (Array.isArray(f.service) ? f.service : [f.service]).map((s) =>
          s.startsWith("Other Service:") ? "Other Service" : s
        )
      )
    ),
  ];

  const listNames = (names: string[]) =>
    names.length === 1
      ? `"${names[0]}"`
      : `${names.slice(0, -1).map((n) => `"${n}"`).join(", ")} and "${names[names.length - 1]}"`;

  const servicesText =
    serviceNames.length > 0 ? listNames(serviceNames) : "various frontline services";

  const satisfactionWord =
    overallAvg >= 4.5 ? "high" : overallAvg >= 3.5 ? "moderate" : "low";

  const nextYear = selectedDateTo
    ? new Date(selectedDateTo).getFullYear() + 1
    : new Date().getFullYear() + 1;

  const keyFindingsText =
    feedback.length === 0
      ? "No client responses were available for the selected period."
      : `The survey encompassed a wide range of services including ${servicesText}. Across these services, the overall satisfaction rating averaged at ${fmt(overallAvg)} on a scale of 1 to 5, reflecting a ${satisfactionWord} level of satisfaction among respondents. Notably, ${highest.label} received the highest rating at ${fmt(highest.avg)}. ${second.label} also scored high, achieving a rating of ${fmt(second.avg)}. However, areas for improvement include ${lowest.label}, rating slightly lower at ${fmt(lowest.avg)}.`;

  return [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 300 },
      children: [
        new TextRun({ text: "II.         ", bold: true }),
        new TextRun({ text: "Overview", bold: true }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { left: 650 },
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: `The Client Satisfaction Measurement (CSM) Report for the ${selectedOfficeName} covers the period from ${period}. This report, mandated under Republic Act No. 9485 (Anti-Red Tape Act of 2007), assesses the satisfaction of clients with frontline services provided by the LGU. The report aims to gauge efficiency and effectiveness across various service quality dimensions.`,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { left: 650 },
      spacing: { after: 300 },
      children: [
        new TextRun({ text: "Key Findings: ", bold: true }),
        new TextRun({ text: keyFindingsText }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { left: 650 },
      spacing: { after: 300 },
      children: [
        new TextRun({ text: "Methodology: ", bold: true }),
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
        new TextRun({ text: "Continuous Improvement: ", bold: true }),
        new TextRun({
          text: `Looking ahead to FY ${nextYear}, recommendations include enhancing the electronic feedback mechanism to streamline operations and conserve resources. Alignment with ISO 9001:2015 International Standard is proposed to ensure compliance and mitigate risks of non-conformity, emphasizing the LGU's commitment to continual service enhancement. `,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { left: 650 },
      spacing: { after: 300 },
      children: [
        new TextRun({ text: "Conclusion: ", bold: true }),
        new TextRun({
          text: `Overall, the CSM Report for ${period} underscores the ${selectedOfficeName}'s commitment to excellence in public service delivery. By leveraging client feedback and adhering to regulatory standards, LGU Solano aims to sustain high levels of client satisfaction and operational efficiency.`,
        }),
      ],
    }),
  ];
};