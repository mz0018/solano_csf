import { useState, useEffect } from "react"

const ResetPassword = () => {

    const [search, setSearch] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSearch = async () => {

        if (!search.trim()) {
            return
        }

        setIsLoading(true)
        try {
            console.log('Searching...', search)
        } catch (err) {
            console.error('Something went wrong: ', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {   
        const timer = setTimeout(() => {
            handleSearch()
        }, 400)

        return () => clearTimeout(timer)
    }, [search])

    return (
        <>
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search client by name..."
            />

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <p>{search}</p>
            )}
        </>
    )
}

export default ResetPassword