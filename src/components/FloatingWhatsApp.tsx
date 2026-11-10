import React, { useState } from 'react';
import { OFFICIAL_INFO, buildWhatsAppUrl } from '../data/catalog';
import { Product } from '../types';
import { MessageSquare, X, Send, ShoppingBag, ShieldCheck, ChevronRight } from 'lucide-react';

interface FloatingWhatsAppProps {
  products: Product[];
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || 'Knalpot EMJR Fullset Honda Astrea Galvanis Series');
  const [motorType, setMotorType] = useState('Honda Astrea Grand');
  const [customNote, setCustomNote] = useState('');

  // Official auto-message as specified by user instructions
  const autoMessage = `Halo EMJR EXHAUST, saya tertarik dengan produk ${selectedProduct} untuk motor ${motorType}.${customNote ? ` Catatan: ${customNote}.` : ''} Mohon informasi harga dan ketersediaannya.`;

  const handleSendWA = () => {
    window.open(`${OFFICIAL_INFO.whatsapp.url}?text=${encodeURIComponent(autoMessage)}`, '_blank');
  };

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Quick Consultation Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-lg bg-[#141414] border border-[#2B2B2B] shadow-2xl overflow-hidden animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="bg-[#101010] p-4 border-b border-[#242424] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1">
                  Konsultasi EMJR EXHAUST
                </h4>
                <p className="text-[10px] text-neutral-400">
                  WA: {OFFICIAL_INFO.whatsapp.formatted} • Respon Cepat
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded hover:bg-[#1F1F1F]"
              aria-label="Tutup Panel Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs bg-[#141414]">
            
            {/* Message preview notice */}
            <div className="bg-[#101010] p-2.5 rounded border border-[#262626] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#25D366] block tracking-wider">
                Format Pesan Otomatis:
              </span>
              <p className="text-neutral-300 italic text-[11px] leading-relaxed">
                "{autoMessage}"
              </p>
            </div>

            {/* Product selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-400 block">
                Pilih Produk Knalpot:
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8B35C9]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Motorcycle type */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-400 block">
                Tipe Sepeda Motor Anda:
              </label>
              <input
                type="text"
                value={motorType}
                onChange={(e) => setMotorType(e.target.value)}
                placeholder="Contoh: Honda Astrea Grand / Supra X 125..."
                className="w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8B35C9]"
              />
            </div>

            {/* Note */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-400 block">
                Catatan (Karakter Suara / Bahan):
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Contoh: Suara Sarfull bass adem harian..."
                className="w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8B35C9]"
              />
            </div>

            {/* Action buttons as specified: Konsultasi Produk & Pesan Sekarang */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleSendWA}
                className="py-2.5 px-3 rounded bg-[#1F1F1F] hover:bg-[#2B2B2B] text-emerald-400 border border-[#2B2B2B] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Konsultasi Produk</span>
              </button>

              <button
                onClick={handleSendWA}
                className="py-2.5 px-3 rounded bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Pesan Sekarang</span>
              </button>
            </div>

            {/* Alternative Shopee Direct link */}
            <div className="pt-2 border-t border-[#242424] text-center">
              <a
                href={OFFICIAL_INFO.shopee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-orange-400 hover:underline inline-flex items-center gap-1"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Toko Resmi Shopee: {OFFICIAL_INFO.shopee.storeName}</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold shadow-2xl transition-transform active:scale-95 group"
        aria-label="Konsultasi WhatsApp EMJR EXHAUST"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        <MessageSquare className="w-5 h-5" />
        <div className="flex flex-col text-left pr-1">
          <span className="text-xs leading-none font-bold">Konsultasi WA</span>
          <span className="text-[10px] text-emerald-100 font-normal leading-none mt-0.5">
            {OFFICIAL_INFO.whatsapp.formatted}
          </span>
        </div>
      </button>

    </div>
  );
};
