import dotenv from 'dotenv';
import mongoose from 'mongoose';
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

    const psgcData =
      await PhilippineStandardGeographicService
        .syncPhilippineStandardGeographicData();

    console.log('\n✓ PSGC Data fetched successfully');

    console.log('Data structure:', {
      regions: `${psgcData.regions.length} items`,
      provinces: `${psgcData.provinces.length} items`,
      municipalities: `${psgcData.municipalities.length} items`
    });

    console.log('\nFirst region:');
    console.log(psgcData.regions[0]);

    console.log('\nFirst province:');
    console.log(psgcData.provinces[0]);

    console.log('\nFirst municipality:');
    console.log(psgcData.municipalities[0]);

    // TODO: Transform and validate data
    // TODO: Save to MongoDB
    // TODO: Implement upsert logic

  } catch (error) {
    console.error('Error syncing geographic data:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

run();
