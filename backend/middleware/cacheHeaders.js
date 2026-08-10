import crypto from 'crypto'

export const cacheHeaders = (getUpdatedAt) => {

  return (req, res, next) => {
    
    const originalJson = res.json.bind(res)
    
    res.json = (data) => {
      const updatedAt = getUpdatedAt(data)
      if (updatedAt) {
        res.set('Last-Modified', new Date(updatedAt).toUTCString())
        const hash = crypto.createHash('md5').update(JSON.stringify(data)).digest('hex')
        res.set('ETag', `"${hash}"`)
        
        const clientETag = req.headers['if-none-match']
        const clientSince = req.headers['if-modified-since']
        
        if ((clientETag && clientETag === res.get('ETag')) ||
            (clientSince && updatedAt && new Date(clientSince) >= new Date(updatedAt))) {
          return res.status(304).end()
        }
      }
      return originalJson(data)
    }
    next()
  }
}