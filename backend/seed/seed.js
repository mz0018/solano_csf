import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Office from '../models/office.model.js';
import Service from '../models/service.model.js'
import { offices } from './offices.seed.js';
import { services } from './services/index.js';

dotenv.config();

const run = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  for (const o of offices) {
    await Office.findOneAndUpdate(
      { code: o.code },
      { $set: o },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  for (const s of services) {
    await Service.findOneAndUpdate(
      { officeCode: s.officeCode, code: s.code },
      { $set: s },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const officeCount = await Office.countDocuments();
  const serviceCount = await Service.countDocuments();
  console.log(`Seeded ${officeCount} offices, ${serviceCount} services`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});