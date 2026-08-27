import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../ui/form/Buttons"
import { useSearchClient } from "../../../hooks/useSearchClient"
import { ErrorText } from "../../../ui/form/ErrorText"
import { RotateCcw } from "lucide-react"
import { TableUI } from "../../../ui/form/TableUI"
import { AdminResponsiveContainer } from "../../../ui/form/AdminResponsiveContainer"

const ResetPassword = () => {
    const { setSearch, search, results, isLoading, isFetching, error } = useSearchClient()

    const navigate = useNavigate()

    const [clientStatuses, setClientStatuses] = useState<Record<string, string>>({})

    const handleResetPassword = async (clientId: string) => {
        if (!confirm("Are you sure you want to reset this client's password?")) {
            return
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/superadmin/password/reset/${clientId}`,
                {
                method: "POST",
                credentials: "include",
                }
            )

            if (!response.ok) {
                throw new Error("Failed to reset password")
            }

             alert("Password reset successfully. Default password: 12345678")
        } catch (err) {
            alert((err as Error).message)
        }
    }

    const handleToggleStatus = async (clientId: string) => {
        if (!confirm("Are you sure you want to continue?")) {
            return
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/superadmin/client/status/${clientId}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            )

            if (!response.ok) {
                throw new Error("Failed to update status")
            }

            const data = await response.json()

            console.log(data)

            setClientStatuses(prev => ({
                ...prev,
                [clientId]: data.status
            }))

            alert(`Client status changed to ${data.status}.`)
        } catch (err) {
            alert((err as Error).message)
        }
    }

    return (
        <AdminResponsiveContainer>
            <div className="flex flex-col gap-6 w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 w-full">
                <div className="flex flex-col leading-none min-w-0">
                    <h1 className="text-xl sm:text-2xl font-semibold">
                    Account Management
                    </h1>

                    <span className="text-sm text-gray-500 leading-relaxed">
                    Search for a client to manage their account access and password
                    </span>
                </div>

                <Button
                    onClick={() => navigate('/admin/overview/user-management/add-client')}
                    className="admin-blue-button w-full sm:w-auto shrink-0"
                >
                    Add Client Account
                </Button>
            </div>

                {/* Search */}
                <div>
                    <label
                        htmlFor="client-search"
                        className="mb-1 block text-sm font-medium"
                    >
                        Search Client
                    </label>

                    <input
                        id="client-search"
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search client by name..."
                        className="w-full p-4 rounded-sm border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && (
                    <ErrorText message={(error as Error).message} />
                )}

                {/* Table */}
                <div className="w-full overflow-x-auto">
                    <TableUI className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-4 font-medium text-gray-500">
                                    Client
                                </th>
                                <th className="text-left p-4 font-medium text-gray-500">
                                    Office
                                </th>
                                <th className="text-left p-4 font-medium text-gray-500">
                                    Username
                                </th>
                                <th className="text-left p-4 font-medium text-gray-500">
                                    Role
                                </th>
                                <th className="text-left p-4 font-medium text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading || isFetching ? (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="p-4 text-center text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : results.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No clients found.
                                    </td>
                                </tr>
                            ) : (
                                results.map((client) => (
                                    <tr
                                        key={client._id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="p-4 text-gray-700 capitalize whitespace-nowrap">
                                            {client.firstName} {client.lastName}
                                        </td>

                                        <td className="p-4 text-gray-700 capitalize whitespace-nowrap">
                                            {client.officeCode}
                                        </td>
                                        
                                        <td className="p-4 text-gray-700">
                                            {client.userName}
                                        </td>

                                        <td className="p-4 text-gray-700 capitalize">
                                        {client.role === 'office_admin'
                                            ? 'Office Administrator'
                                            : client.role === 'hr_admin'
                                            ? 'Human Resource Administrator'
                                            : ''}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center justify-start gap-1">

                                                {/* Reset Password */}
                                                <div className="group relative">
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleResetPassword(client._id)}
                                                        className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-[#628dec] hover:bg-[#628dec]/10"
                                                    >
                                                        <RotateCcw size={16} />
                                                    </Button>

                                                    <span
                                                        className="
                                                            pointer-events-none
                                                            absolute left-1/2 top-full z-10 mt-2
                                                            -translate-x-1/2
                                                            whitespace-nowrap
                                                            rounded-md
                                                            bg-white
                                                            px-2 py-1
                                                            text-xs text-white
                                                            opacity-0
                                                            shadow-md
                                                            transition-opacity duration-150
                                                            group-hover:opacity-100
                                                        "
                                                    >
                                                        Reset Password
                                                    </span>
                                                </div>

                                                {/* Active / Inactive Toggle */}
                                                <div className="group relative">
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={
                                                            (clientStatuses[client._id] ?? client.status) === "active"
                                                        }
                                                        onClick={() => handleToggleStatus(client._id)}
                                                        className={`
                                                            relative inline-flex h-4 w-7 shrink-0
                                                            cursor-pointer items-center rounded-full
                                                            transition-colors duration-200
                                                            ${
                                                                (clientStatuses[client._id] ?? client.status) === "active"
                                                                    ? "bg-[#628dec]"
                                                                    : "bg-gray-300"
                                                            }
                                                        `}
                                                    >
                                                        <span
                                                            className={`
                                                                absolute left-0.5 h-3 w-3
                                                                rounded-full bg-white shadow-sm
                                                                transition-transform duration-200
                                                                ${
                                                                    (clientStatuses[client._id] ?? client.status) === "active"
                                                                        ? "translate-x-3"
                                                                        : "translate-x-0"
                                                                }
                                                            `}
                                                        />
                                                    </button>

                                                    <span
                                                        className="
                                                            pointer-events-none
                                                            absolute left-1/2 top-full z-10 mt-2
                                                            -translate-x-1/2
                                                            whitespace-nowrap
                                                            rounded-md
                                                            bg-white
                                                            px-2 py-1
                                                            text-xs text-white
                                                            opacity-0
                                                            shadow-md
                                                            transition-opacity duration-150
                                                            group-hover:opacity-100
                                                        "
                                                    >
                                                        Change to {(clientStatuses[client._id] ?? client.status) === "active"
                                                            ? "inactive"
                                                            : "active"} status
                                                    </span>
                                                </div>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </TableUI>
                </div>
            </div>
        </AdminResponsiveContainer>
    )
}

export default ResetPassword