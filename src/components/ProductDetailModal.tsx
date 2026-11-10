import React, { useState } from 'react';
import { Product, MaterialType, SoundCharacter } from '../types';
import { buildWhatsAppUrl, OFFICIAL_INFO } from '../data/catalog';
import { soundPreviewEngine } from '../utils/audioSimulator';
import { X, ShoppingBag, MessageSquare, Check, ShieldCheck, Wrench, Volume2, ArrowLeft, ExternalLink } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(product.material);
  const [selectedSound, setSelectedSound] = useState<SoundCharacter>(product.soundCharacter);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Gallery images array
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Dynamic price calculation based on chosen material
  // As per instructions: Fullset Galvanis = Rp240.000, Fullset Stainless = Rp340.000, Monel / Custom = Hubungi Admin
  let dynamicPriceLabel = 'Hubungi Admin';
  if (product.category === 'Knalpot Fullset') {
    if (selectedMaterial === 'Galvanis') {
      dynamicPriceLabel = 'Rp240.000';
    } else if (selectedMaterial === 'Stainless Steel') {
      dynamicPriceLabel = 'Rp340.000';
    } else {
      dynamicPriceLabel = 'Hubungi Admin';
    }
  } else if (product.priceType === 'numeric' && product.price) {
    dynamicPriceLabel = `Rp${product.price.toLocaleString('id-ID')}`;
  }

  const primaryMotorSummary = product.compatibleBikes
    .map(b => `${b.brand} ${b.model}`)
    .slice(0, 3)
    .join(', ');

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      soundPreviewEngine.stopTone();
      setIsPlayingAudio(false);
    } else {
      soundPreviewEngine.playTone(selectedSound, () => setIsPlayingAudio(false));
      setIsPlayingAudio(true);
    }
  };

  const whatsappInquiryUrl = buildWhatsAppUrl(
    `${product.name} (Material: ${selectedMaterial}, Suara: ${selectedSound})`,
    primaryMotorSummary
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#141414] border border-[#2B2B2B] rounded-lg shadow-2xl overflow-hidden z-10 my-4 sm:my-8">
        
        {/* Top Header - Sticky so it is always accessible while scrolling */}
        <div className="sticky top-0 z-20 bg-[#101010] px-5 py-3 border-b border-[#242424] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Detail Produk</span>
            <span>/</span>
            <span className="text-neutral-200 font-semibold">{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded bg-[#1C1C1C] hover:bg-[#2A2A2A] transition-colors"
            aria-label="Tutup Detail"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#242424]">
          
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="md:col-span-5 p-6 bg-[#111111] flex flex-col justify-between">
            <div>
              {/* Main Image */}
              <div className="aspect-square rounded bg-[#0A0A0A] border border-[#222222] overflow-hidden mb-3 relative">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#8B35C9] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {selectedMaterial}
                </span>
                <span className="absolute top-2.5 right-2.5 bg-[#171717]/90 border border-[#333333] text-neutral-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  {selectedSound}
                </span>
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 mb-4">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 rounded overflow-hidden border transition-all ${
                        activeImage === img ? 'border-[#8B35C9] ring-1 ring-[#8B35C9]' : 'border-[#262626] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Audio preview button for sound character */}
              <div className="bg-[#171717] border border-[#262626] rounded p-3 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-[#8B35C9]" />
                    Sampel Karakter Suara:
                  </span>
                  <span className="text-[10px] text-[#8B35C9] font-bold uppercase">
                    {selectedSound}
                  </span>
                </div>
                <button
                  onClick={handlePlayAudio}
                  className={`w-full py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isPlayingAudio
                      ? 'bg-[#8B35C9] text-white'
                      : 'bg-[#222222] hover:bg-[#2C2C2C] text-neutral-200 border border-[#333333]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'Hentikan Preview Suara' : `Dengarkan Frekuensi Suara (${selectedSound})`}</span>
                </button>
                <p className="text-[10px] text-neutral-500 mt-1 italic text-center">
                  *Untuk mendengar rekaman video langsung di motor, cek akun TikTok @herfin.n.
                </p>
              </div>
            </div>

            {/* Quality assurance footer */}
            <div className="mt-4 pt-4 border-t border-[#222222] text-[11px] text-neutral-400 space-y-1">
              <p className="flex items-center gap-1.5 text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B35C9] shrink-0" />
                <span>100% Produksi Presisi Asli EMJR EXHAUST</span>
              </p>
              <p className="text-neutral-500">
                Toko Resmi Shopee: <strong className="text-orange-400">{OFFICIAL_INFO.shopee.storeName}</strong>
              </p>
            </div>
          </div>

          {/* Right Column: Information & Order CTAs (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category */}
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B35C9] bg-[#8B35C9]/15 border border-[#8B35C9]/30 px-2 py-0.5 rounded">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="bg-[#191919] border border-[#2B2B2B] rounded p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Harga Resmi</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    {dynamicPriceLabel}
                  </span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-emerald-400 font-semibold block">✓ Ready Produksi</span>
                  <span className="text-neutral-400">Garansi PNP Presisi</span>
                </div>
              </div>

              {/* Material Selector Option */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Pilihan Material:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['Stainless Steel', 'Galvanis', 'Monel'] as MaterialType[]).map(mat => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`py-2 px-3 rounded border text-center font-semibold transition-colors ${
                        selectedMaterial === mat
                          ? 'bg-[#292929] text-white border-[#8B35C9] ring-1 ring-[#8B35C9]'
                          : 'bg-[#181818] border-[#292929] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Character Selector Option */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Pilihan Karakter Suara:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {(['Sarfull', 'Sarteng', 'Sarbor', 'Spiral'] as SoundCharacter[]).map(sound => (
                    <button
                      key={sound}
                      onClick={() => setSelectedSound(sound)}
                      className={`py-2 px-2.5 rounded border text-center font-semibold transition-colors ${
                        selectedSound === sound
                          ? 'bg-[#292929] text-white border-[#8B35C9] ring-1 ring-[#8B35C9]'
                          : 'bg-[#181818] border-[#292929] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {sound}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Deskripsi Produk:
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Compatible Bikes List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Kecocokan Tipe Motor:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.compatibleBikes.map((bike, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#1C1C1C] border border-[#2B2B2B] text-neutral-300 px-2 py-0.5 rounded"
                    >
                      {bike.brand} {bike.model} {bike.generation ? `(${bike.generation})` : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Installation Info */}
              <div className="bg-[#181818] p-3 rounded border border-[#292929] text-xs">
                <span className="font-bold text-white flex items-center gap-1.5 mb-1">
                  <Wrench className="w-3.5 h-3.5 text-[#8B35C9]" />
                  Informasi Pemasangan:
                </span>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  {product.installationInfo}
                </p>
              </div>

              {/* Technical Specs Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Spesifikasi Teknis:
                </h4>
                <div className="border border-[#262626] rounded divide-y divide-[#262626] text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="grid grid-cols-3 p-2 bg-[#121212]">
                      <span className="text-neutral-500 font-medium">{spec.label}</span>
                      <span className="col-span-2 text-neutral-200 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* MANDATORY ACTION BUTTONS AS PER PROMPT */}
            <div className="pt-4 border-t border-[#262626] space-y-2">
              
              {/* WhatsApp Automated Message as specified */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Pesan Sekarang via WhatsApp (0895392822938)</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                {/* Shopee Buy Button */}
                <a
                  href={product.shopeeUrl || OFFICIAL_INFO.shopee.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded bg-[#EE4D2D] hover:bg-[#d63f20] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Beli di Shopee</span>
                </a>

                {/* Consultation button */}
                <a
                  href={buildWhatsAppUrl(undefined, primaryMotorSummary, 'Konsultasi kecocokan leher dan karakter suara')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded bg-[#1F1F1F] hover:bg-[#2B2B2B] text-neutral-200 text-xs font-semibold border border-[#333333] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Konsultasi Kecocokan</span>
                </a>
              </div>

              <p className="text-[11px] text-center text-neutral-500 italic">
                Format pesan otomatis: "Halo EMJR EXHAUST, saya tertarik dengan produk {product.name} untuk motor {primaryMotorSummary}..."
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
