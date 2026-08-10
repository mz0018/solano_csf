export const Loader = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-[var(--theme-bg)] text-[var(--theme-text)]">
            <div
                className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--theme-text)] border-t-transparent"
                role="status"
                aria-label="Loading"
            />
        </div>
    )
}
export const InlineLoader = ({ message }: { message?: string }) => {
    return (
        <div className="flex items-center justify-center gap-2 py-4 text-gray-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            {message && <span className="text-sm">{message}</span>}
        </div>
    )
}