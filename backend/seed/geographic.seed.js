import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Region from '../models/regions.model.js';
import Province from '../models/provinces.model.js';
import Municipality from '../models/municipalities.model.js';
import PhilippineStandardGeographicService from '../services/PhilippineStandardGeographicService.js';

dotenv.config();

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    console.log('Syncing geographic data from PSGC API...');

    const psgcData = await PhilippineStandardGeographicService.syncPhilippineStandardGeographicData();

    const regions = psgcData.regions.map((region) => ({
      name: region.name,
      code: region.code
    }));

    const provinces = psgcData.provinces.map((province) => ({
      name: province.name,
      code: province.code
    }));

    const municipalities = psgcData.municipalities.map((municipality) => ({
      name: municipality.name,
      code: municipality.code,
      type: municipality.type,
      zipCode: municipality.zip_code ? String(municipality.zip_code) : undefined,
      district: municipality.district
    }));

    if (!regions.length) {
      throw new Error('No regions found');
    }

    if (!provinces.length) {
      throw new Error('No provinces found');
    }

    if (!municipalities.length) {
      throw new Error('No municipalities found');
    }  

    const [regionResult, provinceResult, municipalityResult] = await Promise.all([
      Region.bulkWrite(regions.map((region) => ({
        updateOne: {
          filter: { code: region.code },
          update: { $set: region },
          upsert: true
        }
      })), { ordered: false }),
      Province.bulkWrite(provinces.map((province) => ({
        updateOne: {
          filter: { code: province.code },
          update: { $set: province },
          upsert: true
        }
      })), { ordered: false }),
      Municipality.bulkWrite(municipalities.map((municipality) => ({
        updateOne: {
          filter: { code: municipality.code },
          update: { $set: municipality },
          upsert: true
        }
      })), { ordered: false })
    ]);

    console.log(
      `Synced ${regions.length} regions, ${provinces.length} provinces, ` +
      `${municipalities.length} municipalities ` +
      `(${regionResult.upsertedCount + provinceResult.upsertedCount + municipalityResult.upsertedCount} inserted, ` +
      `${regionResult.modifiedCount + provinceResult.modifiedCount + municipalityResult.modifiedCount} updated)`
    );

  } catch (error) {
    console.error('Error syncing geographic data:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

run();
