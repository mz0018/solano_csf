import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
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

queueSchema.index({ code: 1 }, { unique: true });

export default mongoose.model('Queue', queueSchema);