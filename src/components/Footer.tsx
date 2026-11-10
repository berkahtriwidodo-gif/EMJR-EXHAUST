import React from 'react';
import { OFFICIAL_INFO } from '../data/catalog';
import { Logo } from './Logo';
import { MapPin, Phone, ExternalLink, ShieldCheck, ShoppingBag, MessageSquare, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#222222] text-neutral-400 text-xs pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#222222]">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div onClick={() => handleNav('home')} className="cursor-pointer inline-block">
              <Logo size="md" />
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {OFFICIAL_INFO.brand.description}
            </p>

            <div className="space-y-1.5 text-xs text-neutral-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B35C9] shrink-0 mt-0.5" />
                <span>{OFFICIAL_INFO.brand.workshop}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline WhatsApp Resmi: <strong className="text-white">{OFFICIAL_INFO.whatsapp.formatted}</strong></span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap gap-2 pt-2 text-[11px]">
              <span className="px-2 py-1 rounded bg-[#171717] border border-[#2B2B2B] text-neutral-300">
                ✓ 100% Plug & Play (PNP)
              </span>
              <span className="px-2 py-1 rounded bg-[#171717] border border-[#2B2B2B] text-neutral-300">
                ✓ Stainless Steel & Galvanis
              </span>
              <span className="px-2 py-1 rounded bg-[#171717] border border-[#2B2B2B] text-neutral-300">
                ✓ Las Argon Cacing Rapi
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pilih-motor')}
                  className="hover:text-white transition-colors"
                >
                  Pilih Motor (Filter)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('katalog')}
                  className="hover:text-white transition-colors"
                >
                  Katalog Knalpot
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('suara')}
                  className="hover:text-white transition-colors"
                >
                  Karakter Suara
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tentang')}
                  className="hover:text-white transition-colors"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('kontak')}
                  className="hover:text-white transition-colors"
                >
                  Kontak Resmi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-[#8B35C9] transition-colors"
                >
                  Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Channel Resmi Integrasi (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Saluran Terintegrasi
            </h4>
            
            <div className="space-y-2">
              <a
                href={OFFICIAL_INFO.shopee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded bg-[#141414] border border-[#242424] hover:border-orange-500/50 flex items-center justify-between transition-colors group"
              >
                <div>
                  <span className="font-bold text-white text-xs block">Shopee Toko Resmi</span>
                  <span className="text-[11px] text-orange-400">{OFFICIAL_INFO.shopee.storeName}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href={OFFICIAL_INFO.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded bg-[#141414] border border-[#242424] hover:border-emerald-500/50 flex items-center justify-between transition-colors group"
              >
                <div>
                  <span className="font-bold text-white text-xs block">WhatsApp Hotline</span>
                  <span className="text-[11px] text-emerald-400">{OFFICIAL_INFO.whatsapp.formatted}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href={OFFICIAL_INFO.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded bg-[#141414] border border-[#242424] hover:border-[#8B35C9] flex items-center justify-between transition-colors group"
              >
                <div>
                  <span className="font-bold text-white text-xs block">TikTok Video & Suara</span>
                  <span className="text-[11px] text-neutral-300">{OFFICIAL_INFO.tiktok.handle}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Col 4: Standar Harga Resmi (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Standar Harga Resmi
            </h4>
            <div className="space-y-2 text-[11px] text-neutral-300">
              <div className="bg-[#141414] p-2 rounded border border-[#242424]">
                <span className="text-neutral-500 block">Fullset Galvanis</span>
                <strong className="text-white">Rp240.000</strong>
              </div>
              <div className="bg-[#141414] p-2 rounded border border-[#242424]">
                <span className="text-neutral-500 block">Fullset Stainless</span>
                <strong className="text-white">Rp340.000</strong>
              </div>
              <div className="bg-[#141414] p-2 rounded border border-[#242424]">
                <span className="text-neutral-500 block">Monel / Custom</span>
                <strong className="text-[#8B35C9]">Hubungi Admin</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} <strong className="text-neutral-300">EMJR EXHAUST</strong>. Manufaktur & Toko Knalpot Sepeda Motor Purbalingga. Hak cipta dilindungi undang-undang.
          </p>
          <p>
            Toko Shopee: <span className="text-orange-400 font-semibold">{OFFICIAL_INFO.shopee.storeName}</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
