import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    officeCode: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    type: { type: String, enum: ['external', 'internal'], default: 'external'},
    createdBy: {
      user: { type: String, default: 'csf-system' },
      userId: { type: mongoose.Schema.Types.ObjectId, default: null }
    },
  },
  { timestamps: true }
);

serviceSchema.index({ officeCode: 1, code: 1 }, { unique: true });

export default mongoose.model('Service', serviceSchema);