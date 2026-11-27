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

/**signInService */
export type SignInRequest = {
    userName: string;
    password: string;
}

export type SignInResponse = {
  message: string;
  officeCode: string;
  role: string;
  user: string;
}