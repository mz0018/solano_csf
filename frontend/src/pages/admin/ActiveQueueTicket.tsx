import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { AdminButton } from "../../ui/form/AdminButton";
import { GenerateTicketModal } from "../../components/Modals/GenerateTicketModal";
import { ActiveQueueDateTable } from "../../components/Tables/ActiveQueueDateTable";

const ActiveQueueTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeDate, setActiveDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <>
      <div className="w-full">
        <div className="mb-4 flex items-center gap-3 border-b border-gray-300 py-3">
          
          <div className="w-full min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="min-w-0 text-2xl font-bold text-[#003566] lg:text-3xl">
                View Active Queue
              </h1>

              <small className="inline-flex max-w-full items-center rounded-full border border-[#FFC300] bg-[#FFC300]/20 px-3 py-1.5 text-sm font-normal text-[#003566] sm:text-lg sm:py-2">
                {activeDate
                  ? activeDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Today"}
              </small>
            </div>

            <p className="mt-1 max-w-2xl text-sm leading-relaxed tracking-wide text-[#000814] sm:text-base md:text-md">
              Get an overview of the current queues, pending requests, and
              completed services.
            </p>
          </div>

        </div>
      

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
        {/* Filter */}
        <div className="w-full sm:w-auto">
          <label
            htmlFor="status"
            className="mb-2 block text-base font-semibold text-[#003566] sm:text-lg lg:text-xl"
          >
            Filter by
          </label>

          <Select
            id="status"
            variant="admin"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="used">Used</option>
            <option value="pending">Pending</option>
          </Select>
        </div>

        {/* Generate Ticket */}
        <AdminButton
          icon="/icons/colored-generate.svg"
          iconAlt="Ticket"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#003566] border border-[#FFC300] text-[#FFD60A] transition-colors duration-200 hover:bg-[#004080] hover:border-[#FFD60A] font-semibold sm:ml-auto sm:w-auto whitespace-nowrap"
        >
          Generate Ticket
        </AdminButton>
      </div>

      {/* Active Queue Table */}
      <div className="mt-4 w-full">
        <ActiveQueueDateTable
          onDateChange={setActiveDate}
          statusFilter={statusFilter}
        />
      </div>

      {/* Generate Ticket Modal */}
      <GenerateTicketModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      </div>
    </>
  );
};

export default ActiveQueueTicket;
