import { useSearchClient } from "../../../hooks/useSearchClient"
import { Button } from "../../../ui/form/Buttons"
import { ErrorText } from "../../../ui/form/ErrorText"
import { AdminResponsiveContainer } from "../../../ui/form/AdminResponsiveContainer"

const ResetPassword = () => {
    const {
        setSearch,
        search,
        results,
        isLoading,
        isFetching,
        error,
    } = useSearchClient()

    const handleResetPassword = async (clientId: string) => {
        if (!confirm("Are you sure you want to reset this client's password?")) return
        try {
            const response = await fetch(`/api/superadmin/password/reset/${clientId}`, {
                method: "POST",
                credentials: "include",
            })
            if (!response.ok) throw new Error("Failed to reset password")
            alert("Password reset successfully. Default password: 12345678")
        } catch (err) {
            alert((err as Error).message)
        }
    }

    return (
        <AdminResponsiveContainer>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col leading-none">
                    <h1 className="text-2xl font-semibold">Client Password Reset</h1>
                    <span className="text-sm text-gray-500">Search for a client to reset their password</span>
                </div>

                <div>
                    <label htmlFor="client-search" className="mb-1 block text-sm font-medium">
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

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-4 font-medium text-gray-500">Client</th>
                                <th className="text-left p-4 font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading || isFetching ? (
                                <tr>
                                    <td colSpan={2} className="p-4 text-center text-gray-500">Loading...</td>
                                </tr>
                            ) : results.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="p-4 text-center text-gray-500">No clients found.</td>
                                </tr>
                            ) : (
                                results.map((client) => (
                                    <tr key={client._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-4 text-gray-700">{client.firstName}</td>
                                        <td className="p-4">
                                            <Button 
                                                className="bg-red-500 hover:bg-red-600 text-white" 
                                                onClick={() => handleResetPassword(client._id)}
                                                disabled={isLoading || isFetching}
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