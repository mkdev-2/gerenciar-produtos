'use client';

import { useState, useEffect, useCallback } from 'react';
import { useProducts, SortOption } from '../context/ProductContext';
import { useCurrencyInput } from '../hooks/useCurrencyInput';

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
  const minPriceInput = useCurrencyInput({ initialValue: contextMinPrice || 0 });
  const maxPriceInput = useCurrencyInput({ initialValue: contextMaxPrice || 0 });
  const [sortOption, setSortOptionState] = useState<SortOption>(contextSortOption);
  
  // Inicializar os estados com valores do contexto quando o componente montar
  useEffect(() => {
    if (contextMinPrice) {
      minPriceInput.setValue(contextMinPrice);
    }
    
    if (contextMaxPrice) {
      maxPriceInput.setValue(contextMaxPrice);
    }
  }, [contextMinPrice, contextMaxPrice]);
  
  // Aplicar filtros com debounce
  const applyFilters = useCallback(() => {
    setNameFilter(nameInput);
    const minPriceValue = minPriceInput.numericValue > 0 ? minPriceInput.numericValue : null;
    const maxPriceValue = maxPriceInput.numericValue > 0 ? maxPriceInput.numericValue : null;
    setPriceRange(minPriceValue, maxPriceValue);
  }, [nameInput, minPriceInput.numericValue, maxPriceInput.numericValue, setNameFilter, setPriceRange]);
  
  // Usar um efeito para aplicar os filtros automaticamente com um pequeno delay
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 500); 
    
    return () => clearTimeout(timer);
  }, [nameInput, minPriceInput.formattedValue, maxPriceInput.formattedValue, applyFilters]);
  
  const handleClearFilters = () => {
    setNameInput('');
    minPriceInput.setValue(0);
    maxPriceInput.setValue(0);
    setSortOptionState('recent');
    
    // Aplicar limpeza imediatamente
    setNameFilter('');
    setPriceRange(null, null);
    setSortOption('recent');
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    setSortOptionState(value);
    // Aplicar ordenação imediatamente
    setSortOption(value);
  };
  
  return (
    <div className="mb-8 p-5 border rounded-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium mb-1">
          Buscar produtos
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            placeholder="Nome ou descrição do produto"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="min-price" className="block text-sm font-medium mb-1">
            Preço mínimo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">R$</span>
            </div>
            <input
              id="min-price"
              type="text"
              value={minPriceInput.formattedValue}
              onChange={minPriceInput.handleChange}
              className="w-full pl-8 pr-3 py-2 border rounded-md"
              placeholder="0,00"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="max-price" className="block text-sm font-medium mb-1">
            Preço máximo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">R$</span>
            </div>
            <input
              id="max-price"
              type="text"
              value={maxPriceInput.formattedValue}
              onChange={maxPriceInput.handleChange}
              className="w-full pl-8 pr-3 py-2 border rounded-md"
              placeholder="0,00"
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
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-white appearance-none pr-8"
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
    </div>
  );
} 