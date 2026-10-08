import { Paragraph, TextRun } from "docx"
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ResponseRateProps {
  feedback: FeedbackItem[];
  selectedOfficeName?: string;
}

export const createResponseRate = ({ feedback, selectedOfficeName }: ResponseRateProps) => {

    console.log(feedback, selectedOfficeName)

    return [
        new Paragraph({
            indent: { left: 720 },
            spacing: { after: 300 },
            children: [
            new TextRun({
                text: "E.  Response Rate",
            }),
            ],
        }),
    ]
}