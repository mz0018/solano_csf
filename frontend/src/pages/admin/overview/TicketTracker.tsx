import { useState } from "react"
import { Select } from "../../../ui/form/Select"
import { useGetOffices } from "../../../hooks/useGetOffices"
import { ErrorText } from "../../../ui/form/ErrorText"
import { InlineLoader } from "../../../components/Loader"
import { useGetTicketTracker } from "../../../hooks/useGetTicketTracker"
import { AdminResponsiveContainer } from "../../../ui/form/AdminResponsiveContainer"

const TicketTracker = () => {

    const { data: offices, isLoading: officesLoading } = useGetOffices();
    const [officeCode, setOfficeCode] = useState("");
    const [dateFrom, setDateFrom] = useState("")
    const { data: tracker, isLoading: trackerLoading, isError: trackerError } = useGetTicketTracker(officeCode, dateFrom)

    return (
        <AdminResponsiveContainer>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col leading-none">
                    <h1 className="text-2xl font-semibold">Ticket Tracker</h1>
                    <span className="text-sm text-gray-500">
                        Search for a ticket to track its status and updates
                    </span>
                </div>

                {/* Search + Action */}
                <div className="flex items-end gap-3 w-full">
                    <div className="flex-1">
                        <label
                            htmlFor="office"
                            className="mb-1 block text-sm font-medium"
                        >
                            Select Office
                        </label>

                        <Select id="office" value={officeCode} onChange={(e) => setOfficeCode(e.target.value)}>
                            <option value="">
                                {officesLoading ? "Loading offices..." : "Select an office"}
                            </option>
                            {offices?.map((office) => (
                                <option key={office.code} value={office.code}>
                                    {office.name}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="dateFrom" className="mb-1 block text-sm font-medium">
                            Select Date
                        </label>
                        <input
                            id="dateFrom"
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="p-4 rounded-sm border border-gray-300 text-gray-500 focus:outline-none"
                        />
                    </div>
                </div>

                {trackerLoading && <InlineLoader />}
                {trackerError && <ErrorText message="Unable to load tickets."/>}
                {!trackerLoading && !trackerError && tracker && (
                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-gray-500">
                            {tracker.total} ticket{tracker.total === 1 ? "" : "s"} found
                        </p>
                        {tracker.tickets.map((ticket) => (
                            <div key={ticket._id} className="flex items-center justify-between border-b border-gray-200 py-3">
                                <div>
                                    <p className="font-medium">{ticket.code}</p>
                                    <p className="text-sm text-gray-500 capitalize">
                                        {ticket.generatedBy
                                            ? `${ticket.generatedBy.firstName} ${ticket.generatedBy.lastName}`
                                            : "Unknown user"}
                                    </p>
                                </div>
                                <span className="text-sm uppercase text-gray-600 tracking-wider">{ticket.status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminResponsiveContainer>
    )
}

export default TicketTracker