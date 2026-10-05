import { Document, Header, Footer, Paragraph, ImageRun, AlignmentType, TextRun, PageNumber } from "docx";

import { createCoverPage } from "./sections/createCoverPage";
import { createPieCharts } from "./sections/createPieCharts";
import { createListOfServiceSurveyed } from "./sections/createListOfServiceSurveyed";
import { createAffiliationTable } from "./sections/createAffiliationTable";
import { createGenderTable } from "./sections/createGenderTable";
import { createAgeGroupTable } from "./sections/createAgeGroupTable";
import { createCountServiceQuality } from "./sections/createCountServiceQuality";
import { createAverageScorePerService } from "./sections/createAverageScorePerService";
import { createFreeResponses } from "./sections/createFreeResponses";
import { createEmploymentStatusTable } from "./sections/createEmploymentStatusTable";

import type { DocxInput } from "../hooks/useGenerateDocx";

export const buildDocument = async ({ chartImages, feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }: DocxInput) => {
  
  const response = await fetch("/img/logo.png");
  const buffer = await response.arrayBuffer();
  const convertedLogo = new Uint8Array(buffer);

  return new Document({
    sections: [
      {
        headers: { //HEADER
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new ImageRun({
                    type: "png",
                    data: convertedLogo,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                  }),
                ],
              }),
            ],
          }),
        },

        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun("Page "),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                  }),
                  new TextRun(" of "),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                  }),
                ],
              }),
            ],
          }),
        },

        children: [
          ...await createCoverPage({
            selectedOfficeName,
            selectedDateFrom,
            selectedDateTo,
          }),
          ...createPieCharts(chartImages),
          ...createListOfServiceSurveyed({ feedback, selectedOfficeName }),
          ...createAffiliationTable({ feedback }),
          ...createGenderTable({ feedback }),
          ...createAgeGroupTable({ feedback }),
          ...createEmploymentStatusTable({ feedback }),
          ...createCountServiceQuality({ feedback }),
          ...createAverageScorePerService({ feedback }),
          ...createFreeResponses({ feedback }),
        ],
      },
    ],
  });
};
