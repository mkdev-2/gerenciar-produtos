'use client';

import { useState } from 'react';
import ProductForm from './ProductForm';

export default function ProductFormButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Cadastrar Novo Produto
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-xl p-6">
            <ProductForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
} 