export interface AuthorizeUser {
  id: string
  userName: string
  role: string
  officeCode?: string
}

export interface AuthorizeContextType {
  user: AuthorizeUser | null
  loading: boolean
  verifyAuth: () => Promise<void>
  signOut: () => Promise<void>
} 