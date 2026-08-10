import compression from 'compression'

export const gzipCompression = compression({
    level: 6,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) return false
        return compression.filter(req, res)
    }
})