import type { ReactNode } from "react"

type ParagraphProps = {
    children: ReactNode
}

export const ParagraphUI = ({ children }: ParagraphProps) => {
    return (
        <article
        className={`w-full max-w-3xl shrink-0 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-nav-bg)]/90 shadow-xl
            px-4 py-8
            sm:px-6 sm:py-10
            md:px-8 md:py-12
            lg:px-12 lg:py-16
            xl:px-16 xl:py-20
            `}
        >
            {children}
        </article>
    )
}