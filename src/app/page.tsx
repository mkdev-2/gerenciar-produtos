'use client';

import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import ProductFilters from './components/ProductFilters';
import ProductList from './components/ProductList';
import { useEffect } from 'react';
import { initializeMSW } from '@/lib/mocks';

export default function Home() {
  useEffect(() => {
    const setupMocks = async () => {
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        try {
          await initializeMSW();
        } catch (error) {
          console.error('[App] Erro ao inicializar MSW:', error);
        }
      }
    };
    
    setupMocks();
  }, []);

  return (
    <ProductProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="mb-4">
            <p className="text-gray-600">Gerencie seu catálogo de produtos com facilidade</p>
          </div>
          
          <hr className="my-6 border-gray-200" />
          
          <ProductFilters />
          <ProductList />
        </main>
        
        <footer className="bg-white py-6 border-t">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            {new Date().getFullYear()} Catálogo de Produtos
          </div>
        </footer>
      </div>
    </ProductProvider>
  );
}
