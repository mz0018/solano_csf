import { Paragraph, TextRun } from "docx"
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ResponseRateProps {
  feedback: FeedbackItem[];
  selectedOfficeName?: string;
  serviceTransactions: { service: string; totalTransactions: number }[];
}

export const createResponseRate = ({ feedback, selectedOfficeName, serviceTransactions }: ResponseRateProps) => {

    console.log(feedback, selectedOfficeName)
    console.log(serviceTransactions)

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