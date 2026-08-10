import { Paragraph, Table, TableRow, TableCell } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";
export interface ServiceSurveyed {
  feedback: FeedbackItem[];
}
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

export const createCountServiceQuality = ({ feedback }: ServiceSurveyed) => {
  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Service Quality")] }),
          new TableCell({ children: [new Paragraph("Very Satisfied")] }),
          new TableCell({ children: [new Paragraph("Satisfied")] }),
          new TableCell({ children: [new Paragraph("Neutral")] }),
          new TableCell({ children: [new Paragraph("Dissatisfied")] }),
          new TableCell({ children: [new Paragraph("Very Dissatisfied")] }),
          new TableCell({ children: [new Paragraph("Respondents")] }),
          new TableCell({ children: [new Paragraph("Rating")] }),
        ],
      }),
      ...SERVICE_QUALITY_DIMENSIONS.map(({ label, key }) => {
        const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        feedback.forEach((item) => {
          const rating = item.ratings[key];
          counts[rating] = (counts[rating] ?? 0) + 1;
        });
        const respondents = feedback.length;
        const sum = feedback.reduce((acc, item) => acc + item.ratings[key], 0);
        const rating = respondents > 0 ? (sum / respondents).toFixed(2) : "0.00";
        return new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(label)] }),
            new TableCell({ children: [new Paragraph(counts[5].toString())] }),
            new TableCell({ children: [new Paragraph(counts[4].toString())] }),
            new TableCell({ children: [new Paragraph(counts[3].toString())] }),
            new TableCell({ children: [new Paragraph(counts[2].toString())] }),
            new TableCell({ children: [new Paragraph(counts[1].toString())] }),
            new TableCell({ children: [new Paragraph(respondents.toString())] }),
            new TableCell({ children: [new Paragraph(rating)] }),
          ],
        });
      }),
    ],
  });
  return [
    new Paragraph({
      text: "Count of Service Quality Dimensions results",
    }),
    table,
  ];
};