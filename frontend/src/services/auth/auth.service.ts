import type { SignInRequest, SignInResponse } from '../../types/AuthorizeTypes';

export const signInService = async (request: SignInRequest): Promise<SignInResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(request)
        })

        if (!res.ok) {
            throw new Error((await res.json()).message || 'Failed to sign in. Please client feedback on service.')
        }
        
        return res.json();
    } catch (err) {
        console.error('Sign-in service error:', err);
        throw err;
    }
}
