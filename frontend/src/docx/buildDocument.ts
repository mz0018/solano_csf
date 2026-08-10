import { Document } from "docx";
import { createCoverPage } from "./sections/createCoverPage";
import { createPieCharts } from "./sections/createPieCharts";
import { createListOfServiceSurveyed } from "./sections/createListOfServiceSurveyed";
import { createAffiliationTable } from "./sections/createAffiliationTable";
import { createGenderTable } from "./sections/createGenderTable";
import { createAgeGroupTable } from "./sections/createAgeGroupTable";
import { createCountServiceQuality } from "./sections/createCountServiceQuality";
import { createAverageScorePerService } from "./sections/createAverageScorePerService";
import { createFreeResponses } from "./sections/createFreeResponses";

import type { DocxInput } from "../hooks/useGenerateDocx";
import { createEmploymentStatusTable } from "./sections/createEmploymentStatusTable";

export const buildDocument = ({ chartImages, feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }: DocxInput) => {

  return new Document({
    sections: [
      {
        children: [
          ...createCoverPage({
            selectedOfficeName,
            selectedDateFrom,
            selectedDateTo
          }),
          ...createPieCharts(chartImages),
          ...createListOfServiceSurveyed({ feedback, selectedOfficeName }),
          ...createAffiliationTable({feedback}),
          ...createGenderTable({feedback}),
          ...createAgeGroupTable({feedback}),
          ...createEmploymentStatusTable({feedback}),
          ...createCountServiceQuality({feedback}),
          ...createAverageScorePerService({feedback}),
          ...createFreeResponses({feedback})
        ]
      }
    ]
  });
};