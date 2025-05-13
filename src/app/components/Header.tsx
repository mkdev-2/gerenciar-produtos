'use client';

import ProductForm from './ProductForm';
import { useState } from 'react';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <header className="bg-white border-b py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
            <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="2" />
            <line x1="9" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="15" y1="4" x2="15" y2="20" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h1 className="text-xl font-bold">Catálogo de Produtos</h1>
        </div>
        
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Cadastrar Novo Produto
        </button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <ProductForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </header>
  );
} 