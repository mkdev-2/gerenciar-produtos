'use client';

import { useState } from 'react';
import ProductForm from './ProductForm';

export default function ProductFormButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Impedir rolagem do body quando o modal estiver aberto
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Restaurar rolagem do body quando o modal for fechado
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Novo Produto
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
          <div 
            className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-6">
              <ProductForm onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 