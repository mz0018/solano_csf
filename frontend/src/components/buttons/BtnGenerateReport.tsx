import { AdminButton } from "../../ui/form/AdminButton"
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
  service: string | string[];
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
  serviceTransactions: { service: string; totalTransactions: number }[]
  services: { service: string; type: string }[]
}

export const BtnGenerateReport = ({ isCapturing, handleCapture, chartRefs, feedback, selectedOfficeName, selectedDateFrom, selectedDateTo, serviceTransactions, services }: BtnGenerateReportProps) => {
  const { downloadDocx } = useGenerateDocx()

  const onClick = async () => {
    const images = await handleCapture(chartRefs.current)
    if (images.length === 0) return alert("No charts captured")
    await downloadDocx({ 
      chartImages: images,
      feedback,
      selectedOfficeName,
      selectedDateFrom,
      selectedDateTo,
      serviceTransactions,
      services,
    }, `CSF-${selectedOfficeName}-${selectedDateFrom}-${selectedDateTo}-report.docx`)
  }

  return (
    <>
    <AdminButton 
      icon="/icons/download.svg"
      iconAlt="Download"
      disabled={isCapturing} 
      onClick={onClick} 
      className="w-full bg-[#628dec] text-white hover:bg-[#628dec]/90 transition-colors font-semibold"
    >
      {isCapturing ? "Generating..." : "Generate Report"}
    </AdminButton>
    </>
  )
}