import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    selectedService: {
      type: [String],
      required: true
    },
    otherServiceDetail: {
      type: String,
      default: null,
      trim: true
    },
    officeCode: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'used', 'expired'],
      default: 'pending',
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

queueSchema.index({ officeCode: 1, code: 1 }, { unique: true })

export default mongoose.model('Queue', queueSchema);