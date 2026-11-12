import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import queueRoute from './routes/queueRoute.js'
import superAdmin from './routes/superAdminRoute.js'
import psgcRoute from './routes/psgcRoute.js'
import connection from './config/connection.js'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { errorHandler } from './middleware/errorHandler.js'
import { gzipCompression } from './middleware/compression.js'
import { verifyToken } from './middleware/authorizeViaCookie.js'

import requestLogger from './middleware/requestLogger.js'

const app = express()
const httpServer = createServer(app)
const corsOrigins = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const io = new Server(httpServer, {
    cors: { origin: corsOrigins, credentials: true }
})

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('authToken=')[1]?.split(';')[0]
  if (!token) {
    return next(new Error('Authentication failed'))
  }
  try {
    const decoded = await verifyToken(token)
    socket.user = decoded
    next()
  } catch (err) {
    next(new Error('Authentication failed'))
  }
})

io.on('connection', (socket) => {
  if (socket.user?.officeCode) {
    socket.join(`office:${socket.user.officeCode}`)
  }
  if (socket.user?.id) {        
    socket.join(`user:${socket.user.id}`)
    console.log(socket.user.id)
  }
})

global.io = io

app.set('trust proxy', true)

app.use(express.json())
app.use(cookieParser())
app.use(requestLogger) 
app.use(gzipCompression)
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: corsOrigins,
    credentials: true
}))

app.use('/api/users', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/queues', queueRoute)
app.use('/api/superadmin', superAdmin)
app.use('/api/psgc', psgcRoute)

app.use(errorHandler)


const start_server = async () => {
  try {
    await connection.connect_to_mongo()

    httpServer.on('error', (err) => {
      console.error('HTTP Server Error:', err)
      process.exit(1)
    })

    httpServer.listen(connection.PORT, '0.0.0.0', () => {
      console.log(`Running on PORT ${connection.PORT}`)
    })

  } catch (err) {
    console.error('Server startup failed:', err.message)
    process.exit(1)
  }
}

start_server()

