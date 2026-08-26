import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    officeCode: String,
    status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' }, 
    role: { type: String, enum: ['office_admin', 'hr_admin', 'super_admin'], required: true },
    loginHistory: [{
        ip: String,
        userAgent: String,
        loginAt: { type: Date, default: Date.now, expires: '30d' },
        success: Boolean
    }],
    passwordChangedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
)

export default mongoose.model('User', userModel)