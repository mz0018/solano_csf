import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    officeCode: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    type: { type: String, enum: ['external', 'internal'], default: 'external'},
  },
  { timestamps: true }
);

serviceSchema.index({ officeCode: 1, code: 1 }, { unique: true });

export default mongoose.model('Service', serviceSchema);