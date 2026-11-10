import React from 'react';
import { OFFICIAL_INFO } from '../data/catalog';
import { ShieldCheck, Flame, Wrench, Award, CheckCircle2, MapPin, Phone, Layers, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase tracking-wider text-[#8B35C9] font-bold block mb-1">
          Profil Perusahaan
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-wide">
          TENTANG EMJR EXHAUST
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
          {OFFICIAL_INFO.brand.description}
        </p>
      </div>

      {/* Workshop Location Banner */}
      <div className="bg-[#141414] border border-[#262626] rounded-lg p-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#8B35C9]/15 border border-[#8B35C9]/30 flex items-center justify-center text-[#8B35C9] shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              SENTRA INDUSTRI KNALPOT PURBALINGGA
            </h3>
            <p className="text-xs text-neutral-400">
              Bengkel & workshop produksi berpusat di Purbalingga, Jawa Tengah — pusat keahlian knalpot motor nasional.
            </p>
          </div>
        </div>

        <div className="text-xs text-neutral-300 border-t md:border-t-0 md:border-l border-[#262626] pt-3 md:pt-0 md:pl-6">
          <p className="font-semibold text-white">Hotline WhatsApp Resmi:</p>
          <p className="text-[#8B35C9] font-bold text-sm">{OFFICIAL_INFO.whatsapp.formatted}</p>
        </div>
      </div>

      {/* 5 Focus Pillars of EMJR EXHAUST as requested */}
      <div className="mb-14">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Standar Mutu
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            5 FOKUS UTAMA PRODUKSI EMJR EXHAUST
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {OFFICIAL_INFO.brand.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-[#262626] rounded-md p-4 flex flex-col justify-between"
            >
              <div>
                <span className="w-7 h-7 rounded bg-[#222222] text-[#8B35C9] font-extrabold text-xs flex items-center justify-center mb-3">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5">
                  {pillar.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials & Production details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#262626] rounded-md p-6 space-y-2">
          <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8B35C9]" />
            MATERIAL STAINLESS STEEL
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Plat dan pipa stainless steel 201/304 pilihan dengan daya tahan korosi tinggi, finishing mirror polish mengkilap, dan las cacing argon yang kokoh.
          </p>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-md p-6 space-y-2">
          <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8B35C9]" />
            MATERIAL GALVANIS TEBAL
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Pipa galvanis tebal 1.2mm tahan benturan dan panas dengan lapisan cat oven hi-temp hitam doff. Pilihan knalpot harian ekonomis dan awet.
          </p>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-md p-6 space-y-2">
          <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8B35C9]" />
            MATERIAL MONEL & CUSTOM
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Bahan monel padat berkekuatan tinggi untuk knalpot custom pesanan khusus, spek bore up balap, maupun turing jarak jauh.
          </p>
        </div>
      </div>

    </div>
  );
};
