export interface Farm {
  id: string;
  farmer_id: string;
  name: string;
  state: string;
  district: string;
  village: string;
  pincode: string;
  land_size: number;
  land_unit: 'acres' | 'hectares';
  farming_type: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  crops?: string[];
}

export interface FarmCrop {
  id: string;
  farm_id: string;
  crop_name: string;
  created_at: string;
}

export interface FarmerProduct {
  id: string;
  farmer_id: string;
  name: string;
  description?: string;
  category: string;
  unit: 'kg' | 'pcs';
  price: number;
  stock: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}