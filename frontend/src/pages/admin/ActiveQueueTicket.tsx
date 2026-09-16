import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { AdminResponsiveContainer } from "../../ui/form/AdminResponsiveContainer";
import { GenerateTicketModal } from "../../components/Modals/GenerateTicketModal";
import { ActiveQueueDateTable } from "../../components/Tables/ActiveQueueDateTable";

const ActiveQueueTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeDate, setActiveDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <>
      <AdminResponsiveContainer>
        <div className="flex flex-col leading-none">
          <div>
                <h1 className="text-2xl font-semibold">
              View Active Queue{" "}
              {activeDate
                ? `- ${activeDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`
                : "Today"}
            </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Get an overview of the current queues, pending requests,
                    and completed services.
                </p>
            </div>
        </div>

        <div className="flex w-full items-end gap-4">
          {/* Left */}
          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-sm font-medium capitalize tracking-wider"
            >
              filter by
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
              {/* <option value="expired">Expired</option> */}
            </Select>
          </div>

          {/* Right */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="admin-blue-button ml-auto"
          >
            Generate Ticket
          </button>
        </div>

        <ActiveQueueDateTable
          onDateChange={setActiveDate}
          statusFilter={statusFilter}
        />
      </AdminResponsiveContainer>

      <GenerateTicketModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ActiveQueueTicket;
