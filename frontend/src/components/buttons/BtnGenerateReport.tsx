import { Button } from "../../ui/form/Buttons"
import { useGenerateDocx } from "../../hooks/useGenerateDocx"

type ChartRefs = React.RefObject<(HTMLDivElement | null)[]>
type HandleCapture = (refs: (HTMLDivElement | null)[]) => Promise<string[]>
type Ratings = {
  accessFacilities: number;
  assurance: number;
  communication: number;
  costs: number;
  integrity: number;
  outcome: number;
  reliability: number;
  responsiveness: number;
}

export interface FeedbackItem {
  _id: string;
  service: string;
  comments: string;
  client: {
    address: string;
    affiliation: string;
    ageGroup: string;
    employmentStatus: string;
    gender: string;
  };
  ratings: Ratings
  createdAt: Date;
}

interface BtnGenerateReportProps {
  isCapturing: boolean
  handleCapture: HandleCapture
  chartRefs: ChartRefs
  feedback: FeedbackItem[]
  selectedOfficeName: string
  selectedDateFrom: string
  selectedDateTo: string
}

export const BtnGenerateReport = ({ isCapturing, handleCapture, chartRefs, feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }: BtnGenerateReportProps) => {
  const { downloadDocx } = useGenerateDocx()

  const onClick = async () => {
    const images = await handleCapture(chartRefs.current)
    if (images.length === 0) return alert("No charts captured")
    await downloadDocx({ 
      chartImages: images,
      feedback,
      selectedOfficeName,
      selectedDateFrom,
      selectedDateTo
    }, "feedback-report.docx")
  }

  return (
    <Button disabled={isCapturing} onClick={onClick} className="bg-blue-500 text-white p-4 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors">
      {isCapturing ? "Generating..." : "Generate Report"}
    </Button>
  )
}