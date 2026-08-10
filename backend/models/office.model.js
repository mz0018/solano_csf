import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Office', officeSchema);