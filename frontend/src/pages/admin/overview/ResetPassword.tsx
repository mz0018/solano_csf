import { useSearchClient } from "../../../hooks/useSearchClient"
import { ErrorText } from "../../../ui/form/ErrorText"

const ResetPassword = () => {
    const {
        setSearch,
        search,
        results,
        isLoading,
        isFetching,
        error,
    } = useSearchClient()

    return (
        <>
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search client by name..."
            />

            {isLoading || isFetching ? (
                <div>Loading...</div>
            ) : error ? (
                <ErrorText message="Something went wrong" />
            ) : (
                <>
                    <p>Search: {search}</p>

                    {results?.map((client) => (
                        <div key={client.id}>
                            {client.name}
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default ResetPassword
