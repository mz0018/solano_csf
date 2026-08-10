import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5001

const connect_to_mongo = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB 200')

    } catch (err) {
        console.error('Database connection error: ', err)
        process.exit(1)
    }
}

export default { connect_to_mongo, PORT }