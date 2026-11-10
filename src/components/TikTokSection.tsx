import React, { useState } from 'react';
import { TIKTOK_SHOWCASE_VIDEOS, OFFICIAL_INFO, buildWhatsAppUrl } from '../data/catalog';
import { Play, ExternalLink, Upload, Film, X, MessageSquare, ShoppingBag } from 'lucide-react';

export const TikTokSection: React.FC = () => {
  const [activeModalVideo, setActiveModalVideo] = useState<typeof TIKTOK_SHOWCASE_VIDEOS[0] | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [customMp4Url, setCustomMp4Url] = useState<string | null>(null);
  const [customTikTokUrl, setCustomTikTokUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomMp4Url(url);
    }
  };

  return (
    <section className="py-16 bg-[#141414] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header as requested */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#262626]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#8B35C9]/15 border border-[#8B35C9]/30 text-[#8B35C9] text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Dokumentasi Visual Resmi</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-wide">
              EMJR EXHAUST ON THE ROAD
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Dokumentasi uji suara knalpot di motor, detail sambungan las argon cacing, pemasangan knalpot pada berbagai jenis motor, dan aktivitas bengkel produksi di workshop Purbalingga.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Follow TikTok Button as requested */}
            <a
              href={OFFICIAL_INFO.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded bg-[#101010] hover:bg-[#1E1E1E] text-white text-xs font-bold border border-[#333333] flex items-center gap-2 transition-colors"
            >
              <span>Follow TikTok {OFFICIAL_INFO.tiktok.handle}</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <button
              onClick={() => setShowUploader(!showUploader)}
              className="py-2 px-3 rounded bg-[#1C1C1C] hover:bg-[#282828] text-neutral-300 text-xs font-semibold border border-[#2E2E2E] flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#8B35C9]" />
              <span>Input Video / MP4</span>
            </button>
          </div>
        </div>

        {/* Custom Uploader & TikTok URL Tester Panel */}
        {showUploader && (
          <div className="mb-8 p-5 bg-[#171717] border border-[#2E2E2E] rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#8B35C9]" />
                Tempat Upload Video MP4 & Tautan TikTok (@herfin.n)
              </span>
              <button onClick={() => setShowUploader(false)} className="text-neutral-400 hover:text-white text-xs">
                Tutup
              </button>
            </div>

            <p className="text-xs text-neutral-400">
              Sesuai instruksi: Apabila video TikTok tidak dapat diakses secara otomatis oleh browser, Anda dapat mengunggah file MP4 lokal atau memasukkan tautan video TikTok langsung untuk pengujian:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-[#111111] border border-dashed border-[#333333] rounded space-y-2">
                <span className="text-xs font-semibold text-neutral-300 block">Pilih File Video MP4 dari Perangkat:</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleFileUpload}
                  className="text-xs text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:bg-[#222222] file:text-white cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#111111] border border-[#333333] rounded space-y-2">
                <span className="text-xs font-semibold text-neutral-300 block">Tempel Tautan Video TikTok (@herfin.n):</span>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customTikTokUrl}
                    onChange={(e) => setCustomTikTokUrl(e.target.value)}
                    placeholder="https://www.tiktok.com/@herfin.n/video/..."
                    className="flex-1 bg-[#1A1A1A] border border-[#333333] rounded px-3 py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#8B35C9]"
                  />
                  <a
                    href={customTikTokUrl || OFFICIAL_INFO.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 bg-[#8B35C9] hover:bg-[#7828b0] text-white text-xs font-bold rounded flex items-center gap-1"
                  >
                    Buka
                  </a>
                </div>
              </div>
            </div>

            {customMp4Url && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-emerald-400 block mb-2">
                  Pemutar Video MP4 yang Diunggah:
                </span>
                <video src={customMp4Url} controls className="w-full max-h-80 rounded bg-black" />
              </div>
            )}
          </div>
        )}

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIKTOK_SHOWCASE_VIDEOS.map(video => (
            <div
              key={video.id}
              onClick={() => setActiveModalVideo(video)}
              className="bg-[#191919] border border-[#262626] hover:border-[#383838] rounded-md overflow-hidden flex flex-col justify-between p-3.5 group cursor-pointer transition-all"
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-[16/10] bg-[#101010] rounded overflow-hidden mb-3 relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-black/70 border border-white/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-[#101010]/90 text-[10px] font-bold px-2 py-0.5 rounded text-neutral-300">
                    {video.sound}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
                  <span>{video.motor}</span>
                  <span>{video.views} Views</span>
                </div>

                <h4 className="text-xs font-bold text-white group-hover:text-[#8B35C9] transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h4>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#262626] flex items-center justify-between text-[11px]">
                <span className="text-[#8B35C9] font-semibold flex items-center gap-1">
                  <Play className="w-3 h-3 fill-[#8B35C9]" /> Tonton
                </span>
                <span className="text-neutral-500">TikTok @herfin.n</span>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeModalVideo && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="fixed inset-0" onClick={() => setActiveModalVideo(null)} />

            <div className="relative w-full max-w-xl bg-[#141414] border border-[#2B2B2B] rounded-lg shadow-2xl overflow-hidden z-10 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
                <div>
                  <span className="text-[10px] text-[#8B35C9] uppercase font-bold block">Dokumentasi TikTok @herfin.n</span>
                  <h3 className="text-base font-bold text-white font-heading">{activeModalVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video bg-black rounded overflow-hidden relative flex items-center justify-center">
                <img
                  src={activeModalVideo.thumbnail}
                  alt={activeModalVideo.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <a
                    href={activeModalVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-[#8B35C9] hover:bg-[#7828b0] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    title="Buka Video di TikTok Resmi"
                  >
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </a>
                  <p className="text-xs text-white bg-black/80 px-3 py-1 rounded">
                    Klik untuk membuka dan menonton video resmi di TikTok @herfin.n
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <a
                  href={activeModalVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-[#1C1C1C] hover:bg-[#282828] text-white font-semibold rounded border border-[#333333] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka di Aplikasi TikTok</span>
                </a>

                <a
                  href={buildWhatsAppUrl(activeModalVideo.title, activeModalVideo.motor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tanya Knalpot Ini di WA</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
