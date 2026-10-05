import { Packer } from "docx";
import JSZip from "jszip";

import { buildDocument } from "../docx/buildDocument";
import type { FeedbackItem } from "../components/buttons/BtnGenerateReport";

export type DocxInput = {
  chartImages: string[];
  feedback: FeedbackItem[];
  selectedOfficeName?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;
};

const lockAllTables = async (blob: Blob): Promise<Blob> => {
  const zip = await JSZip.loadAsync(blob);

  const file = zip.file("word/document.xml");

  if (!file) {
    throw new Error("word/document.xml not found");
  }

  let xml = await file.async("string");

  xml = xml.replace(
    /<w:tbl>[\s\S]*?<\/w:tbl>/g,
    (table) => `
      <w:sdt>
        <w:sdtPr>
          <w:lock w:val="sdtContentLocked"/>
        </w:sdtPr>

        <w:sdtContent>
          ${table}
        </w:sdtContent>
      </w:sdt>
    `
  );

  zip.file("word/document.xml", xml);

  return await zip.generateAsync({
    type: "blob",
  });
};

export const useGenerateDocx = () => {
  const downloadDocx = async (
    { chartImages, feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }: DocxInput, filename = "report.docx") => {
      
    // Build the document
    const doc = await buildDocument({
      chartImages,
      feedback,
      selectedOfficeName,
      selectedDateFrom,
      selectedDateTo,
    });

    // Convert the docx document into a Blob
    const blob = await Packer.toBlob(doc);

    const finalBlob = await lockAllTables(blob);

    // Download the final DOCX
    const url = URL.createObjectURL(finalBlob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return { downloadDocx };
};
