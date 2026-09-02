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

    const psgcData = await PhilippineStandardGeographicService.syncPhilippineStandardGeographicData();

    const regions = psgcData.regions.map((region) => ({
      name: region.name,
      psgcCode: region.code
    }));

    const provinces = psgcData.provinces.map((province) => ({
      name: province.name,
      psgcCode: province.code
    }));

    const municipalities = psgcData.municipalities.map((municipality) => ({
      name: municipality.name,
      psgcCode: municipality.code,
      type: municipality.type,
      zipCode: municipality.zip_code,
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

    regions.forEach((region) => {
      console.log(`Region: ${region.name}, PSGC Code: ${region.psgcCode}`);
    });

    provinces.forEach((province) => {
      console.log(`Province: ${province.name}, PSGC Code: ${province.psgcCode}`);
    });

    municipalities.forEach((municipality) => {
      console.log(`Municipality: ${municipality.name}, PSGC Code: ${municipality.psgcCode}`);
    });

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
