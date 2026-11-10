import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/catalog';

const STORAGE_KEY = 'emjr_exhaust_products_v1';

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.error('Error loading products from localStorage:', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveProductToStorage(product: Product): Product[] {
  const current = getStoredProducts();
  const index = current.findIndex(p => p.id === product.id);
  let updated: Product[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = product;
  } else {
    updated = [product, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving product to localStorage:', err);
  }

  return updated;
}

export function deleteProductFromStorage(productId: string): Product[] {
  const current = getStoredProducts();
  const updated = current.filter(p => p.id !== productId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting product from localStorage:', err);
  }
  return updated;
}

export function resetProductsToDefault(): Product[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  } catch (err) {
    console.error('Error resetting products:', err);
  }
  return INITIAL_PRODUCTS;
}

/**
 * Helper to convert uploaded File to Base64 data URL
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
