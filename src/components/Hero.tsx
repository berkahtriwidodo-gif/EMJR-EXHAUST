import React from 'react';
import { OFFICIAL_INFO } from '../data/catalog';
import { Search, ChevronRight, ShoppingBag, MessageSquare, ShieldCheck, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

interface HeroProps {
  onCariKnalpot: () => void;
  onLihatKatalog: () => void;
  onSelectMotorCard: (model: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCariKnalpot,
  onLihatKatalog,
  onSelectMotorCard,
}) => {
  // Motor category cards as specified in the master prompt
  const motorCategories = [
    {
      name: 'Honda Astrea',
      model: 'Astrea',
      generations: 'Grand, Prima, Legenda, Star',
      image: '/astrea.webp',
      badge: 'Fullset Galvanis / Stainless',
      price: 'Mulai Rp240.000',
    },
    {
      name: 'Honda Supra X',
      model: 'Supra X',
      generations: '100cc, 125 Karbu, 125 FI',
      image: '/suprax.webp',
      badge: 'Bestseller Stainless Series',
      price: 'Mulai Rp240.000',
    },
    {
      name: 'Honda Karisma',
      model: 'Karisma',
      generations: 'Karisma 125 D, Karisma 125 X',
      image: '/karisma.webp',
      badge: 'Stainless Steel Las Cacing',
      price: 'Mulai Rp340.000',
    },
    {
      name: 'Honda Revo',
      model: 'Revo',
      generations: '100cc, Absolute 110, FI',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
      badge: 'Pilihan Harian Awet',
      price: 'Mulai Rp240.000',
    },
  ];

  return (
    <div className="bg-[#101010] text-[#F6F5F2]">
      
      {/* 1. Industrial Hero Main Banner */}
      <section className="relative border-b border-[#262626] py-14 sm:py-20 lg:py-24 overflow-hidden">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#8B35C9 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C1C1C] border border-[#2B2B2B] text-xs font-semibold text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#8B35C9]" />
                <span className="uppercase tracking-wider">EMJR EXHAUST • Purbalingga</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400">100% Presisi PNP</span>
              </div>

              {/* Exact Master Prompt Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading leading-[1.05]">
                  FIND THE RIGHT EXHAUST FOR YOUR MOTORCYCLE.
                </h1>
                
                {/* Exact Master Prompt Subheadline */}
                <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
                  Pilihan knalpot motor dengan karakter suara, material, dan desain yang sesuai dengan kebutuhan motormu.
                </p>
              </div>

              {/* Quick Quality Specs */}
              <div className="grid grid-cols-3 gap-3 pt-1 border-y border-[#222222] py-4 text-xs">
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px]">Material</span>
                  <span className="font-bold text-white text-xs sm:text-sm">Stainless & Galvanis</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px]">Saringan</span>
                  <span className="font-bold text-[#8B35C9] text-xs sm:text-sm">4 Karakter Suara</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px]">Pemasangan</span>
                  <span className="font-bold text-emerald-400 text-xs sm:text-sm">Plug & Play (PNP)</span>
                </div>
              </div>

              {/* Exact Master Prompt Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onCariKnalpot}
                  className="px-6 py-3.5 bg-[#8B35C9] hover:bg-[#7828b0] text-white text-sm font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Cari Knalpot</span>
                </button>

                <button
                  onClick={onLihatKatalog}
                  className="px-6 py-3.5 bg-[#1C1C1C] hover:bg-[#282828] text-white text-sm font-bold uppercase tracking-wider rounded border border-[#333333] transition-colors flex items-center gap-2"
                >
                  <span>Lihat Katalog</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Official Store Channels */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <span className="text-neutral-500">Toko Resmi:</span>
                <a
                  href={OFFICIAL_INFO.shopee.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Shopee: <strong className="text-white">{OFFICIAL_INFO.shopee.storeName}</strong></span>
                </a>
                <a
                  href={OFFICIAL_INFO.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>WhatsApp: <strong className="text-white">{OFFICIAL_INFO.whatsapp.formatted}</strong></span>
                </a>
              </div>

            </div>

            {/* Right Product Showcase (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#141414] border border-[#262626] rounded-lg p-5 sm:p-6 shadow-xl relative">
                
                {/* Header tag */}
                <div className="flex items-center justify-between pb-3 border-b border-[#262626] text-xs">
                  <span className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#8B35C9]" />
                    Seri Knalpot Unggulan EMJR
                  </span>
                  <span className="text-[11px] text-[#8B35C9] font-bold">100% PNP</span>
                </div>

                {/* Primary Real Photo */}
                <div className="aspect-[4/3] rounded bg-[#0A0A0A] border border-[#222222] my-4 overflow-hidden relative group">
                  <img
                    src="/astrea.webp"
                    alt="Knalpot EMJR Fullset Honda Astrea"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#101010]/90 text-[10px] font-bold px-2 py-0.5 rounded text-neutral-300 border border-[#2E2E2E]">
                    Galvanis Rp240.000
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-[#8B35C9] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Stainless Rp340.000
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#101010]/90 backdrop-blur-sm p-2 rounded border border-[#262626] flex items-center justify-between text-xs">
                    <span className="text-neutral-200 font-semibold truncate">Honda Astrea Series (Grand / Prima / Star)</span>
                    <span className="text-[#8B35C9] font-bold shrink-0 ml-2">Sarfull / Sarteng</span>
                  </div>
                </div>

                {/* Quick specs */}
                <div className="space-y-1.5 text-xs text-neutral-400 pb-4 border-b border-[#262626]">
                  <div className="flex items-center justify-between">
                    <span>Pipa Leheran:</span>
                    <strong className="text-neutral-200">Bending Roll Presisi (Bebas Kerut)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pengelasan:</span>
                    <strong className="text-neutral-200">Las Argon Cacing Robotik</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pilihan Karakter:</span>
                    <strong className="text-white">Sarfull, Sarteng, Sarbor, Spiral</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={OFFICIAL_INFO.shopee.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded bg-[#EE4D2D] hover:bg-[#d63f20] text-white font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shopee Store</span>
                  </a>

                  <button
                    onClick={onCariKnalpot}
                    className="py-2.5 px-3 rounded bg-[#222222] hover:bg-[#2A2A2A] text-white font-semibold flex items-center justify-center gap-1 transition-colors border border-[#333333]"
                  >
                    <span>Cari Tipe Motor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION: PILIH KNALPOT SESUAI MOTOR (Master Prompt Section 5) */}
      <section className="py-14 sm:py-16 bg-[#141414] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#262626]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B35C9] block mb-1">
                Katalog Sepeda Motor
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
                PILIH KNALPOT SESUAI MOTOR
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Temukan knalpot yang terbukti presisi dan langsung pasang (Plug & Play) untuk model sepeda motor Anda:
              </p>
            </div>

            <button
              onClick={onCariKnalpot}
              className="self-start md:self-auto text-xs text-[#8B35C9] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Gunakan Filter Step-by-Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cards for Honda Astrea, Honda Supra X, Honda Karisma, Honda Revo, and other models */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {motorCategories.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectMotorCard(item.model)}
                className="bg-[#191919] border border-[#2B2B2B] hover:border-[#8B35C9] rounded-md overflow-hidden flex flex-col justify-between p-4 cursor-pointer group transition-all"
              >
                <div>
                  {/* Photo */}
                  <div className="aspect-[16/11] bg-[#111111] rounded overflow-hidden mb-3 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#101010]/90 text-[10px] font-bold text-neutral-300 px-2 py-0.5 rounded border border-[#2E2E2E]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#8B35C9] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    Seri: {item.generations}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase">Harga Knalpot</span>
                    <strong className="text-white font-heading text-sm">{item.price}</strong>
                  </div>

                  <span className="text-[#8B35C9] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Lihat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
