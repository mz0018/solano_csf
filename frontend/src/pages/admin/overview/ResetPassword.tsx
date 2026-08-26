import { useNavigate } from "react-router-dom"
import { Button } from "../../../ui/form/Buttons"
import { useSearchClient } from "../../../hooks/useSearchClient"
import { ErrorText } from "../../../ui/form/ErrorText"
import { AdminResponsiveContainer } from "../../../ui/form/AdminResponsiveContainer"

const ResetPassword = () => {
    const { setSearch, search, results, isLoading, isFetching, error } = useSearchClient()

    const navigate = useNavigate()

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

    return (
        <AdminResponsiveContainer>
            <div className="flex flex-col gap-6 w-full">
                {/* Header */}
                <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col leading-none">
                        <h1 className="text-2xl font-semibold">Account Management</h1>
                        <span className="text-sm text-gray-500 mt-2">
                            Search for a client to manage their account access and password
                        </span>
                    </div>

                    <Button
                        onClick={() => navigate('/admin/overview/user-management/add-client')}
                        className="cursor-pointer p-4 rounded-sm tracking-wider flex items-center justify-center gap-2 bg-blue-500 text-white p-4 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors whitespace-nowrap"
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
                    <table className="w-full border-collapse">
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
                                            {client.role}
                                        </td>

                                        <td className="p-4">
                                            <Button
                                                type="button"
                                                onClick={() => handleResetPassword(client._id)}
                                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-[#628dec] bg-white px-3 py-2 text-xs font-medium text-[#628dec] transition hover:bg-[#628dec] hover:text-white sm:text-sm whitespace-nowrap"
                                                >
                                                
                                                Reset Password
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminResponsiveContainer>
    )
}

export default ResetPassword