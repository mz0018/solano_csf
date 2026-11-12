export const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN

export const getAuthCookieMaxAge = () => {
    const maxAge = Number(process.env.AUTH_COOKIE_MAX_AGE_MS)

    if (!Number.isFinite(maxAge) || maxAge <= 0) {
        throw new Error('AUTH_COOKIE_MAX_AGE_MS must be a positive number')
    }

    return maxAge
}
