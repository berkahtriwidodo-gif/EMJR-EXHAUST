import React from 'react';
import { OFFICIAL_INFO } from '../data/catalog';
import { ShoppingBag, MessageSquare, ArrowUpRight, CheckCircle2, Film } from 'lucide-react';

export const SocialMediaSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#101010] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading as requested: "FIND US ON SOCIAL MEDIA" */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B35C9]">
            Koneksi Digital Resmi
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-wide">
            FIND US ON SOCIAL MEDIA
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Terhubung langsung dengan toko resmi kami di Shopee, tonton video suara & proses produksi di TikTok, serta pesan langsung melalui hotline WhatsApp kami.
          </p>
        </div>

        {/* The 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: SHOPEE */}
          <a
            href={OFFICIAL_INFO.shopee.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-md bg-[#141414] border border-[#262626] hover:border-orange-500/80 p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded bg-orange-600/15 border border-orange-500/30 flex items-center justify-center text-orange-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded bg-[#1F1F1F] group-hover:bg-orange-600 text-neutral-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400">
                  Marketplace Resmi
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  SHOPEE
                </h3>
                <p className="text-xs font-semibold text-orange-300">
                  Shop Your Favorite Exhaust.
                </p>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Belanja aman melalui rekening bersama Shopee. Mendukung voucher diskon, gratis ongkir XTRA, dan opsi pembayaran COD.
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#222222] text-xs text-neutral-300">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Nama Toko:</span>
                  <span className="font-bold text-white">{OFFICIAL_INFO.shopee.storeName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Garansi:</span>
                  <span className="text-emerald-400 font-medium">Garansi Shopee & COD</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#262626]">
              <span className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded font-bold text-white bg-[#EE4D2D] hover:bg-[#d63f20] text-xs transition-colors">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buka Toko Shopee</span>
              </span>
            </div>
          </a>

          {/* CARD 2: TIKTOK */}
          <a
            href={OFFICIAL_INFO.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-md bg-[#141414] border border-[#262626] hover:border-[#8B35C9] p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded bg-[#8B35C9]/15 border border-[#8B35C9]/30 flex items-center justify-center text-[#8B35C9]">
                  <Film className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded bg-[#1F1F1F] group-hover:bg-[#8B35C9] text-neutral-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <span className="text-[10px] font-bold tracking-wider uppercase text-purple-400">
                  Video & Review Resmi
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  TIKTOK
                </h3>
                <p className="text-xs font-semibold text-purple-200">
                  Watch, Listen & Discover.
                </p>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Saksikan konten video langsung: tes desibel suara, detail kerapian las argon robotic cacing, proses produksi di workshop, dan review motor.
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#222222] text-xs text-neutral-300">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Akun Resmi:</span>
                  <span className="font-bold text-white">{OFFICIAL_INFO.tiktok.handle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Konten:</span>
                  <span className="text-[#8B35C9] font-medium">Sound Test & Produksi</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#262626]">
              <span className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded font-bold text-white bg-[#1F1F1F] group-hover:bg-[#8B35C9] border border-[#333333] text-xs transition-colors">
                <Film className="w-3.5 h-3.5" />
                <span>Follow TikTok {OFFICIAL_INFO.tiktok.handle}</span>
              </span>
            </div>
          </a>

          {/* CARD 3: WHATSAPP */}
          <a
            href={OFFICIAL_INFO.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-md bg-[#141414] border border-[#262626] hover:border-emerald-500/80 p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded bg-[#1F1F1F] group-hover:bg-emerald-600 text-neutral-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
                  Konsultasi & Hotline
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  WHATSAPP
                </h3>
                <p className="text-xs font-semibold text-emerald-300">
                  Chat & Order Now.
                </p>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Konsultasikan kebutuhan knalpot motor Anda secara gratis. Tanya ketersediaan stok, request custom inlet 38/50mm, request saringan suara, atau order langsung.
              </p>

              <div className="space-y-1.5 pt-3 border-t border-[#222222] text-xs text-neutral-300">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Nomor Resmi:</span>
                  <span className="font-bold text-white">{OFFICIAL_INFO.whatsapp.formatted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Layanan:</span>
                  <span className="text-emerald-400 font-medium">Setiap Hari (08.00 - 22.00)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#262626]">
              <span className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded font-bold text-white bg-[#25D366] hover:bg-[#20ba59] text-xs transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat via WhatsApp Resmi</span>
              </span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};
