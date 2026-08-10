import { Paragraph, Table, TableRow, TableCell } from "docx";
import type { FeedbackItem } from "../../components/buttons/BtnGenerateReport";

export interface ServiceSurveyed {
  feedback: FeedbackItem[];
}

export const createFreeResponses = ({ feedback }: ServiceSurveyed) => {
  const monthGroups: Record<string, string[]> = {};

  feedback.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleString("default", {
      month: "long",
    });

    if (
      item.comments &&
      item.comments.trim() !== "" &&
      item.comments !== "NA"
    ) {
      monthGroups[month] ??= [];
      monthGroups[month].push(item.comments);
    }
  });

  const children: (Paragraph | Table)[] = [];

  Object.entries(monthGroups).forEach(([month, comments]) => {
    children.push(
      new Paragraph("Free Responses")
    );

    children.push(
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(`${month}`)],
              }),
            ],
          }),

          ...comments.map(
            (comment) =>
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph(comment)],
                  }),
                ],
              })
          ),
        ],
      })
    );
  });

  return children;
};