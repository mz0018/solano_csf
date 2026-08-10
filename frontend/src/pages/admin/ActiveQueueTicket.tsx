import { useState } from "react"
import { AdminResponsiveContainer } from "../../ui/form/AdminResponsiveContainer"
import { GenerateTicketModal } from "../../components/Modals/GenerateTicketModal"
import { ActiveQueueDateTable } from "../../components/Tables/ActiveQueueDateTable"
const ActiveQueueTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [activeDate, setActiveDate] = useState<Date | null>(null) 
  return (
    <>
      <AdminResponsiveContainer>
        <div className="flex flex-col leading-none">
          <h1 className="text-2xl font-semibold">
            View Active Queue {activeDate 
              ? `- ${activeDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
              : 'Today'
            }
          </h1>
          <span className="text-sm text-[#6b7280]">View and manage today's active queue tickets</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Generate Ticket
        </button>
        <ActiveQueueDateTable onDateChange={setActiveDate} />
      </AdminResponsiveContainer>
      <GenerateTicketModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
export default ActiveQueueTicket