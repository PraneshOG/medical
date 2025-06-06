
import { Medicine } from '../types';

export const mockMedicines: Medicine[] = [
  {
    id: 'med1',
    name: 'Amoxicillin 250mg',
    price: 15.99,
    description: 'A common antibiotic used to treat a wide variety of bacterial infections.',
    alternatives: [
      { name: 'Generic Amoxicillin A', price: 12.50, savings: '21.8%' },
      { name: 'Brand Amox B', price: 14.00, savings: '12.4%' },
    ],
  },
  {
    id: 'med2',
    name: 'Paracetamol 500mg',
    price: 5.49,
    description: 'Used to treat pain and fever. It is typically used for mild to moderate pain relief.',
    alternatives: [
      { name: 'Aceta-Relief', price: 4.99, savings: '9.1%' },
      { name: 'PainOff Tablets', price: 5.20, savings: '5.3%' },
    ],
  },
  {
    id: 'med3',
    name: 'Ibuprofen 200mg',
    price: 7.25,
    description: 'A nonsteroidal anti-inflammatory drug (NSAID) used for relieving pain, helping with fever, and reducing inflammation.',
    alternatives: [
      { name: 'Generic Ibuprofen X', price: 6.00, savings: '17.2%' },
      { name: 'Advil FastRelief', price: 7.00, savings: '3.4%' },
      { name: 'Nurofen Basic', price: 6.50, savings: '10.3%' },
    ],
  },
  {
    id: 'med4',
    name: 'Lisinopril 10mg',
    price: 12.80,
    description: 'An ACE inhibitor medication used to treat high blood pressure, heart failure, and after heart attacks.',
    alternatives: [
      { name: 'Prinivil Generic', price: 10.50, savings: '18.0%' },
      { name: 'Zestril Alternative', price: 11.20, savings: '12.5%' },
    ],
  },
  {
    id: 'med5',
    name: 'Metformin 500mg',
    price: 9.99,
    description: 'A first-line medication for the treatment of type 2 diabetes.',
    alternatives: [
      { name: 'Glucophage Generic', price: 8.50, savings: '14.9%' },
      { name: 'Fortamet Cheaper', price: 9.00, savings: '9.9%' },
    ],
  },
   {
    id: 'med6',
    name: 'Cetirizine 10mg',
    price: 8.75,
    description: 'An antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, and sneezing.',
    alternatives: [
      { name: 'Aller-Tec', price: 7.00, savings: '20%' },
      { name: 'Zyrtec Generic', price: 7.50, savings: '14.3%' },
    ],
  },
];
