import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
    officeCode: { type: String, required: true, unique: true, index: true },
    queueNumber: { type: String, required: true, unique: true, index: true },

    service: { type: String, required: true, index: true },

    client: {
        name: { type: String, default: 'NA' },
        contactNumber: { type: String, default: 'NA' },
        gender: { type: String, required: true },

        affiliation: { type: String, required: true, index: true },
        ageGroup: { type: String, required: true, index: true },
        employmentStatus: { type: String, required: true, index: true },

        address: { type: String, required: true, index: true },
        barangay: { type: String },
        addressDetail: { type: String }
    },

    ratings: {
        responsiveness: { type: Number, required: true, min: 1, max: 5 },
        reliability: { type: Number, required: true, min: 1, max: 5 },
        accessFacilities: { type: Number, required: true, min: 1, max: 5 },
        communication: { type: Number, required: true, min: 1, max: 5 },
        costs: { type: Number, required: true, min: 1, max: 5 },
        integrity: { type: Number, required: true, min: 1, max: 5 },
        assurance: { type: Number, required: true, min: 1, max: 5 },
        outcome: { type: Number, required: true, min: 1, max: 5 }
    },

    comments: { type: String, default: 'NA' }

}, {
    timestamps: true
})

export default mongoose.model('Feedback', feedbackSchema)