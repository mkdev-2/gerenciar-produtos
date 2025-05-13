'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { Product, ProductFormData } from '../types/product';
import { productApi } from '../services/productApi';
import { useResponsiveItemsPerPage } from '../hooks/useResponsiveItemsPerPage';

// Tipos
export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'recent';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  nameFilter: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortOption: SortOption;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  
  fetchProducts: () => Promise<void>;
  createProduct: (data: ProductFormData) => Promise<void>;
  setNameFilter: (name: string) => void;
  setPriceRange: (minPrice: number | null, maxPrice: number | null) => void;
  setSortOption: (option: SortOption) => void;
  setCurrentPage: (page: number) => void;
}

// Criar o contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  // Estados básicos
  const [products, setProducts] = useState<Product[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use o hook personalizado para ajustar o número de itens por página responsivamente
  const itemsPerPage = useResponsiveItemsPerPage();
  
  // Reseta para a primeira página quando o número de itens por página muda
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productApi.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Falha ao carregar produtos. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData: ProductFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newProduct = await productApi.createProduct(productData);
      setProducts(prevProducts => [...prevProducts, newProduct]);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setError('Falha ao criar produto. Por favor, tente novamente.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (nameFilter) {
      const searchTerm = nameFilter.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (minPrice !== null) {
      result = result.filter(p => p.price >= minPrice);
    }
    
    if (maxPrice !== null) {
      result = result.filter(p => p.price <= maxPrice);
    }
    
    switch(sortOption) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    return result;
  }, [products, nameFilter, minPrice, maxPrice, sortOption]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length, itemsPerPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const setPriceRange = useCallback((min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  const contextValue: ProductContextType = {
    products,
    filteredProducts,
    nameFilter,
    minPrice,
    maxPrice,
    sortOption,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalPages,
    
    fetchProducts,
    createProduct,
    setNameFilter,
    setPriceRange,
    setSortOption,
    setCurrentPage
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  
  return context;
} 