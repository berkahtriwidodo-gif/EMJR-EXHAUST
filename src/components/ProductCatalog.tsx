import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, MaterialType, SoundCharacter, MotorcycleBrand } from '../types';
import { buildWhatsAppUrl, OFFICIAL_INFO } from '../data/catalog';
import { LayoutGrid, List, Filter, Search, X, Check, ShoppingBag, MessageSquare, ChevronRight, SlidersHorizontal, Tag } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  searchQuery,
  setSearchQuery,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | 'All'>('All');
  const [selectedSound, setSelectedSound] = useState<SoundCharacter | 'All'>('All');
  const [selectedBrand, setSelectedBrand] = useState<MotorcycleBrand | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Knalpot Fullset',
    'Silincer Knalpot',
    'Leheran Knalpot',
    'Knalpot Custom',
    'Sparepart dan Aksesori',
  ];

  const materials: (MaterialType | 'All')[] = ['All', 'Stainless Steel', 'Galvanis', 'Monel'];
  const sounds: (SoundCharacter | 'All')[] = ['All', 'Sarfull', 'Sarteng', 'Sarbor', 'Spiral'];
  const brands: (MotorcycleBrand | 'All')[] = ['All', 'Honda', 'Yamaha', 'Suzuki', 'Kawasaki'];

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchMotor = p.compatibleBikes.some(b => 
          b.model.toLowerCase().includes(q) || 
          b.brand.toLowerCase().includes(q) ||
          (b.generation && b.generation.toLowerCase().includes(q))
        );
        if (!matchName && !matchDesc && !matchMotor) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Material
      if (selectedMaterial !== 'All' && p.material !== selectedMaterial) return false;

      // Sound
      if (selectedSound !== 'All' && p.soundCharacter !== selectedSound) return false;

      // Brand compatibility
      if (selectedBrand !== 'All') {
        const matchesBrand = p.compatibleBikes.some(b => b.brand === selectedBrand);
        if (!matchesBrand) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = a.price ?? 999999999;
        const priceB = b.price ?? 999999999;
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = a.price ?? -1;
        const priceB = b.price ?? -1;
        return priceB - priceA;
      }
      return 0; // Default order
    });

    return result;
  }, [products, searchQuery, selectedCategory, selectedMaterial, selectedSound, selectedBrand, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setSelectedSound('All');
    setSelectedBrand('All');
    setSearchQuery('');
    setSortBy('newest');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' ||
    selectedMaterial !== 'All' ||
    selectedSound !== 'All' ||
    selectedBrand !== 'All' ||
    searchQuery.trim() !== '';

  const renderFilterPanel = () => (
    <div className="space-y-6 text-xs text-neutral-300">
      
      {/* Search Input in Sidebar */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
          Pencarian Produk
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ketik tipe motor / produk..."
            className="w-full bg-[#171717] border border-[#2B2B2B] rounded pl-9 pr-3 py-1.5 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-[#8B35C9]"
          />
        </div>
      </div>

      {/* Kategori Produk */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
          Kategori Produk
        </label>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full py-1.5 px-2.5 rounded text-left transition-colors flex items-center justify-between ${
                selectedCategory === cat
                  ? 'bg-[#8B35C9] text-white font-semibold'
                  : 'hover:bg-[#202020] text-neutral-300'
              }`}
            >
              <span>{cat === 'All' ? 'Semua Kategori' : cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Pilihan Merek Motor */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
          Merek Sepeda Motor
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {brands.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`py-1.5 px-2 rounded text-center transition-colors ${
                selectedBrand === b
                  ? 'bg-[#2B2B2B] text-white border-l-2 border-[#8B35C9] font-bold'
                  : 'bg-[#181818] text-neutral-400 hover:bg-[#222222]'
              }`}
            >
              {b === 'All' ? 'Semua' : b}
            </button>
          ))}
        </div>
      </div>

      {/* Pilihan Material */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
          Material Knalpot
        </label>
        <div className="space-y-1">
          {materials.map(mat => (
            <button
              key={mat}
              onClick={() => setSelectedMaterial(mat)}
              className={`w-full py-1.5 px-2.5 rounded text-left transition-colors flex items-center justify-between ${
                selectedMaterial === mat
                  ? 'bg-[#2B2B2B] text-white border-l-2 border-[#8B35C9] font-bold'
                  : 'hover:bg-[#202020] text-neutral-400'
              }`}
            >
              <span>{mat === 'All' ? 'Semua Material' : mat}</span>
              {selectedMaterial === mat && <Check className="w-3.5 h-3.5 text-[#8B35C9]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Karakter Suara */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
          Karakter Suara
        </label>
        <div className="space-y-1">
          {sounds.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSound(s)}
              className={`w-full py-1.5 px-2.5 rounded text-left transition-colors flex items-center justify-between ${
                selectedSound === s
                  ? 'bg-[#2B2B2B] text-white border-l-2 border-[#8B35C9] font-bold'
                  : 'hover:bg-[#202020] text-neutral-400'
              }`}
            >
              <span>{s === 'All' ? 'Semua Karakter Suara' : s}</span>
              {selectedSound === s && <Check className="w-3.5 h-3.5 text-[#8B35C9]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={resetAllFilters}
          className="w-full py-2 px-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-neutral-300 rounded border border-[#333333] transition-colors flex items-center justify-center gap-1.5"
        >
          <X className="w-3.5 h-3.5" />
          <span>Hapus Semua Filter</span>
        </button>
      )}

    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Breadcrumb */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#262626] pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block">
            Automotive Sparepart & Exhaust Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-wide">
            KATALOG KNALPOT EMJR EXHAUST
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Koleksi knalpot sepeda motor buatan EMJR EXHAUST. Menghadirkan fullset, leheran, silincer, dan custom dengan jaminan presisi dan bahan berkualitas.
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 py-2 px-4 rounded bg-[#1F1F1F] text-neutral-200 border border-[#2E2E2E] text-xs font-semibold"
        >
          <Filter className="w-4 h-4 text-[#8B35C9]" />
          <span>Filter Produk {hasActiveFilters && '(Aktif)'}</span>
        </button>
      </div>

      {/* Mobile Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-4/5 max-w-xs bg-[#141414] border-l border-[#262626] h-full p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-4">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                Filter Katalog
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderFilterPanel()}
          </div>
        </div>
      )}

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-[#141414] border border-[#262626] rounded-md p-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626] mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B35C9]" />
                Filter Katalog
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#8B35C9] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            {renderFilterPanel()}
          </div>
        </aside>

        {/* Product Catalog Display (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Top Bar: Results Count + Sort + View Mode */}
          <div className="bg-[#141414] border border-[#262626] rounded-md p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Menampilkan:</span>
              <strong className="text-white">{filteredProducts.length} Produk</strong>
              {hasActiveFilters && (
                <span className="text-[11px] text-[#8B35C9] bg-[#8B35C9]/10 px-2 py-0.5 rounded border border-[#8B35C9]/30">
                  Filter Diterapkan
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-500 hidden sm:inline">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#1A1A1A] border border-[#2B2B2B] rounded px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-[#8B35C9]"
                >
                  <option value="newest">Produk Terbaru</option>
                  <option value="price-asc">Harga: Termurah</option>
                  <option value="price-desc">Harga: Termahal</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-[#1A1A1A] border border-[#2B2B2B] rounded p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#2E2E2E] text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#2E2E2E] text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Items Container */}
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map(product => {
                  const compatibleSummary = product.compatibleBikes
                    .map(b => `${b.brand} ${b.model}`)
                    .slice(0, 2)
                    .join(', ');

                  return (
                    <div
                      key={product.id}
                      className="bg-[#141414] border border-[#262626] hover:border-[#383838] rounded-md overflow-hidden flex flex-col justify-between p-4 group transition-all"
                    >
                      <div>
                        {/* Product Image */}
                        <div 
                          onClick={() => onSelectProduct(product)}
                          className="aspect-[16/10] bg-[#101010] rounded overflow-hidden mb-3 relative cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 bg-[#101010]/90 text-[10px] font-bold px-2 py-0.5 rounded text-neutral-300 border border-[#2E2E2E]">
                            {product.material}
                          </div>
                          <div className="absolute top-2 right-2 bg-[#8B35C9] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {product.soundCharacter}
                          </div>
                        </div>

                        {/* Category & Name */}
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block mb-1">
                          {product.category}
                        </span>

                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="text-base font-bold text-white font-heading hover:text-[#8B35C9] transition-colors cursor-pointer line-clamp-2 leading-tight"
                        >
                          {product.name}
                        </h3>

                        {/* Compatible Motor */}
                        <div className="mt-2 text-xs text-neutral-400 space-y-0.5">
                          <p className="line-clamp-1">
                            <span className="text-neutral-500 font-medium">Cocok:</span> {compatibleSummary || 'Universal Motor'}
                          </p>
                          <p>
                            <span className="text-neutral-500 font-medium">Suara:</span> {product.soundCharacter}
                          </p>
                        </div>
                      </div>

                      {/* Pricing and Actions */}
                      <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-neutral-500 block uppercase">Harga</span>
                          <span className="text-lg font-extrabold text-white font-heading">
                            {product.priceType === 'numeric' && product.price
                              ? `Rp${product.price.toLocaleString('id-ID')}`
                              : 'Hubungi Admin'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#2B2B2B] text-neutral-200 text-xs font-semibold rounded border border-[#2E2E2E] transition-colors"
                          >
                            Detail
                          </button>

                          <a
                            href={buildWhatsAppUrl(product.name, compatibleSummary)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
                            title="Beli via WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Beli</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-3">
                {filteredProducts.map(product => {
                  const compatibleSummary = product.compatibleBikes
                    .map(b => `${b.brand} ${b.model}`)
                    .join(', ');

                  return (
                    <div
                      key={product.id}
                      className="bg-[#141414] border border-[#262626] hover:border-[#383838] rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div
                          onClick={() => onSelectProduct(product)}
                          className="w-24 h-20 sm:w-32 sm:h-24 bg-[#101010] rounded overflow-hidden shrink-0 cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-neutral-400 bg-[#1E1E1E] px-2 py-0.5 rounded">
                              {product.category}
                            </span>
                            <span className="text-[10px] font-bold text-[#8B35C9] bg-[#8B35C9]/15 px-2 py-0.5 rounded">
                              {product.soundCharacter}
                            </span>
                            <span className="text-[10px] font-bold text-neutral-300">
                              {product.material}
                            </span>
                          </div>

                          <h3
                            onClick={() => onSelectProduct(product)}
                            className="text-base font-bold text-white font-heading hover:text-[#8B35C9] transition-colors cursor-pointer truncate"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs text-neutral-400 truncate mt-0.5">
                            Kecocokan: {compatibleSummary || 'Semua motor'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#262626]">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-neutral-500 block uppercase">Harga</span>
                          <span className="text-lg font-extrabold text-white font-heading">
                            {product.priceType === 'numeric' && product.price
                              ? `Rp${product.price.toLocaleString('id-ID')}`
                              : 'Hubungi Admin'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="px-3.5 py-2 bg-[#1F1F1F] hover:bg-[#2B2B2B] text-neutral-200 text-xs font-semibold rounded border border-[#2E2E2E]"
                          >
                            Detail
                          </button>
                          <a
                            href={buildWhatsAppUrl(product.name, compatibleSummary)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded flex items-center gap-1.5"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Beli</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* No Results */
            <div className="bg-[#141414] border border-[#262626] rounded-md p-10 text-center space-y-3">
              <Tag className="w-8 h-8 text-neutral-600 mx-auto" />
              <h3 className="text-base font-bold text-white">
                Tidak ada produk yang sesuai dengan filter.
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau ubah pilihan kategori dan material knalpot.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-2 px-4 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-neutral-200 text-xs font-semibold rounded border border-[#333333]"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
