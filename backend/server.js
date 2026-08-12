import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import queueRoute from './routes/queueRoute.js'
import superAdmin from './routes/superAdminRoute.js'
import connection from './config/connection.js'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { errorHandler } from './middleware/errorHandler.js'
import { gzipCompression } from './middleware/compression.js'
import { verifyToken } from './middleware/authorizeViaCookie.js'

import requestLogger from './middleware/requestLogger.js'

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: { origin: ['http://localhost:5173', 'https://csf.proaws.online', 'https://www.csf.proaws.online'], credentials: true }
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('authToken=')[1]?.split(';')[0]
  try {
    const decoded = verifyToken(token)
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
})

global.io = io

app.set('trust proxy', true)

app.use(express.json())
app.use(cookieParser())
app.use(requestLogger) 
app.use(gzipCompression)
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: ['http://localhost:5173', 'https://proaws.online', 'https://csf.proaws.online', 'https://www.csf.proaws.online/'],
    credentials: true
}))

app.use('/api/users', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/queues', queueRoute)
app.use('/api/superadmin', superAdmin)

app.use(errorHandler)

const start_server = async () => {
  try {
    await connection.connect_to_mongo()
    httpServer.listen(connection.PORT, () => {
      console.log(`Running on PORT ${connection.PORT}`)
    })
  } catch (err) {
    console.error('', err.message)
    process.exit(1)
  }
}

start_server()

