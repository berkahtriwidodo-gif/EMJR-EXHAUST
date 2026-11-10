export type MotorcycleBrand = 'Honda' | 'Yamaha' | 'Suzuki' | 'Kawasaki' | 'Lainnya';

export type ProductCategory = 
  | 'Knalpot Fullset'
  | 'Silincer Knalpot'
  | 'Leheran Knalpot'
  | 'Knalpot Custom'
  | 'Sparepart dan Aksesori';

export type MaterialType = 'Stainless Steel' | 'Galvanis' | 'Monel';

export type SoundCharacter = 'Sarfull' | 'Sarteng' | 'Sarbor' | 'Spiral';

export interface MotorcycleCompatibility {
  brand: MotorcycleBrand;
  model: string;
  generation?: string;
}

export interface MotorcycleVehicle {
  id: string;
  brand: MotorcycleBrand;
  model: string;
  generations: string[];
  popular?: boolean;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  material: MaterialType;
  soundCharacter: SoundCharacter;
  priceType: 'numeric' | 'contact_admin';
  price: number | null; // e.g. 240000 for Fullset Galvanis, 340000 for Fullset Stainless, null for Hubungi Admin
  image: string;
  gallery?: string[];
  description: string;
  installationInfo: string;
  specs: {
    label: string;
    value: string;
  }[];
  compatibleBikes: MotorcycleCompatibility[];
  shopeeUrl: string;
  inStock: boolean;
  isFeatured?: boolean;
}

export interface SoundCharacterDetail {
  id: SoundCharacter;
  name: string;
  shortDesc: string;
  description: string;
  image: string;
  audioSampleName: string;
  frequencyProfile: {
    subBass: number;
    midTone: number;
    filterType: BiquadFilterType;
    filterFreq: number;
  };
}
