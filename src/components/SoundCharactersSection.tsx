import React, { useState } from 'react';
import { SOUND_CHARACTERS, buildWhatsAppUrl } from '../data/catalog';
import { SoundCharacter } from '../types';
import { soundPreviewEngine } from '../utils/audioSimulator';
import { Volume2, VolumeX, Play, Square, Upload, MessageSquare, Check, Sparkles, AlertCircle } from 'lucide-react';

export const SoundCharactersSection: React.FC = () => {
  const [activePlaying, setActivePlaying] = useState<SoundCharacter | null>(null);
  const [customAudioFiles, setCustomAudioFiles] = useState<{ [key in SoundCharacter]?: string }>({});
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  const handlePlayToggle = (character: SoundCharacter) => {
    // If user uploaded a custom audio recording for this character, play that HTML Audio
    if (customAudioFiles[character]) {
      const audio = new Audio(customAudioFiles[character]);
      audio.play();
      setActivePlaying(character);
      audio.onended = () => setActivePlaying(null);
      return;
    }

    // Otherwise play the frequency tone simulator
    if (activePlaying === character) {
      soundPreviewEngine.stopTone();
      setActivePlaying(null);
    } else {
      soundPreviewEngine.playTone(character, () => setActivePlaying(null));
      setActivePlaying(character);
    }
  };

  const handleUploadAudio = (character: SoundCharacter, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioFiles(prev => ({ ...prev, [character]: url }));
    }
  };

  return (
    <section id="karakter-suara" className="py-16 bg-[#101010] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#262626]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#8B35C9]/15 border border-[#8B35C9]/30 text-[#8B35C9] text-xs font-semibold uppercase tracking-wider mb-2">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Panduan Karakter Suara Knalpot EMJR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-wide">
              PILIHAN KARAKTER SUARA KNALPOT
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Setiap saringan dalam knalpot EMJR EXHAUST dirancang dengan diameter lubang, kepadatan glasswool, dan kompartemen pipa yang berbeda untuk menghasilkan performa serta karakter suara yang Anda inginkan.
            </p>
          </div>

          <button
            onClick={() => setShowUploadPanel(!showUploadPanel)}
            className="self-start md:self-auto text-xs text-neutral-300 hover:text-white py-1.5 px-3 bg-[#1C1C1C] hover:bg-[#282828] rounded border border-[#2E2E2E] flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-[#8B35C9]" />
            <span>{showUploadPanel ? 'Tutup Panel Upload Audio' : 'Upload Rekaman Audio Asli'}</span>
          </button>
        </div>

        {/* Upload Audio Panel if activated */}
        {showUploadPanel && (
          <div className="mb-8 p-5 bg-[#171717] border border-[#8B35C9]/40 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-[#8B35C9]" />
              <span>UNGGAH FILE REKAMAN AUDIO ASLI WORKSHOP EMJR</span>
            </div>
            <p className="text-xs text-neutral-300">
              Sesuai instruksi, Anda dapat memasukkan file rekaman audio asli (MP3 / WAV / OGG) untuk masing-masing varian karakter suara di bawah ini:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {SOUND_CHARACTERS.map(c => (
                <div key={c.id} className="p-3 bg-[#121212] border border-[#2A2A2A] rounded">
                  <span className="text-xs font-bold text-white block mb-1">{c.name}</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleUploadAudio(c.id, e)}
                    className="text-[11px] text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-[#262626] file:text-white"
                  />
                  {customAudioFiles[c.id] && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
                      ✓ File Rekaman Asli Terpasang
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The 4 Sound Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOUND_CHARACTERS.map((char) => {
            const isPlaying = activePlaying === char.id;
            const hasCustomFile = Boolean(customAudioFiles[char.id]);

            return (
              <div
                key={char.id}
                className="bg-[#141414] border border-[#262626] hover:border-[#383838] rounded-md p-5 flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Photo representation */}
                  <div className="aspect-[16/11] bg-[#101010] rounded overflow-hidden mb-4 relative">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#8B35C9] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {char.id}
                    </div>
                  </div>

                  {/* Character Name & Short Desc */}
                  <h3 className="text-xl font-bold text-white font-heading">
                    {char.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8B35C9] mt-0.5 mb-2">
                    {char.shortDesc}
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {char.description}
                  </p>
                </div>

                {/* Audio Button and Consultation Action */}
                <div className="mt-5 pt-4 border-t border-[#262626] space-y-2">
                  <button
                    onClick={() => handlePlayToggle(char.id)}
                    className={`w-full py-2.5 px-3 rounded text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isPlaying
                        ? 'bg-[#8B35C9] text-white'
                        : 'bg-[#222222] hover:bg-[#2B2B2B] text-white border border-[#333333]'
                    }`}
                  >
                    {isPlaying ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlaying ? 'Hentikan Audio' : `Putar Sampel Suara (${char.id})`}</span>
                  </button>

                  {hasCustomFile && (
                    <span className="text-[10px] text-center text-emerald-400 block font-medium">
                      ✓ Memutar rekaman audio asli yang diunggah
                    </span>
                  )}

                  <a
                    href={buildWhatsAppUrl(undefined, undefined, `Saya ingin tanya knalpot dengan karakter suara ${char.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded bg-[#181818] hover:bg-[#202020] text-neutral-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#2B2B2B] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Konsultasi Suara {char.id}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
