import { Paragraph, ImageRun, HeadingLevel } from "docx";

export const createPieCharts = (
  chartImages: string[]
) => {
  return [
    new Paragraph({
      text: "Charts",
      heading: HeadingLevel.HEADING_1
    }),

    ...chartImages.map(
      (img) =>
        new Paragraph({
          children: [
            new ImageRun({
              data: img,
              transformation: {
                width: 400,
                height: 350
              },
              type: "png"
            })
          ]
        })
    )
  ];
};