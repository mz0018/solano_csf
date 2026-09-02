import mongoose from 'mongoose';

const municipalitySchema = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		type: { type: String },
		zipCode: { type: String },
		district: { type: String }
	},
	{ timestamps: true }
);

export default mongoose.model('Municipality', municipalitySchema);
