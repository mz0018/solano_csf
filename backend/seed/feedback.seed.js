import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Feedback from '../models/feedback.model.js';
import Queue from '../models/queue.model.js';
import { services } from './office.services.seed.js';
import { customAlphabet } from 'nanoid';

dotenv.config();

const generateCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 6);

const firstNames = [
  'Juan', 'Maria', 'Jose', 'Ana', 'Pedro', 'Rosa', 'Manuel', 'Teresa',
  'Luis', 'Carmen', 'Antonio', 'Gloria', 'Ricardo', 'Lourdes', 'Fernando',
  'Elena', 'Rafael', 'Isabel', 'Miguel', 'Corazon', 'Carlos', 'Linda',
  'Eduardo', 'Milagros', 'Roberto', 'Natividad', 'Ramon', 'Pilar', 'Daniel', 'Lucia',
  'Francisco', 'Beverly', 'Alejandro', 'Marites', 'Rene', 'Jocelyn', 'Arturo', 'Vilma',
  'Sergio', 'Fe', 'Victor', 'Lilia', 'Ernesto', 'Rosario', 'Oscar', 'Perlita',
  'Leonardo', 'Salvacion', 'Rogelio', 'Helen'
];

const lastNames = [
  'Santos', 'Cruz', 'Reyes', 'Garcia', 'Mendoza', 'Torres', 'Tomas', 'Ramos',
  'Rivera', 'Gonzales', 'Aquino', 'Dela Cruz', 'Bautista', 'Ocampo', 'Villanueva',
  'Fernandez', 'Lopez', 'Perez', 'Castillo', 'Santiago', 'Martinez', 'Soriano',
  'Angeles', 'Domingo', 'Castro', 'Evangelista', 'Mercado', 'Salazar', 'Pascual', 'Lim'
];

const genders = ['Male', 'Female'];

const affiliations = [
  'General Public',
  'Government (Within LGU)',
  'Government (Other Offices/Agencies)',
];

const ageGroups = [
  '17 and below',
  '18-29',
  '30-39',
  '40-49',
  '50-59',
  '60 and above',
];

const employmentStatuses = ['Employed', 'Unemployed', 'Self-employed'];

const barangays = [
  'Bagahabag', 'Bangaan', 'Bangar', 'Bascaran', 'Communal',
  'Concepcion', 'Curifang', 'Dadap', 'Lactawan', 'Osmeña',
  'PD Galima', 'Poblacion North', 'Poblacion South', 'Quezon',
  'Quirino', 'Roxas', 'San Juan', 'San Luis', 'Tucal', 'Uddiawan', 'Wacal',
];

const commentsPool = [
  'Very satisfied with the service. Staff were helpful and professional.',
  'Fast transaction. Will recommend to others.',
  'Excellent service, everything was processed quickly.',
  'Staff is courteous and the process was smooth.',
  'Great experience. No issues encountered.',
  'Very accommodating staff. Thank you!',
  'Quick and efficient. Highly recommended.',
  'Everything was well-organized and easy.',
  'Service was okay. Could be faster.',
  'Average experience. Nothing special but acceptable.',
  'It was fine. Had to wait a bit but got served.',
  'Decent service. Some minor delays.',
  'Not bad. Process could be streamlined.',
  'Acceptable service. Room for improvement.',
  'Fair service. Expected a bit more.',
  'Long waiting time. Needs improvement.',
  'Service was slow. Staff seemed overwhelmed.',
  'Took too long. Very frustrating experience.',
  'Staff was not very helpful. Had to repeat my requirements.',
  'Needs better queue management.',
  'NA',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randRating = () => Math.floor(Math.random() * 5) + 1;

const generateQueueCode = (officeCode) => {
  const year = String(new Date().getFullYear()).slice(-2);
  return `${officeCode}${year}-${generateCode()}`;
};

const generateRandomDate = () => {
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const randomTime =
    oneYearAgo.getTime() +
    Math.random() * (now.getTime() - oneYearAgo.getTime());

  return new Date(randomTime);
};

const seedFeedback = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  const officesWithServices = [...new Set(services.map(s => s.officeCode))];
  const count = 50;

  const queueDocs = [];
  const feedbackDocs = [];

  for (let i = 0; i < count; i++) {
    const officeCode = pick(officesWithServices);
    const officeServices = services.filter(s => s.officeCode === officeCode);
    const service = pick(officeServices);
    const queueCode = generateQueueCode(officeCode);
    const createdAt = generateRandomDate();

    const hasBarangay = Math.random() > 0.3;

    queueDocs.push({
      officeCode,
      code: queueCode,
      status: 'used',
      createdAt,
    });

    feedbackDocs.push({
      officeCode,
      queueNumber: queueCode,
      service: service.code,
      client: {
        name: `${pick(firstNames)} ${pick(lastNames)}`,
        contactNumber: `09${Math.floor(100000000 + Math.random() * 900000000)}`,
        gender: pick(genders),
        affiliation: pick(affiliations),
        ageGroup: pick(ageGroups),
        employmentStatus: pick(employmentStatuses),
        address: hasBarangay ? 'Within Solano' : 'Outside Solano',
        barangay: hasBarangay ? pick(barangays) : undefined,
        addressDetail: !hasBarangay ? 'Brgy. Calabangan, Bagabag, Nueva Vizcaya' : undefined,
      },
      ratings: {
        responsiveness: randRating(),
        reliability: randRating(),
        accessFacilities: randRating(),
        communication: randRating(),
        costs: randRating(),
        integrity: randRating(),
        assurance: randRating(),
        outcome: randRating(),
      },
      comments: pick(commentsPool),
      createdAt,
    });
  }

  await Queue.insertMany(queueDocs);
  console.log(`Seeded ${queueDocs.length} queue tickets`);

  const saved = await Feedback.insertMany(feedbackDocs, { ordered: false }).catch(err => {
    console.error('Some feedback insert errors:', err.message);
    return [];
  });
  console.log(`Seeded ${saved.length} feedbacks`);

  await mongoose.disconnect();
  console.log('Done');
};

seedFeedback().catch((err) => {
  console.error(err);
  process.exit(1);
});