'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useProducts, SortOption } from '../context/ProductContext';
import CurrencyInput, { CurrencyInputRef } from './CurrencyInput';

const sortOptions = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' }
];

export default function ProductFilters() {
  const { 
    nameFilter,
    minPrice: contextMinPrice, 
    maxPrice: contextMaxPrice,
    sortOption: contextSortOption,
    setNameFilter, 
    setPriceRange, 
    setSortOption 
  } = useProducts();
  
  const [nameInput, setNameInput] = useState(nameFilter || '');
  const minPriceRef = useRef<CurrencyInputRef>(null);
  const maxPriceRef = useRef<CurrencyInputRef>(null);
  const [minPriceValue, setMinPriceValue] = useState<number>(0);
  const [maxPriceValue, setMaxPriceValue] = useState<number>(0);
  const [sortOption, setSortOptionState] = useState<SortOption>(contextSortOption);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Verificar tamanho da tela apenas no lado do cliente
  useEffect(() => {
    // Inicializar o estado de collapse baseado no tamanho da tela
    setIsCollapsed(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Inicializar os estados com valores do contexto quando o componente montar
  useEffect(() => {
    if (contextMinPrice && minPriceRef.current) {
      minPriceRef.current.setValue(contextMinPrice);
      setMinPriceValue(contextMinPrice);
    }
    
    if (contextMaxPrice && maxPriceRef.current) {
      maxPriceRef.current.setValue(contextMaxPrice);
      setMaxPriceValue(contextMaxPrice);
    }
  }, [contextMinPrice, contextMaxPrice]);
  
  const applyFilters = useCallback(() => {
    setNameFilter(nameInput);
    
    setPriceRange(
      minPriceValue > 0 ? minPriceValue : null,
      maxPriceValue > 0 ? maxPriceValue : null
    );
  }, [nameInput, minPriceValue, maxPriceValue, setNameFilter, setPriceRange]);
  
  // Aplicar filtros imediatamente quando os valores mudarem
  useEffect(() => {
    applyFilters();
  }, [nameInput, minPriceValue, maxPriceValue, applyFilters]);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  
  const handleMinPriceChange = (value: number) => {
    setMinPriceValue(value);
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPriceValue(value);
  };
  
  const handleClearFilters = () => {
    setNameInput('');
    if (minPriceRef.current) minPriceRef.current.setValue(0);
    if (maxPriceRef.current) maxPriceRef.current.setValue(0);
    setMinPriceValue(0);
    setMaxPriceValue(0);
    setSortOptionState('recent');
    
    setNameFilter('');
    setPriceRange(null, null);
    setSortOption('recent');
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    setSortOptionState(value);
    setSortOption(value);
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className="mb-4 sm:mb-6 border rounded-lg bg-white overflow-hidden shadow-sm">
      <div 
        className="p-3 sm:p-4 flex justify-between items-center cursor-pointer border-b"
        onClick={toggleCollapse}
      >
        <h2 className="text-lg sm:text-xl font-semibold">Filtros</h2>
        <button 
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={isCollapsed ? "Expandir filtros" : "Recolher filtros"}
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? '' : 'transform rotate-180'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-[1000px] opacity-100 p-3 sm:p-5'}`}>
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium mb-1">
            Buscar produtos
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={nameInput}
              onChange={handleNameChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base"
              placeholder="Nome ou descrição do produto"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <CurrencyInput 
                ref={minPriceRef}
                id="min-price"
                label="Preço mínimo"
                initialValue={contextMinPrice || 0}
                onChange={handleMinPriceChange}
              />
            </div>
            
            <div>
              <CurrencyInput 
                ref={maxPriceRef}
                id="max-price"
                label="Preço máximo"
                initialValue={contextMaxPrice || 0}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-1">
              Ordenar por
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-white appearance-none pr-8 text-sm sm:text-base"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  );
} 