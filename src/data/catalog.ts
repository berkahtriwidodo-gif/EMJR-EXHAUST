import { MotorcycleVehicle, Product, SoundCharacterDetail } from '../types';

export const OFFICIAL_INFO = {
  brand: {
    name: 'EMJR EXHAUST',
    tagline: 'Motorcycle Exhaust Manufacturer & Store',
    subheadline: 'Pilihan knalpot motor dengan karakter suara, material, dan desain yang sesuai dengan kebutuhan motormu.',
    workshop: 'Purbalingga, Jawa Tengah (Sentra Industri Knalpot Motor)',
    description: 'EMJR EXHAUST merupakan usaha manufaktur dan penjualan knalpot khusus sepeda motor. Menghadirkan knalpot fullset, leheran, dan custom dengan variasi material stainless steel, galvanis, dan monel presisi Plug & Play (PNP).',
    pillars: [
      { title: 'Kualitas Material', desc: 'Pilihan plat stainless steel anti karat, galvanis tebal hi-temp, dan monel kuat tahan panas kompresi.' },
      { title: 'Kerapian Produksi', desc: 'Pengerjaan leheran bending pipa presisi dengan sambungan las argon robotic cacing yang rapat dan rapi.' },
      { title: 'Karakter Suara', desc: 'Riset saringan dalam dengan 4 karakter khas: Sarfull (adem), Sarteng (ulem), Sarbor (gahar), dan Spiral (kering).' },
      { title: 'Kecocokan Produk', desc: 'Ukuran leheran dan dudukan baut 100% presisi PNP untuk rangka motor bebek, matic, maupun sport.' },
      { title: 'Pelayanan Konsumen', desc: 'Konsultasi spesifikasi gratis via WhatsApp dan keamanan transaksi melalui toko resmi Shopee.' },
    ]
  },
  shopee: {
    storeName: 'Bakulknalpotmatic',
    url: 'https://shopee.co.id/amrull1424',
  },
  whatsapp: {
    number: '0895392822938',
    formatted: '0895-3928-22938',
    url: 'https://wa.me/62895392822938',
  },
  tiktok: {
    handle: '@herfin.n',
    url: 'https://www.tiktok.com/@herfin.n',
  }
};

/**
 * Builds the official WhatsApp automated message:
 * "Halo EMJR EXHAUST, saya tertarik dengan produk [Nama Produk] untuk motor [Tipe Motor]. Mohon informasi harga dan ketersediaannya."
 */
