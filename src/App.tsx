import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MotorcycleSearchFilter } from './components/MotorcycleSearchFilter';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SoundCharactersSection } from './components/SoundCharactersSection';
import { TikTokSection } from './components/TikTokSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Product } from './types';
import { getStoredProducts } from './utils/storage';
import { OFFICIAL_INFO, buildWhatsAppUrl } from './data/catalog';
import { Bike, Search, Volume2, ShoppingBag, MessageSquare, Home, Sparkles } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Load products from localStorage or default catalog on mount
  useEffect(() => {
    const loaded = getStoredProducts();
    setProducts(loaded);
  }, []);

  const handleProductsUpdated = (updated: Product[]) => {
    setProducts(updated);
  };

  const handleSelectMotorCard = (model: string) => {
    // When clicking a motor card in the hero (e.g. Astrea, Supra X, Karisma, Revo)
    setActiveTab('pilih-motor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#101010] text-[#F6F5F2] flex flex-col font-sans selection:bg-[#8B35C9] selection:text-white pb-16 sm:pb-0">
      
      {/* 1. Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={() => setActiveTab('katalog')}
      />

      {/* 2. Main Tab Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onCariKnalpot={() => setActiveTab('pilih-motor')}
              onLihatKatalog={() => setActiveTab('katalog')}
              onSelectMotorCard={handleSelectMotorCard}
            />

            {/* Quick 4-Step Motorcycle Matcher right below Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <MotorcycleSearchFilter
                products={products}
                onSelectProduct={(p) => setSelectedProductDetail(p)}
                onNavigateToCatalog={() => setActiveTab('katalog')}
              />
            </div>

            {/* Featured Exhaust Collection */}
            <section className="py-12 bg-[#121212] border-y border-[#262626]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#262626]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B35C9]">
                      Katalog Populer
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
                      KNALPOT MOTOR BEST SELLER EMJR
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('katalog')}
                    className="text-xs text-[#8B35C9] hover:underline font-semibold"
                  >
                    Lihat Semua ({products.length}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#171717] border border-[#2B2B2B] hover:border-[#8B35C9] rounded-md overflow-hidden flex flex-col justify-between p-4 group transition-all"
                    >
                      <div>
                        <div
                          onClick={() => setSelectedProductDetail(product)}
                          className="aspect-[16/10] bg-[#0E0E0E] rounded overflow-hidden mb-3 relative cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 bg-[#101010]/90 text-[10px] font-bold px-2 py-0.5 rounded text-neutral-300 border border-[#2B2B2B]">
                            {product.material}
                          </div>
                          <div className="absolute top-2 right-2 bg-[#8B35C9] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {product.soundCharacter}
                          </div>
                        </div>

                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block mb-1">
                          {product.category}
                        </span>

                        <h3
                          onClick={() => setSelectedProductDetail(product)}
                          className="text-base font-bold text-white font-heading hover:text-[#8B35C9] transition-colors cursor-pointer line-clamp-2 leading-tight"
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-neutral-500 block uppercase">Harga Resmi</span>
                          <span className="text-lg font-extrabold text-white font-heading">
                            {product.priceType === 'numeric' && product.price
                              ? `Rp${product.price.toLocaleString('id-ID')}`
                              : 'Hubungi Admin'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedProductDetail(product)}
                            className="px-3 py-1.5 bg-[#242424] hover:bg-[#303030] text-neutral-200 text-xs font-semibold rounded border border-[#333333] transition-colors"
                          >
                            Detail
                          </button>
                          <a
                            href={buildWhatsAppUrl(product.name)}
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
              </div>
            </section>

            {/* 4 Sound Characters Guide & Simulator */}
            <SoundCharactersSection />

            {/* Video Section: TikTok @herfin.n */}
            <TikTokSection />

            {/* FIND US ON SOCIAL MEDIA (Shopee, TikTok, WhatsApp) */}
            <SocialMediaSection />
          </div>
        )}

        {/* Tab 2: Pilih Motor (Dedicated 4-Step Matcher) */}
        {activeTab === 'pilih-motor' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MotorcycleSearchFilter
              products={products}
              onSelectProduct={(p) => setSelectedProductDetail(p)}
              onNavigateToCatalog={() => setActiveTab('katalog')}
            />
          </div>
        )}

        {/* Tab 3: Full Product Catalog */}
        {activeTab === 'katalog' && (
          <ProductCatalog
            products={products}
            onSelectProduct={(p) => setSelectedProductDetail(p)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* Tab 4: Karakter Suara */}
        {activeTab === 'suara' && (
          <div>
            <SoundCharactersSection />
          </div>
        )}

        {/* Tab 5: Tentang Kami */}
        {activeTab === 'tentang' && (
          <div>
            <AboutSection />
          </div>
        )}

        {/* Tab 6: Kontak */}
        {activeTab === 'kontak' && (
          <div>
            <ContactSection />
          </div>
        )}

        {/* Tab 7: Admin Dashboard */}
        {activeTab === 'admin' && (
          <div>
            <AdminDashboard
              products={products}
              onProductsUpdated={handleProductsUpdated}
              onPreviewProduct={(p) => setSelectedProductDetail(p)}
            />
          </div>
        )}
      </main>

      {/* 3. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
      />

      {/* 4. Floating WhatsApp */}
      <FloatingWhatsApp products={products} />

      {/* 5. Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 6. Mobile Bottom Sticky Navigation Bar for comfortable phone browsing */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#141414]/95 backdrop-blur-md border-t border-[#262626] px-2 py-1.5 flex items-center justify-around shadow-2xl text-[10px]">
        <button
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center p-1 rounded ${activeTab === 'home' ? 'text-white' : 'text-neutral-400'}`}
        >
          <Home className="w-4 h-4 text-[#8B35C9]" />
          <span className="mt-0.5">Home</span>
        </button>

        <button
          onClick={() => { setActiveTab('pilih-motor'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center p-1 rounded ${activeTab === 'pilih-motor' ? 'text-white' : 'text-neutral-400'}`}
        >
          <Bike className="w-4 h-4 text-emerald-400" />
          <span className="mt-0.5">Pilih Motor</span>
        </button>

        <button
          onClick={() => { setActiveTab('katalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center justify-center p-1 rounded ${activeTab === 'katalog' ? 'text-white' : 'text-neutral-400'}`}
        >
          <Search className="w-4 h-4 text-blue-400" />
          <span className="mt-0.5">Katalog</span>
        </button>

        <a
          href={OFFICIAL_INFO.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 rounded text-neutral-400 hover:text-white"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span className="mt-0.5">Chat WA</span>
        </a>

        <a
          href={OFFICIAL_INFO.shopee.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded bg-[#EE4D2D] text-white font-bold text-[11px] shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Shopee</span>
        </a>
      </div>

    </div>
  );
}
