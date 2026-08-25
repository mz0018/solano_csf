import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    type: { type: String, required: true },
    content: { type: String, required: true }, 
    }, 
    { timestamps: true }
)

export default mongoose.model('Notification', notificationSchema)