export function buildWhatsAppUrl(productName?: string, motorName?: string, customNote?: string): string {
  let message = '';
  if (productName && motorName) {
    message = `Halo EMJR EXHAUST, saya tertarik dengan produk ${productName} untuk motor ${motorName}. Mohon informasi harga dan ketersediaannya.`;
  } else if (productName) {
    message = `Halo EMJR EXHAUST, saya tertarik dengan produk ${productName}. Mohon informasi harga, spesifikasi, dan ketersediaannya.`;
  } else if (motorName) {
    message = `Halo EMJR EXHAUST, saya ingin konsultasi knalpot yang cocok untuk motor ${motorName}. Mohon rekomendasi model, material, dan harga.`;
  } else {
    message = `Halo EMJR EXHAUST, saya ingin berkonsultasi seputar pemesanan knalpot motor.`;
  }

  if (customNote) {
    message += ` Catatan: ${customNote}`;
  }

  return `${OFFICIAL_INFO.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

// Master Motorcycles Database with Model & Generation Hierarchy
export const MOTORCYCLES_DATABASE: MotorcycleVehicle[] = [
  {
    id: 'honda-astrea',
    brand: 'Honda',
    model: 'Astrea',
    generations: ['Astrea Grand (1991-1998)', 'Astrea Prima (1988-1992)', 'Astrea Legenda (2001-2004)', 'Astrea Star (1985-1995)'],
    popular: true,
    image: '/astrea.webp'
  },
  {
    id: 'honda-supra-x',
    brand: 'Honda',
    model: 'Supra X',
    generations: ['Supra X 125 Karbu (2005-2013)', 'Supra X 100cc (1997-2004)', 'Supra X 125 Helm-In (2011-2018)', 'Supra X 125 FI (2014-Sekarang)'],
    popular: true,
    image: '/suprax.webp'
  },
  {
    id: 'honda-karisma',
    brand: 'Honda',
    model: 'Karisma',
    generations: ['Karisma 125 D (2002-2005)', 'Karisma 125 X (2002-2005)'],
    popular: true,
    image: '/karisma.webp'
  },
  {
    id: 'honda-revo',
    brand: 'Honda',
    model: 'Revo',
    generations: ['Revo 100cc Lancip (2007-2009)', 'Revo Absolute 110 (2009-2014)', 'Revo FI 110 (2014-Sekarang)'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'honda-supra-fit',
    brand: 'Honda',
    model: 'Supra Fit',
    generations: ['Supra Fit Lama (2003-2006)', 'Supra Fit New / X (2006-2009)'],
    popular: false,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'yamaha-jupiter-z',
    brand: 'Yamaha',
    model: 'Jupiter Z',
    generations: ['Jupiter Z Burhan 110 (2006-2009)', 'Jupiter Z 110 5TP (2003-2006)', 'Jupiter Z Robot 115 (2009-2012)', 'Jupiter Z1 FI (2012-Sekarang)'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1547025603-ef9079944061?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'yamaha-vega',
    brand: 'Yamaha',
    model: 'Vega',
    generations: ['Vega R Lama (2003-2005)', 'Vega R New (2006-2009)', 'Vega ZR 115 (2009-2013)'],
    popular: false,
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'suzuki-smash',
    brand: 'Suzuki',
    model: 'Smash',
    generations: ['Smash 110 Tromol/Cakram (2002-2006)', 'Smash Titan 115 (2010-2013)', 'New Smash FI 115 (2017-Sekarang)'],
    popular: false,
    image: 'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'suzuki-shogun',
    brand: 'Suzuki',
    model: 'Shogun',
    generations: ['Shogun 110 Kebo (1996-2000)', 'Shogun 110 R (2000-2004)', 'Shogun 125 SP / FD / FL (2004-2010)'],
    popular: false,
    image: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'kawasaki-kaze',
    brand: 'Kawasaki',
    model: 'Kaze',
    generations: ['Kaze R 110 (1997-2005)', 'Blitz R 112 (2004-2009)', 'Kaze ZX 130 (2005-2011)'],
    popular: false,
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80'
  }
];

// Sound Characters with real technical descriptions
export const SOUND_CHARACTERS: SoundCharacterDetail[] = [
  {
    id: 'Sarfull',
    name: 'SARFULL (Saringan Full)',
    shortDesc: 'Bass Adem Gerung, Lembut & Ramah Lingkungan',
    description: 'Pipa saringan di dalam silencer dibuat penuh dari pangkal hingga ujung tabung dilapisi glasswool putih tebal. Menghasilkan suara ngebass bulat adem saat digas, sangat senyap dan halus saat langsam stasioner. Sangat cocok untuk motor harian, bekerja, atau yang mengutamakan kenyamanan di jalan raya.',
    image: '/astrea.webp',
    audioSampleName: 'Sampel Suara Sarfull (Bass Adem)',
    frequencyProfile: {
      subBass: 38,
      midTone: 75,
      filterType: 'lowpass',
      filterFreq: 220
    }
  },
  {
    id: 'Sarteng',
    name: 'SARTENG (Saringan Setengah)',
    shortDesc: 'Bass Padat Bertenaga, Ulem di RPM Atas',
    description: 'Konstruksi saringan dibuat setengah pipa perforated strimin dan setengah tabung resonansi kosong. Karakter suaranya ngebass padat bervolume, tarikan mesin terasa lebih responsif tanpa kehilangan kompresi bawah. Favorit anak muda untuk sunmori santai dan turing.',
    image: '/suprax.webp',
    audioSampleName: 'Sampel Suara Sarteng (Bass Padat)',
    frequencyProfile: {
      subBass: 48,
      midTone: 95,
      filterType: 'bandpass',
      filterFreq: 340
    }
  },
  {
    id: 'Sarbor',
    name: 'SARBOR (Saringan Bor-Boran)',
    shortDesc: 'Gahar Padat Menggelegar, Nafas Plong',
    description: 'Saringan khusus hasil bor presisi lubang bertingkat dengan pemadatan peredam khusus. Memberikan suara gahar bertenaga yang padat berkarakter khas motor road race atau drag. Akselerasi RPM menengah ke atas terbuka plong tanpa hambatan gas buang.',
    image: '/karisma.webp',
    audioSampleName: 'Sampel Suara Sarbor (Gahar Balap)',
    frequencyProfile: {
      subBass: 55,
      midTone: 120,
      filterType: 'highpass',
      filterFreq: 290
    }
  },
  {
    id: 'Spiral',
    name: 'SPIRAL (Saringan Spiral Torsional)',
    shortDesc: 'Suara Kering Renyah, Karakter Unik RPM Tinggi',
    description: 'Desain saringan spiral memutar yang mengarahkan pusaran gas buang secara aerodinamis. Menghasilkan suara renyah berkarakter unik dengan aksen desisan kompresi yang padat di putaran tinggi. Sangat cocok bagi pecinta modifikasi beraliran kontes maupun daily racing.',
    image: 'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=600&auto=format&fit=crop&q=80',
    audioSampleName: 'Sampel Suara Spiral (Kering Renyah)',
    frequencyProfile: {
      subBass: 42,
      midTone: 105,
      filterType: 'bandpass',
      filterFreq: 380
    }
  }
];

// Initial Catalog Data
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'emjr-astrea-galvanis-fullset',
    name: 'Knalpot EMJR Fullset Honda Astrea Galvanis Series',
    slug: 'knalpot-emjr-fullset-honda-astrea-galvanis',
    category: 'Knalpot Fullset',
    material: 'Galvanis',
    soundCharacter: 'Sarfull',
    priceType: 'numeric',
    price: 240000,
    image: '/astrea.webp',
    gallery: ['/astrea.webp', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&auto=format&fit=crop&q=80'],
    description: 'Knalpot motor fullset buatan EMJR EXHAUST khusus untuk seri Honda Astrea (Grand, Prima, Legenda, Star). Dibuat dari plat galvanis tebal anti panas dengan finishing cat hitam bakar hi-temp tahan suhu tinggi. Menghadirkan karakter suara bass adem yang ramah di jalan raya.',
    installationInfo: '100% Plug & Play (PNP) pada rangka Honda Astrea tanpa perlu merubah dudukan baut footstep atau sasis.',
    specs: [
      { label: 'Tipe Knalpot', value: 'Fullset (Header Leher + Silincer)' },
      { label: 'Material Header', value: 'Pipa Galvanis Tebal 1.2mm' },
      { label: 'Material Silincer', value: 'Plat Galvanis Coating Hi-Temp 600°C' },
      { label: 'Karakter Suara', value: 'Sarfull (Bass Adem Gerung)' },
      { label: 'Ukuran Inlet', value: 'Standar Presisi PNP 26-28mm' },
      { label: 'Kelengkapan', value: 'Pipa leher, silincer, klem bracket, per pengait' },
    ],
    compatibleBikes: [
      { brand: 'Honda', model: 'Astrea', generation: 'Astrea Grand (1991-1998)' },
      { brand: 'Honda', model: 'Astrea', generation: 'Astrea Prima (1988-1992)' },
      { brand: 'Honda', model: 'Astrea', generation: 'Astrea Legenda (2001-2004)' },
      { brand: 'Honda', model: 'Astrea', generation: 'Astrea Star (1985-1995)' },
    ],
    shopeeUrl: OFFICIAL_INFO.shopee.url,
    inStock: true,
    isFeatured: true
  },
  {
    id: 'emjr-suprax-stainless-fullset',
    name: 'Knalpot EMJR Fullset Honda Supra X Stainless Steel Series',
    slug: 'knalpot-emjr-fullset-honda-supra-x-stainless',
    category: 'Knalpot Fullset',
    material: 'Stainless Steel',
    soundCharacter: 'Sarteng',
    priceType: 'numeric',
    price: 340000,
    image: '/suprax.webp',
    gallery: ['/suprax.webp', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&auto=format&fit=crop&q=80'],
    description: 'Knalpot motor fullset premium berbahan Full Stainless Steel anti karat selamanya khusus untuk keluarga Honda Supra X dan Supra X 125. Pipa leher roll bending presisi dengan las cacing argon rapi mengkilap. Karakter suara ulem padat bertenaga.',
    installationInfo: 'Pemasangan PNP langsung pas ke baut silinder head dan dudukan footstep belakang Honda Supra X.',
    specs: [
      { label: 'Tipe Knalpot', value: 'Fullset (Pipa Header + Silincer)' },
      { label: 'Material Header', value: 'Stainless Steel 201 Bending Tebal' },
      { label: 'Material Silincer', value: 'Stainless Steel Mirror Polish' },
      { label: 'Karakter Suara', value: 'Sarteng (Bass Ulem Padat)' },
      { label: 'Tipe Sambungan', value: 'Las Argon Cacing Robotik' },
      { label: 'Kelengkapan', value: 'Header stainless, tabung silincer, 2 per pengait gold' },
    ],
    compatibleBikes: [
      { brand: 'Honda', model: 'Supra X', generation: 'Supra X 125 Karbu (2005-2013)' },
      { brand: 'Honda', model: 'Supra X', generation: 'Supra X 100cc (1997-2004)' },
      { brand: 'Honda', model: 'Supra X', generation: 'Supra X 125 FI (2014-Sekarang)' },
      { brand: 'Honda', model: 'Supra Fit', generation: 'Supra Fit Lama (2003-2006)' },
      { brand: 'Honda', model: 'Supra Fit', generation: 'Supra Fit New / X (2006-2009)' },
    ],
    shopeeUrl: OFFICIAL_INFO.shopee.url,
    inStock: true,
    isFeatured: true
  },
  {
    id: 'emjr-karisma-stainless-fullset',
    name: 'Knalpot EMJR Fullset Honda Karisma 125 Stainless Series',
    slug: 'knalpot-emjr-fullset-honda-karisma-stainless',
    category: 'Knalpot Fullset',
    material: 'Stainless Steel',
    soundCharacter: 'Sarbor',
    priceType: 'numeric',
    price: 340000,
    image: '/karisma.webp',
    gallery: ['/karisma.webp', 'https://images.unsplash.com/photo-1547025603-ef9079944061?w=700&auto=format&fit=crop&q=80'],
    description: 'Knalpot fullset stainless steel presisi untuk Honda Karisma 125 (Tipe X maupun D). Menggunakan saringan model Sarbor yang memberikan tarikan lebih plong di putaran atas dan desibel suara padat khas racing harian.',
    installationInfo: 'Langsung pasang PNP tanpa ganjal plat tambahan.',
    specs: [
      { label: 'Tipe Knalpot', value: 'Fullset PNP Honda Karisma' },
      { label: 'Material', value: 'Full Stainless Steel Anti Karat' },
      { label: 'Karakter Suara', value: 'Sarbor (Gahar Padat Responsif)' },
      { label: 'Peredam Dalam', value: 'Glasswool Putih Tahan Api' },
      { label: 'Kelengkapan', value: 'Header pipa bending, tabung silincer, klem gantungan' },
    ],
    compatibleBikes: [
      { brand: 'Honda', model: 'Karisma', generation: 'Karisma 125 D (2002-2005)' },
      { brand: 'Honda', model: 'Karisma', generation: 'Karisma 125 X (2002-2005)' },
    ],
    shopeeUrl: OFFICIAL_INFO.shopee.url,
    inStock: true,
    isFeatured: true
  },
  {
    id: 'emjr-revo-galvanis-fullset',
    name: 'Knalpot EMJR Fullset Honda Revo Galvanis Series',
    slug: 'knalpot-emjr-fullset-honda-revo-galvanis',
    category: 'Knalpot Fullset',
    material: 'Galvanis',
    soundCharacter: 'Sarfull',
    priceType: 'numeric',
    price: 240000,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&auto=format&fit=crop&q=80',
    description: 'Pilihan knalpot harian ekonomis berkualitas untuk Honda Revo 100cc, Revo Absolute 110, maupun Revo FI. Bahan plat galvanis kuat, tidak mudah keropos dan menghasilkan suara empuk lembut ramah tetangga.',
    installationInfo: 'PNP baut dudukan bawaan rangka Honda Revo.',
    specs: [
      { label: 'Tipe Knalpot', value: 'Fullset Standar Harian' },
      { label: 'Material', value: 'Pipa Galvanis + Cat Coating Oven' },
      { label: 'Karakter Suara', value: 'Sarfull (Bass Adem)' },
      { label: 'Kelengkapan', value: 'Header pipa, silincer, per' },
    ],
    compatibleBikes: [
      { brand: 'Honda', model: 'Revo', generation: 'Revo 100cc Lancip (2007-2009)' },
      { brand: 'Honda', model: 'Revo', generation: 'Revo Absolute 110 (2009-2014)' },
      { brand: 'Honda', model: 'Revo', generation: 'Revo FI 110 (2014-Sekarang)' },
    ],
    shopeeUrl: OFFICIAL_INFO.shopee.url,
    inStock: true,
    isFeatured: false
  },
  {
    id: 'emjr-silincer-only-spiral',
    name: 'Silincer Knalpot EMJR Saringan Spiral Universal',
    slug: 'silincer-knalpot-emjr-saringan-spiral-universal',
    category: 'Silincer Knalpot',
    material: 'Stainless Steel',
    soundCharacter: 'Spiral',
    priceType: 'contact_admin',
    price: null, // "Hubungi Admin" as requested for non-standardized silincer only
    image: 'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=700&auto=format&fit=crop&q=80',
    description: 'Tabung silincer knalpot saja bagi yang sudah memiliki leheran header di motor. Dilengkapi saringan konstruksi spiral memutar dengan suara kering renyah bertenaga.',
    installationInfo: 'Universal inlet 28mm / 32mm / 38mm / 50mm (silakan konsultasikan ukuran leheran Anda ke admin).',
    specs: [
      { label: 'Kategori', value: 'Silincer Only (Tabung Saja)' },
      { label: 'Material', value: 'Stainless Steel Finishing Poles' },
      { label: 'Karakter Suara', value: 'Spiral (Kering Renyah)' },
      { label: 'Pilihan Inlet', value: '28mm / 32mm / 38mm / 50mm' },
      { label: 'Kelengkapan', value: 'Silincer, 2 pcs per pengait' },
    ],
    compatibleBikes: [
      { brand: 'Honda', model: 'Astrea' },
      { brand: 'Honda', model: 'Supra X' },
      { brand: 'Honda', model: 'Karisma' },
      { brand: 'Honda', model: 'Revo' },
      { brand: 'Yamaha', model: 'Jupiter Z' },
    ],
    shopeeUrl: OFFICIAL_INFO.shopee.url,
    inStock: true,
    isFeatured: false
  },
  {
    id: 'emjr-leheran-bending-stainless',
    name: 'Leheran Knalpot EMJR Bending Stainless Steel Presisi',
    slug: 'leheran-knalpot-emjr-bending-stainless',
    category: 'Leheran Knalpot',
    material: 'Stainless Steel',
    soundCharacter: 'Sarfull',
    priceType: 'contact_admin',
    price: null, // "Hubungi Admin"
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=700&auto=format&fit=crop&q=80',
    description: 'Pipa leher knalpot (header pipe) roll bending mesin presisi tanpa tekukan gepeng. Menjaga kelancaran debit gas buang dari ruang bakar menuju silincer.',
    installationInfo: 'PNP sesuai manifold port motor pilihan.',
    specs: [
      { label: 'Kategori', value: 'Header Leheran Knalpot' },
      { label: 'Material', value: 'Pipa Stainless Steel Tebal' },
      { label: 'Metode Bending', value: 'Roll Mandrel Mesin (Bebas Hambatan)' },
      { label: 'Opsi Inlet Out', value: 'Inlet 28mm / 38mm / 50mm' },
    ],
    compatibleBikes: [
      { brand: 'Honda', model: 'Astrea' },
      { brand: 'Honda', model: 'Supra X' },
      { brand: 'Honda', model: 'Karisma' },
      { brand: 'Honda', model: 'Revo' },
    ],
    shopeeUrl: OFFICIAL_INFO.shopee.url,
    inStock: true,
    isFeatured: false
  },
  {
    id: 'emjr-custom-monel-series',
    name: 'Knalpot EMJR Custom Monel High-Heat Edition',
    slug: 'knalpot-emjr-custom-monel-edition',
    category: 'Knalpot Custom',
    material: 'Monel',
    soundCharacter: 'Sarbor',
    priceType: 'contact_admin',
    price: null, // "Hubungi Admin" for Monel & Custom
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&auto=format&fit=crop&q=80',
    description: 'Knalpot custom edisi bahan monel pilihan dengan ketahanan panas sangat tinggi dan bobot padat. Dikerjakan berdasarkan pesanan khusus untuk spek mesin harian turing maupun bore up.',
    installationInfo: 'Dibuat custom sesuai spek motor dan rangka pemesan.',
    specs: [
      { label: 'Kategori', value: 'Knalpot Custom Khusus' },
      { label: 'Material', value: 'Monel High Strength & Heat Resistant' },
      { label: 'Karakter Suara', value: 'Request: Sarfull / Sarteng / Sarbor / Spiral' },
      { label: 'Status Harga', value: 'Hubungi Admin untuk Estimasi & Konsultasi' },
    ],
    compatibleBikes: [
      { brand: 'Honda', model: 'Astrea' },
      { brand: 'Honda', model: 'Supra X' },
      { brand: 'Honda', model: 'Karisma' },
      { brand: 'Yamaha', model: 'Jupiter Z' },
      { brand: 'Suzuki', model: 'Shogun' },
    ],
    shopeeUrl: OFFICIAL_INFO.shopee.url,
    inStock: true,
    isFeatured: false
  }
];

export const TIKTOK_SHOWCASE_VIDEOS = [
  {
    id: 'tt-1',
    title: 'Sound Test Knalpot EMJR Fullset Honda Astrea Grand Suara Sarfull',
    sound: 'Sarfull (Bass Adem)',
    motor: 'Honda Astrea Grand',
    views: '412K',
    date: 'Video Resmi TikTok',
    url: 'https://www.tiktok.com/@herfin.n',
    thumbnail: '/astrea.webp'
  },
  {
    id: 'tt-2',
    title: 'Review Knalpot EMJR Stainless Steel Honda Supra X 125 Suara Sarteng',
    sound: 'Sarteng (Bass Padat)',
    motor: 'Honda Supra X 125',
    views: '280K',
    date: 'Video Resmi TikTok',
    url: 'https://www.tiktok.com/@herfin.n',
    thumbnail: '/suprax.webp'
  },
  {
    id: 'tt-3',
    title: 'Detail Hasil Las Cacing Argon & Finishing Knalpot Honda Karisma EMJR',
    sound: 'Sarbor (Gahar Balap)',
    motor: 'Honda Karisma 125',
    views: '540K',
    date: 'Dokumentasi Workshop',
    url: 'https://www.tiktok.com/@herfin.n',
    thumbnail: '/karisma.webp'
  },
  {
    id: 'tt-4',
    title: 'Proses Bending Pipa Header & Perakitan Saringan Dalam di Workshop Purbalingga',
    sound: 'Proses Produksi',
    motor: 'Semua Motor Bebek & Matic',
    views: '360K',
    date: 'Aktivitas Workshop',
    url: 'https://www.tiktok.com/@herfin.n',
    thumbnail: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80'
  }
];
