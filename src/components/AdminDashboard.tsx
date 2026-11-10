import React, { useState } from 'react';
import { Product, ProductCategory, MaterialType, SoundCharacter, MotorcycleBrand } from '../types';
import { saveProductToStorage, deleteProductFromStorage, resetProductsToDefault, fileToBase64 } from '../utils/storage';
import { MOTORCYCLES_DATABASE, OFFICIAL_INFO } from '../data/catalog';
import { Plus, Edit, Trash2, RotateCcw, Upload, Check, AlertCircle, ShoppingBag, Eye, X, Save, ShieldAlert } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onProductsUpdated: (updated: Product[]) => void;
  onPreviewProduct: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onProductsUpdated,
  onPreviewProduct,
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Knalpot Fullset');
  const [formMaterial, setFormMaterial] = useState<MaterialType>('Stainless Steel');
  const [formSound, setFormSound] = useState<SoundCharacter>('Sarfull');
  const [formPriceType, setFormPriceType] = useState<'numeric' | 'contact_admin'>('numeric');
  const [formPrice, setFormPrice] = useState<number>(340000);
  const [formImage, setFormImage] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formInstall, setFormInstall] = useState('');
  const [formShopeeUrl, setFormShopeeUrl] = useState(OFFICIAL_INFO.shopee.url);
  const [formInStock, setFormInStock] = useState(true);
  const [formCompatibleBrand, setFormCompatibleBrand] = useState<MotorcycleBrand>('Honda');
  const [formCompatibleModel, setFormCompatibleModel] = useState('Astrea');

  const openAddModal = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Knalpot Fullset');
    setFormMaterial('Stainless Steel');
    setFormSound('Sarfull');
    setFormPriceType('numeric');
    setFormPrice(340000);
    setFormImage('/suprax.webp');
    setFormDesc('Knalpot sepeda motor buatan EMJR EXHAUST dengan material berkualitas tinggi.');
    setFormInstall('100% Plug & Play (PNP) tanpa ubahan baut.');
    setFormShopeeUrl(OFFICIAL_INFO.shopee.url);
    setFormInStock(true);
    setFormCompatibleBrand('Honda');
    setFormCompatibleModel('Astrea');
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsAddingNew(false);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormMaterial(product.material);
    setFormSound(product.soundCharacter);
    setFormPriceType(product.priceType);
    setFormPrice(product.price || 340000);
    setFormImage(product.image);
    setFormDesc(product.description);
    setFormInstall(product.installationInfo);
    setFormShopeeUrl(product.shopeeUrl);
    setFormInStock(product.inStock);

    if (product.compatibleBikes.length > 0) {
      setFormCompatibleBrand(product.compatibleBikes[0].brand);
      setFormCompatibleModel(product.compatibleBikes[0].model);
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormImage(base64);
      } catch (err) {
        console.error('Failed to convert file to base64', err);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const targetId = editingProduct ? editingProduct.id : `emjr-${Date.now()}`;
    const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const updatedProduct: Product = {
      id: targetId,
      name: formName,
      slug,
      category: formCategory,
      material: formMaterial,
      soundCharacter: formSound,
      priceType: formPriceType,
      price: formPriceType === 'numeric' ? Number(formPrice) : null,
      image: formImage || '/astrea.webp',
      gallery: [formImage || '/astrea.webp'],
      description: formDesc,
      installationInfo: formInstall,
      specs: [
        { label: 'Kategori', value: formCategory },
        { label: 'Material', value: formMaterial },
        { label: 'Karakter Suara', value: formSound },
        { label: 'Status Harga', value: formPriceType === 'numeric' ? `Rp${Number(formPrice).toLocaleString('id-ID')}` : 'Hubungi Admin' },
      ],
      compatibleBikes: [
        { brand: formCompatibleBrand, model: formCompatibleModel },
      ],
      shopeeUrl: formShopeeUrl || OFFICIAL_INFO.shopee.url,
      inStock: formInStock,
    };

    const newCatalog = saveProductToStorage(updatedProduct);
    onProductsUpdated(newCatalog);
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${name}"? Data akan terhapus dari penyimpanan.`)) {
      const updated = deleteProductFromStorage(id);
      onProductsUpdated(updated);
    }
  };

  const handleResetCatalog = () => {
    if (confirm('Kembalikan semua data produk ke katalog bawaan awal? Perubahan manual akan direset.')) {
      const restored = resetProductsToDefault();
      onProductsUpdated(restored);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#262626]">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#8B35C9] font-bold block mb-1">
            Pengelolaan Data Katalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-wide">
            ADMIN DASHBOARD EMJR EXHAUST
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Kelola penambahan produk knalpot baru, pembaruan harga resmi, stok, material, dan kecocokan motor. Seluruh perubahan tersimpan secara persisten.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openAddModal}
            className="py-2 px-3.5 bg-[#8B35C9] hover:bg-[#7828b0] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Knalpot Baru</span>
          </button>

          <button
            onClick={handleResetCatalog}
            className="py-2 px-3 bg-[#1C1C1C] hover:bg-[#282828] text-neutral-300 text-xs font-semibold rounded border border-[#333333] flex items-center gap-1"
            title="Reset ke katalog awal bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      {/* Security Disclaimer Notice as instructed */}
      <div className="mb-6 p-3.5 bg-[#171717] border border-[#2E2E2E] rounded text-xs text-neutral-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#8B35C9] shrink-0 mt-0.5" />
        <p>
          <strong className="text-white">Pemberitahuan Sistem:</strong> Dashboard ini berjalan dalam mode demonstrasi manajemen data lokal dengan penyimpanan persisten browser (localStorage). Semua operasi CRUD (Tambah, Edit, Hapus, Upload Foto) tersimpan langsung.
        </p>
      </div>

      {/* Product Table */}
      <div className="bg-[#141414] border border-[#262626] rounded-md overflow-hidden">
        <div className="px-5 py-3 border-b border-[#262626] flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-white">
            Daftar Produk ({products.length} Item Terdaftar)
          </span>
          <span className="text-neutral-500">Harga Acuan: Galvanis Rp240.000 | Stainless Rp340.000</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300 divide-y divide-[#222222]">
            <thead className="bg-[#101010] text-[11px] uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="py-3 px-4">Foto</th>
                <th className="py-3 px-4">Nama Produk</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4">Suara</th>
                <th className="py-3 px-4">Harga</th>
                <th className="py-3 px-4">Kecocokan</th>
                <th className="py-3 px-4">Stok</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F1F]">
              {products.map(product => {
                const motorLabel = product.compatibleBikes.map(b => `${b.brand} ${b.model}`).join(', ');
                return (
                  <tr key={product.id} className="hover:bg-[#181818] transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="w-12 h-10 rounded bg-[#101010] overflow-hidden border border-[#2E2E2E]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-white max-w-xs truncate">
                      {product.name}
                    </td>
                    <td className="py-2.5 px-4 text-neutral-400 whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[11px] font-bold">
                        {product.material}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className="text-[#8B35C9] font-bold">{product.soundCharacter}</span>
                    </td>
                    <td className="py-2.5 px-4 font-bold text-white whitespace-nowrap">
                      {product.priceType === 'numeric' && product.price
                        ? `Rp${product.price.toLocaleString('id-ID')}`
                        : <span className="text-amber-400">Hubungi Admin</span>}
                    </td>
                    <td className="py-2.5 px-4 text-neutral-400 max-w-xs truncate">
                      {motorLabel || 'Universal'}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        product.inStock ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'bg-red-950/60 text-red-400 border border-red-500/30'
                      }`}>
                        {product.inStock ? 'Ready' : 'Habis'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => onPreviewProduct(product)}
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-[#262626]"
                        title="Lihat Tampilan Produk"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1 text-neutral-400 hover:text-[#8B35C9] rounded hover:bg-[#262626]"
                        title="Edit Produk"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1 text-neutral-400 hover:text-red-400 rounded hover:bg-[#262626]"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {(isAddingNew || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0" onClick={() => { setIsAddingNew(false); setEditingProduct(null); }} />

          <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2E2E2E] rounded-md shadow-2xl p-6 z-10 my-6 sm:my-10 space-y-4 text-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {isAddingNew ? 'Tambah Produk Knalpot Baru' : `Edit Produk: ${editingProduct?.name}`}
              </h3>
              <button
                onClick={() => { setIsAddingNew(false); setEditingProduct(null); }}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Nama Produk Knalpot:</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Knalpot EMJR Fullset Honda Astrea Galvanis..."
                  required
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white focus:outline-none focus:border-[#8B35C9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Kategori:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white focus:outline-none focus:border-[#8B35C9]"
                  >
                    <option value="Knalpot Fullset">Knalpot Fullset</option>
                    <option value="Silincer Knalpot">Silincer Knalpot</option>
                    <option value="Leheran Knalpot">Leheran Knalpot</option>
                    <option value="Knalpot Custom">Knalpot Custom</option>
                    <option value="Sparepart dan Aksesori">Sparepart dan Aksesori</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Material:</label>
                  <select
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value as any)}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white focus:outline-none focus:border-[#8B35C9]"
                  >
                    <option value="Stainless Steel">Stainless Steel</option>
                    <option value="Galvanis">Galvanis</option>
                    <option value="Monel">Monel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Karakter Suara:</label>
                  <select
                    value={formSound}
                    onChange={(e) => setFormSound(e.target.value as any)}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white focus:outline-none focus:border-[#8B35C9]"
                  >
                    <option value="Sarfull">Sarfull (Adem)</option>
                    <option value="Sarteng">Sarteng (Ulem)</option>
                    <option value="Sarbor">Sarbor (Gahar)</option>
                    <option value="Spiral">Spiral (Kering)</option>
                  </select>
                </div>
              </div>

              {/* Price Setup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#111111] p-3 rounded border border-[#242424]">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Tipe Harga:</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormPriceType('numeric')}
                      className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold ${
                        formPriceType === 'numeric' ? 'bg-[#8B35C9] text-white' : 'bg-[#1F1F1F] text-neutral-400'
                      }`}
                    >
                      Angka Pasti (Rp)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormPriceType('contact_admin')}
                      className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold ${
                        formPriceType === 'contact_admin' ? 'bg-[#8B35C9] text-white' : 'bg-[#1F1F1F] text-neutral-400'
                      }`}
                    >
                      Hubungi Admin
                    </button>
                  </div>
                </div>

                {formPriceType === 'numeric' && (
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Nominal Harga (Rp):
                    </label>
                    <input
                      type="number"
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      placeholder="240000 atau 340000"
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white"
                    />
                    <span className="text-[10px] text-neutral-500 mt-0.5 block">
                      Standar: Galvanis Rp240.000 | Stainless Rp340.000
                    </span>
                  </div>
                )}
              </div>

              {/* Image Upload and Image URL */}
              <div className="space-y-2">
                <label className="block text-neutral-300 font-semibold">
                  Foto Produk:
                </label>
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded bg-[#101010] border border-[#2E2E2E] overflow-hidden shrink-0">
                    <img src={formImage || '/astrea.webp'} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="text-xs text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:bg-[#222222] file:text-white"
                    />
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Atau masukkan path gambar (misal: /astrea.webp atau URL)"
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Compatible Motor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Merek Motor:</label>
                  <select
                    value={formCompatibleBrand}
                    onChange={(e) => setFormCompatibleBrand(e.target.value as any)}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white"
                  >
                    <option value="Honda">Honda</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Kawasaki">Kawasaki</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Model Motor:</label>
                  <input
                    type="text"
                    value={formCompatibleModel}
                    onChange={(e) => setFormCompatibleModel(e.target.value)}
                    placeholder="Astrea / Supra X / Karisma..."
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Deskripsi & Spek:</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white"
                />
              </div>

              {/* Shopee URL & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Link Shopee Resmi:</label>
                  <input
                    type="url"
                    value={formShopeeUrl}
                    onChange={(e) => setFormShopeeUrl(e.target.value)}
                    placeholder={OFFICIAL_INFO.shopee.url}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2 text-white"
                  />
                </div>
                <div className="pt-4">
                  <label className="flex items-center gap-2 text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formInStock}
                      onChange={(e) => setFormInStock(e.target.checked)}
                      className="rounded accent-[#8B35C9]"
                    />
                    <span>Status Produk Ready Stock (Tersedia)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAddingNew(false); setEditingProduct(null); }}
                  className="py-2 px-3.5 bg-[#1F1F1F] hover:bg-[#292929] text-neutral-300 rounded font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#8B35C9] hover:bg-[#7828b0] text-white font-bold rounded flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
