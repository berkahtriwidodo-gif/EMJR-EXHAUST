import React, { useState } from 'react';
import { Logo } from './Logo';
import { OFFICIAL_INFO } from '../data/catalog';
import { Search, ShoppingBag, MessageSquare, Menu, X, Shield, Settings, Volume2, Bike, Wrench } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setActiveTab('katalog');
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#141414] border-b border-[#262626] text-[#F6F5F2]">
      {/* Top Utility Bar */}
      <div className="bg-[#101010] border-b border-[#222222] text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B35C9]" />
              Manufaktur & Toko Resmi Knalpot Sepeda Motor
            </span>
            <span>|</span>
            <span>Workshop: Purbalingga, Jawa Tengah</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Hotline WA: <strong className="text-white">{OFFICIAL_INFO.whatsapp.formatted}</strong></span>
            <span>Shopee: <strong className="text-orange-400">{OFFICIAL_INFO.shopee.storeName}</strong></span>
            <button
              onClick={() => handleNav('admin')}
              className="text-neutral-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              <Settings className="w-3 h-3" /> Admin Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div onClick={() => handleNav('home')} className="cursor-pointer shrink-0">
            <Logo size="md" />
          </div>

          {/* Search Bar - Automotive Style */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Cari knalpot berdasarkan tipe motor atau nama produk..."
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#8B35C9] focus:outline-none rounded-md pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded transition-colors ${
                activeTab === 'home' ? 'text-white bg-[#222222] border-b-2 border-[#8B35C9]' : 'hover:text-white hover:bg-[#1E1E1E]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('pilih-motor')}
              className={`px-3 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'pilih-motor' ? 'text-white bg-[#222222] border-b-2 border-[#8B35C9]' : 'hover:text-white hover:bg-[#1E1E1E]'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-[#8B35C9]" />
              Pilih Motor
            </button>
            <button
              onClick={() => handleNav('katalog')}
              className={`px-3 py-2 rounded transition-colors ${
                activeTab === 'katalog' ? 'text-white bg-[#222222] border-b-2 border-[#8B35C9]' : 'hover:text-white hover:bg-[#1E1E1E]'
              }`}
            >
              Katalog Knalpot
            </button>
            <button
              onClick={() => handleNav('suara')}
              className={`px-3 py-2 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'suara' ? 'text-white bg-[#222222] border-b-2 border-[#8B35C9]' : 'hover:text-white hover:bg-[#1E1E1E]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-[#8B35C9]" />
              Karakter Suara
            </button>
            <button
              onClick={() => handleNav('tentang')}
              className={`px-3 py-2 rounded transition-colors ${
                activeTab === 'tentang' ? 'text-white bg-[#222222] border-b-2 border-[#8B35C9]' : 'hover:text-white hover:bg-[#1E1E1E]'
              }`}
            >
              Tentang Kami
            </button>
            <button
              onClick={() => handleNav('kontak')}
              className={`px-3 py-2 rounded transition-colors ${
                activeTab === 'kontak' ? 'text-white bg-[#222222] border-b-2 border-[#8B35C9]' : 'hover:text-white hover:bg-[#1E1E1E]'
              }`}
            >
              Kontak
            </button>
          </nav>

          {/* Action Buttons: Shopee & WhatsApp */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Shopee Button */}
            <a
              href={OFFICIAL_INFO.shopee.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#EE4D2D] hover:bg-[#d63f20] text-white text-xs font-bold transition-all shadow-sm"
              title="Kunjungi Toko Shopee Resmi"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shopee</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={OFFICIAL_INFO.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm"
              title="Hotline WhatsApp Resmi"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-[#1F1F1F] rounded-md border border-[#2E2E2E]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Cari knalpot atau motor..."
              className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#8B35C9] focus:outline-none rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-100"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#262626] bg-[#141414] px-4 py-4 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-semibold ${
              activeTab === 'home' ? 'bg-[#222222] text-white' : 'text-neutral-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('pilih-motor')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'pilih-motor' ? 'bg-[#222222] text-white' : 'text-neutral-300'
            }`}
          >
            <Bike className="w-4 h-4 text-[#8B35C9]" />
            Pilih Motor (Filter Step-by-Step)
          </button>
          <button
            onClick={() => handleNav('katalog')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-semibold ${
              activeTab === 'katalog' ? 'bg-[#222222] text-white' : 'text-neutral-300'
            }`}
          >
            Katalog Knalpot
          </button>
          <button
            onClick={() => handleNav('suara')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'suara' ? 'bg-[#222222] text-white' : 'text-neutral-300'
            }`}
          >
            <Volume2 className="w-4 h-4 text-[#8B35C9]" />
            Karakter Suara (Sarfull, Sarteng, Sarbor, Spiral)
          </button>
          <button
            onClick={() => handleNav('tentang')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-semibold ${
              activeTab === 'tentang' ? 'bg-[#222222] text-white' : 'text-neutral-300'
            }`}
          >
            Tentang Kami
          </button>
          <button
            onClick={() => handleNav('kontak')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-semibold ${
              activeTab === 'kontak' ? 'bg-[#222222] text-white' : 'text-neutral-300'
            }`}
          >
            Kontak
          </button>
          <button
            onClick={() => handleNav('admin')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-semibold flex items-center gap-2 text-purple-300 bg-[#8B35C9]/15 border border-[#8B35C9]/30`}
          >
            <Settings className="w-4 h-4" />
            Admin Dashboard
          </button>

          <div className="pt-3 border-t border-[#262626] grid grid-cols-2 gap-2">
            <a
              href={OFFICIAL_INFO.shopee.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded bg-[#EE4D2D] text-white text-xs font-bold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shopee</span>
            </a>
            <a
              href={OFFICIAL_INFO.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded bg-[#25D366] text-white text-xs font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
