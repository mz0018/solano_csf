import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { GenerateTicketModal } from "../../components/Modals/GenerateTicketModal";
import { ActiveQueueDateTable } from "../../components/Tables/ActiveQueueDateTable";

const ActiveQueueTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeDate, setActiveDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <>
      <div className="w-full">
        <div className="block mb-4 flex items-center gap-3 border-b border-gray-300 py-3 lg:hidden">
          <div>
            <h1 className="text-lg font-semibold text-[#628dec]">
              View Active Queue{" "}
              {activeDate
                ? `- ${activeDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`
                : "Today"}
            </h1>

            <p className="mt-1 text-sm leading-relaxed text-gray-900">
              Get an overview of the current queues, pending requests, and
              completed services.
            </p>
          </div>
        </div>
      

      {/* Filter and Generate Ticket */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
        {/* Filter */}
        <div className="w-full sm:w-auto">
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium capitalize tracking-wider"
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="admin-blue-button w-full sm:ml-auto sm:w-auto"
        >
          Generate Ticket
        </button>
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
