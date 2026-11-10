import React, { useState } from 'react';
import { OFFICIAL_INFO, buildWhatsAppUrl, MOTORCYCLES_DATABASE } from '../data/catalog';
import { Phone, MessageSquare, ShoppingBag, ExternalLink, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [motorType, setMotorType] = useState('Honda Astrea Grand');
  const [inquiryType, setInquiryType] = useState('Knalpot Fullset');
  const [notes, setNotes] = useState('');

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo EMJR EXHAUST, saya ingin konsultasi ${inquiryType} untuk motor ${motorType}.${notes ? ` Catatan: ${notes}` : ''} Mohon informasi harga dan ketersediaannya.`;
    window.open(`${OFFICIAL_INFO.whatsapp.url}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs uppercase tracking-wider text-[#8B35C9] font-bold block mb-1">
          Layanan & Pusat Kontak
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-wide">
          HUBUNGI EMJR EXHAUST
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
          Konsultasikan tipe motor, pilihan material, dan karakter suara knalpot yang sesuai dengan motormu melalui saluran resmi kami di bawah ini:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Official Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* WhatsApp Card */}
          <div className="bg-[#141414] border border-[#262626] rounded-md p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Hotline Konsultasi Cepat</span>
                <h3 className="text-base font-bold text-white">WhatsApp Resmi</h3>
              </div>
            </div>

            <p className="text-xs text-neutral-400">
              Respon cepat untuk tanya ketersediaan stok, request ukuran inlet header, konsultasi karakter saringan, atau pemesanan langsung.
            </p>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-bold text-white text-sm">{OFFICIAL_INFO.whatsapp.formatted}</span>
              <a
                href={OFFICIAL_INFO.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded flex items-center gap-1.5 transition-colors"
              >
                <span>Chat WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Shopee Card */}
          <div className="bg-[#141414] border border-[#262626] rounded-md p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#EE4D2D]/15 text-[#EE4D2D] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Marketplace Resmi</span>
                <h3 className="text-base font-bold text-white">Shopee: {OFFICIAL_INFO.shopee.storeName}</h3>
              </div>
            </div>

            <p className="text-xs text-neutral-400">
              Belanja aman melalui sistem rekening bersama Shopee. Mendukung pembayaran COD dan voucher gratis ongkir XTRA.
            </p>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-orange-400 font-bold text-xs">{OFFICIAL_INFO.shopee.storeName}</span>
              <a
                href={OFFICIAL_INFO.shopee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 bg-[#EE4D2D] hover:bg-[#d63f20] text-white font-bold rounded flex items-center gap-1.5 transition-colors"
              >
                <span>Buka Toko Shopee</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* TikTok Card */}
          <div className="bg-[#141414] border border-[#262626] rounded-md p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#101010] border border-[#333333] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                TT
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Video & Dokumentasi</span>
                <h3 className="text-base font-bold text-white">TikTok: {OFFICIAL_INFO.tiktok.handle}</h3>
              </div>
            </div>

            <p className="text-xs text-neutral-400">
              Tonton video sound test, cek kerapian hasil las cacing, dan video proses produksi bengkel EMJR EXHAUST.
            </p>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-neutral-300 font-semibold">{OFFICIAL_INFO.tiktok.handle}</span>
              <a
                href={OFFICIAL_INFO.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 bg-[#1C1C1C] hover:bg-[#282828] text-white font-bold rounded border border-[#333333] flex items-center gap-1.5 transition-colors"
              >
                <span>Follow TikTok</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Workshop Address */}
          <div className="bg-[#101010] border border-[#222222] rounded p-4 text-xs text-neutral-400 space-y-1">
            <div className="flex items-center gap-2 text-neutral-300 font-semibold">
              <MapPin className="w-4 h-4 text-[#8B35C9]" />
              <span>Lokasi Bengkel Produksi:</span>
            </div>
            <p className="pl-6">
              Purbalingga, Jawa Tengah, Indonesia (Sentra Pengrajin Knalpot Sepeda Motor).
            </p>
          </div>

        </div>

        {/* Right Column: Instant Form Generator to WhatsApp (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSendWA}
            className="bg-[#141414] border border-[#262626] rounded-md p-6 sm:p-8 space-y-4"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B35C9]">
                Formulir Cepat
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
                KONSULTASI KEBUTUHAN KNALPOT MOTOR
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Isi form berikut, dan sistem akan langsung memformat pesan WhatsApp resmi ke admin bengkel EMJR:
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Pilih / Ketik Tipe Sepeda Motor Anda:
                </label>
                <input
                  type="text"
                  value={motorType}
                  onChange={(e) => setMotorType(e.target.value)}
                  placeholder="Contoh: Honda Astrea Grand / Supra X 125 / Karisma..."
                  required
                  className="w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded p-2.5 text-neutral-200 focus:outline-none focus:border-[#8B35C9]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Kebutuhan Produk:
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded p-2.5 text-neutral-200 focus:outline-none focus:border-[#8B35C9]"
                >
                  <option value="Knalpot Fullset Galvanis (Rp240.000)">Knalpot Fullset Galvanis (Rp240.000)</option>
                  <option value="Knalpot Fullset Stainless (Rp340.000)">Knalpot Fullset Stainless (Rp340.000)</option>
                  <option value="Silincer Knalpot Saja">Silincer Knalpot Saja</option>
                  <option value="Leheran Bending Stainless">Leheran Bending Stainless</option>
                  <option value="Knalpot Custom Monel">Knalpot Custom Monel</option>
                  <option value="Konsultasi Karakter Suara">Konsultasi Karakter Suara (Sarfull/Sarteng/Sarbor/Spiral)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Catatan Tambahan (Opsional):
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Apakah bisa request ukuran inlet 38mm atau spek mesin sudah bore up 130cc?"
                  className="w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded p-2.5 text-neutral-200 focus:outline-none focus:border-[#8B35C9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Konsultasi ke WhatsApp Resmi EMJR EXHAUST</span>
            </button>

            <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
              <p>✓ Jam Layanan Admin: Setiap Hari (08.00 - 22.00 WIB)</p>
              <p>✓ Fast response untuk konsultasi ukuran leheran dan karakter suara</p>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
