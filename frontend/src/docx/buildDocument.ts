import { Document, Header, Footer, Paragraph, ImageRun, AlignmentType, TextRun, PageNumber } from "docx";

import { createCoverPage } from "./sections/createCoverPage";
import { createTableOfContents } from "./sections/createTableOfContents";
import { createAgencyProfile } from "./sections/createAgencyProfile";
import { createOverview } from "./sections/createOverview";
import { createMethodology } from "./sections/createMethodology";
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

  const [addressChart, affiliationChart, ageGroupChart, employmentChart, genderChart] = chartImages;

  const chart = (dataUrl?: string) =>
    dataUrl
      ? [new Paragraph({ children: [new ImageRun({
          data: dataUrl.split(",")[1],
          type: "png",
          transformation: { width: 400, height: 350 },
        })] })]
      : [];
  
  const logoResponse = await fetch("/img/logo.png");
  if (!logoResponse.ok) {
    throw new Error(`Failed to load logo: ${logoResponse.status}`);
  }
  const logoBuffer = await logoResponse.arrayBuffer();
  const convertedLogo = new Uint8Array(logoBuffer);

  const fontResponse = await fetch("/fonts/Aptos.ttf");
  if (!fontResponse.ok) {
    throw new Error(`Failed to load Aptos font: ${fontResponse.status}`);
  }
  const aptosFontArrayBuffer = await fontResponse.arrayBuffer();
  const aptosFontBuffer = new Uint8Array(aptosFontArrayBuffer) as unknown as Buffer;

  return new Document({

    //Global font settings for the document
    fonts: [{
      name: "Aptos",
      data: aptosFontBuffer,
    }],

    styles: {
      default: {
        document: {
          run: {
            font: "Aptos",
            size: 24, 
          },
        },
      },
    },

    numbering: {
        config: [
            {
                reference: "roman-list",
                levels: [
                    {
                        level: 0,
                        format: "lowerRoman",
                        text: "%1.",
                        alignment: AlignmentType.LEFT,
                    },
                ],
            },

            {
                reference: "light-bullet",
                levels: [
                    {
                        level: 0,
                        format: "bullet",
                        text: "·",
                        alignment: AlignmentType.LEFT,
                        style: { run: { size: 48 } }
                    },
                ],
            },
        ],
    },
    //------------------------------------------------

    sections: [
      {
        //Header and Footer for the document
        headers: {
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
                spacing: {
                  before: 0,
                  after: 0,
                },
                children: [
                  new TextRun({
                    text: "Page ",
                    font: "Aptos",
                    size: 18,
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: "Aptos",
                    size: 18,
                  }),
                  new TextRun({
                    text: " of ",
                    font: "Aptos",
                    size: 18,
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font: "Aptos",
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
        },
        //------------------------------------------------

        children: [
          ...await createCoverPage({ selectedOfficeName, selectedDateFrom, selectedDateTo }),

          new Paragraph({ pageBreakBefore: true, children: [] }), //means start the next section on a new page
          ...createTableOfContents({ selectedDateFrom, selectedDateTo }),

          new Paragraph({ pageBreakBefore: true, children: [] }),
          ...createAgencyProfile(),

          new Paragraph({ pageBreakBefore: true, children: [] }),
          ...createOverview(),

          new Paragraph({ pageBreakBefore: true, children: [] }),
          ...createListOfServiceSurveyed({ feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }),

          new Paragraph({ pageBreakBefore: true, children: [] }),
          ...createMethodology(),

          new Paragraph({ pageBreakBefore: true, children: [] }),
          ...createAffiliationTable({ feedback }),
          ...chart(affiliationChart),

          ...createGenderTable({ feedback }),
          ...chart(genderChart),
          ...createAgeGroupTable({ feedback }),
          ...chart(ageGroupChart),
          ...createEmploymentStatusTable({ feedback }),
          ...chart(employmentChart),

          ...createCountServiceQuality({ feedback }),
          ...createAverageScorePerService({ feedback }),
          ...createFreeResponses({ feedback }),

          ...createPieCharts([addressChart]), 

        ],
      },
    ],
  });
};