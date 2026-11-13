import { createContext, useContext } from 'react'
import type { AuthorizeContextType } from '../types/AuthorizeTypes'

export const AuthorizeContext = createContext<AuthorizeContextType | null>(null)

export const useAuthorize = () => {
    const context = useContext(AuthorizeContext)

    if (!context) {
        throw new Error('useAuthorize.ts must be used within an Authorize Provider!')
    }

    return context
}