export interface MedicineAlternative {
  name: string;
  price: number;
  savings?: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  description?: string;
  alternatives: MedicineAlternative[];
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone?: string;
  hours?: string; // Optional
}
