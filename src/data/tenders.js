const h = (hours) => new Date(Date.now() + hours * 3600 * 1000).toISOString();

export const CATEGORIES = ['Tablets', 'Injectables', 'OTC', 'Surgical Supplies'];
export const STATUSES = ['Open for Bids', 'Pending Review', 'Awarded'];
export const BATCH_SIZES = [
  { id: 'small', label: 'Under 5,000 units', test: (q) => q < 5000 },
  { id: 'medium', label: '5,000 – 50,000 units', test: (q) => q >= 5000 && q <= 50000 },
  { id: 'large', label: 'Over 50,000 units', test: (q) => q > 50000 },
];
export const CERTIFICATIONS = ['WHO-GMP', 'ISO 13485', 'USFDA', 'DRAP Registered', 'EU-GMP'];

export const initialTenders = [
  { id: 'T-1041', medicine: 'Amoxicillin 500mg Capsules', category: 'Tablets', quantity: 120000, unit: 'capsules', dosage: '500 mg', targetPrice: 0.042, expiry: 'Min. 24 months shelf life', location: 'Lahore, PK', deadline: h(52), status: 'Open for Bids', bids: 7, buyer: 'Shifa Care Pharmacies', certs: ['WHO-GMP', 'DRAP Registered'] },
  { id: 'T-1042', medicine: 'Ceftriaxone 1g Vials', category: 'Injectables', quantity: 18000, unit: 'vials', dosage: '1 g / vial', targetPrice: 0.61, expiry: 'Min. 18 months shelf life', location: 'Karachi, PK', deadline: h(20), status: 'Open for Bids', bids: 11, buyer: 'Indus Hospital Network', certs: ['WHO-GMP', 'EU-GMP'] },
  { id: 'T-1043', medicine: 'Paracetamol 500mg Tablets', category: 'OTC', quantity: 400000, unit: 'tablets', dosage: '500 mg', targetPrice: 0.011, expiry: 'Min. 30 months shelf life', location: 'Islamabad, PK', deadline: h(96), status: 'Open for Bids', bids: 14, buyer: 'MedPoint Retail Group', certs: ['WHO-GMP'] },
  { id: 'T-1044', medicine: 'Sterile Surgical Gloves (Size 7.5)', category: 'Surgical Supplies', quantity: 3500, unit: 'boxes', dosage: 'Box of 50 pairs', targetPrice: 6.8, expiry: 'Min. 36 months shelf life', location: 'Faisalabad, PK', deadline: h(8), status: 'Open for Bids', bids: 4, buyer: 'Al-Noor Surgical Centre', certs: ['ISO 13485'] },
  { id: 'T-1045', medicine: 'Insulin Glargine 100IU/mL', category: 'Injectables', quantity: 4200, unit: 'pens', dosage: '3 mL prefilled pen', targetPrice: 9.4, expiry: 'Min. 12 months shelf life', location: 'Lahore, PK', deadline: h(130), status: 'Pending Review', bids: 5, buyer: 'Mayo Diabetes Clinic', certs: ['WHO-GMP', 'USFDA'] },
  { id: 'T-1046', medicine: 'Metformin 850mg Tablets', category: 'Tablets', quantity: 60000, unit: 'tablets', dosage: '850 mg', targetPrice: 0.019, expiry: 'Min. 24 months shelf life', location: 'Multan, PK', deadline: h(-10), status: 'Awarded', bids: 9, buyer: 'Chenab Pharmacy Chain', certs: ['WHO-GMP', 'DRAP Registered'] },
  { id: 'T-1047', medicine: 'Oral Rehydration Salts', category: 'OTC', quantity: 25000, unit: 'sachets', dosage: '20.5 g sachet', targetPrice: 0.07, expiry: 'Min. 24 months shelf life', location: 'Peshawar, PK', deadline: h(70), status: 'Open for Bids', bids: 3, buyer: 'Khyber Health Supplies', certs: ['WHO-GMP'] },
  { id: 'T-1048', medicine: 'Disposable Syringes 5mL', category: 'Surgical Supplies', quantity: 90000, unit: 'units', dosage: '5 mL, 23G', targetPrice: 0.035, expiry: 'Min. 36 months shelf life', location: 'Rawalpindi, PK', deadline: h(160), status: 'Pending Review', bids: 6, buyer: 'City General Hospital', certs: ['ISO 13485', 'WHO-GMP'] },
];
