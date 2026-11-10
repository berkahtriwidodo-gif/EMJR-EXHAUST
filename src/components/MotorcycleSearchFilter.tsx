import React, { useState } from 'react';
import { MotorcycleBrand, MotorcycleVehicle, Product } from '../types';
import { MOTORCYCLES_DATABASE, buildWhatsAppUrl, OFFICIAL_INFO } from '../data/catalog';
import { Bike, Check, ChevronRight, AlertCircle, ShoppingBag, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';

interface MotorcycleSearchFilterProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateToCatalog: () => void;
}

export const MotorcycleSearchFilter: React.FC<MotorcycleSearchFilterProps> = ({
  products,
  onSelectProduct,
  onNavigateToCatalog,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<MotorcycleBrand | ''>('Honda');
  const [selectedModel, setSelectedModel] = useState<string>('Astrea');
  const [selectedGen, setSelectedGen] = useState<string>('');

  const brands: MotorcycleBrand[] = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Lainnya'];

  // Available models for currently selected brand
  const availableBikes = MOTORCYCLES_DATABASE.filter(b => b.brand === selectedBrand);
  const currentBike = availableBikes.find(b => b.model === selectedModel) || availableBikes[0];

  const handleBrandChange = (brand: MotorcycleBrand) => {
    setSelectedBrand(brand);
    const newAvailable = MOTORCYCLES_DATABASE.filter(b => b.brand === brand);
    if (newAvailable.length > 0) {
      setSelectedModel(newAvailable[0].model);
      setSelectedGen('');
    } else {
      setSelectedModel('');
      setSelectedGen('');
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedGen('');
  };

  // Filter products by actual relationship data
  const matchedProducts = products.filter(product => {
    if (!selectedBrand || !selectedModel) return false;

    return product.compatibleBikes.some(cb => {
      const matchBrand = cb.brand === selectedBrand;
      const matchModel = cb.model.toLowerCase() === selectedModel.toLowerCase();
      const matchGen = selectedGen ? (!cb.generation || cb.generation === selectedGen) : true;
      return matchBrand && matchModel && matchGen;
    });
  });

  const resetFilter = () => {
    setSelectedBrand('Honda');
    setSelectedModel('Astrea');
    setSelectedGen('');
  };

  const selectedVehicleLabel = `${selectedBrand} ${selectedModel} ${selectedGen ? `(${selectedGen})` : ''}`.trim();

  return (
    <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 sm:p-8">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#262626]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#8B35C9]/15 border border-[#8B35C9]/30 text-[#8B35C9] text-xs font-semibold uppercase tracking-wider mb-2">
            <Bike className="w-3.5 h-3.5" />
            <span>Sistem Pencocokan Knalpot Motor</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
            CARI KNALPOT SESUAI TIPE MOTOR ANDA
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Pilih merek motor, model, dan tahun/generasi kendaraan Anda untuk menemukan knalpot yang 100% presisi Plug & Play (PNP).
          </p>
        </div>

        <button
          onClick={resetFilter}
          className="self-start md:self-auto text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 py-1 px-2.5 bg-[#1C1C1C] rounded border border-[#2E2E2E]"
        >
          <RotateCcw className="w-3 h-3" /> Reset Pilihan
        </button>
      </div>

      {/* 3 Step Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
        
        {/* STEP 1: PILIH MEREK */}
        <div className="bg-[#191919] p-4 rounded-md border border-[#292929]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              STEP 1 — Merek Motor
            </span>
            <span className="w-5 h-5 rounded-full bg-[#8B35C9] text-white text-[10px] font-bold flex items-center justify-center">
              1
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                className={`py-2 px-3 text-xs font-semibold rounded text-left transition-colors flex items-center justify-between ${
                  selectedBrand === brand
                    ? 'bg-[#8B35C9] text-white'
                    : 'bg-[#222222] text-neutral-300 hover:bg-[#2B2B2B]'
                }`}
              >
                <span>{brand}</span>
                {selectedBrand === brand && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: PILIH MODEL */}
        <div className="bg-[#191919] p-4 rounded-md border border-[#292929]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              STEP 2 — Model Motor ({selectedBrand})
            </span>
            <span className="w-5 h-5 rounded-full bg-[#8B35C9] text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
          </div>

          {availableBikes.length > 0 ? (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {availableBikes.map(bike => (
                <button
                  key={bike.id}
                  onClick={() => handleModelChange(bike.model)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded text-left transition-colors flex items-center justify-between ${
                    selectedModel === bike.model
                      ? 'bg-[#262626] text-white border-l-4 border-[#8B35C9]'
                      : 'bg-[#222222] text-neutral-300 hover:bg-[#2A2A2A]'
                  }`}
                >
                  <span>{bike.model}</span>
                  {selectedModel === bike.model && <Check className="w-3.5 h-3.5 text-[#8B35C9]" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-neutral-500">
              Pilih merek motor terlebih dahulu.
            </div>
          )}
        </div>

        {/* STEP 3: PILIH TAHUN / GENERASI */}
        <div className="bg-[#191919] p-4 rounded-md border border-[#292929]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              STEP 3 — Tahun / Generasi
            </span>
            <span className="w-5 h-5 rounded-full bg-[#8B35C9] text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </div>

          {currentBike && currentBike.generations.length > 0 ? (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedGen('')}
                className={`w-full py-2 px-3 text-xs font-semibold rounded text-left transition-colors flex items-center justify-between ${
                  selectedGen === ''
                    ? 'bg-[#262626] text-white border-l-4 border-[#8B35C9]'
                    : 'bg-[#222222] text-neutral-300 hover:bg-[#2A2A2A]'
                }`}
              >
                <span>Semua Generasi ({currentBike.model})</span>
                {selectedGen === '' && <Check className="w-3.5 h-3.5 text-[#8B35C9]" />}
              </button>

              {currentBike.generations.map((gen, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGen(gen)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded text-left transition-colors flex items-center justify-between ${
                    selectedGen === gen
                      ? 'bg-[#262626] text-white border-l-4 border-[#8B35C9]'
                      : 'bg-[#222222] text-neutral-300 hover:bg-[#2A2A2A]'
                  }`}
                >
                  <span className="truncate">{gen}</span>
                  {selectedGen === gen && <Check className="w-3.5 h-3.5 text-[#8B35C9]" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-neutral-500">
              Pilih model motor untuk melihat daftar generasi.
            </div>
          )}
        </div>

      </div>

      {/* STEP 4: HASIL PENCARIAN PRODUK */}
      <div className="mt-6 pt-6 border-t border-[#262626]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
              4
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200">
              Produk Cocok untuk: <span className="text-[#8B35C9]">{selectedVehicleLabel}</span>
            </h3>
            <span className="text-xs text-neutral-400 bg-[#222222] px-2 py-0.5 rounded">
              {matchedProducts.length} Produk Ditemukan
            </span>
          </div>

          <button
            onClick={onNavigateToCatalog}
            className="text-xs text-[#8B35C9] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Buka Semua Katalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Condition A: Products Found */}
        {matchedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedProducts.map(product => (
              <div
                key={product.id}
                className="bg-[#191919] border border-[#2B2B2B] hover:border-[#3D3D3D] rounded-md overflow-hidden flex flex-col justify-between p-4 group transition-all"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#111111] rounded overflow-hidden mb-3 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#101010]/80 text-[10px] font-bold px-2 py-0.5 rounded text-neutral-300 border border-[#333333]">
                      {product.material}
                    </div>
                    <div className="absolute top-2 right-2 bg-[#8B35C9] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.soundCharacter}
                    </div>
                  </div>

                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="text-sm font-bold text-white hover:text-[#8B35C9] transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {product.name}
                  </h4>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    Cocok untuk: {selectedVehicleLabel} (PNP)
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase">Harga</span>
                    <span className="text-base font-extrabold text-white font-heading">
                      {product.priceType === 'numeric' && product.price
                        ? `Rp${product.price.toLocaleString('id-ID')}`
                        : 'Hubungi Admin'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 bg-[#2B2B2B] hover:bg-[#383838] text-white text-xs font-semibold rounded transition-colors"
                    >
                      Detail
                    </button>
                    <a
                      href={buildWhatsAppUrl(product.name, selectedVehicleLabel)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Beli</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Condition B: No products matched - EXACT REQUIRED FALLBACK MESSAGE */
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-md p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#8B35C9]/20 text-[#8B35C9] flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>

            <h4 className="text-sm sm:text-base font-bold text-neutral-200">
              Produk untuk tipe motor ini belum tersedia. Hubungi admin untuk konsultasi.
            </h4>

            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Bengkel EMJR EXHAUST melayani pembuatan knalpot custom dan penyesuaian leheran khusus untuk tipe motor <strong>{selectedVehicleLabel}</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={buildWhatsAppUrl(undefined, selectedVehicleLabel, 'Tanya ketersediaan atau custom untuk motor ini')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Konsultasi WhatsApp Tipe Ini</span>
              </a>

              <a
                href={OFFICIAL_INFO.shopee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#EE4D2D] hover:bg-[#d63f20] text-white text-xs font-bold rounded flex items-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cari di Toko Shopee</span>
              </a>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
