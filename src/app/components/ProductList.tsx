'use client';

import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

export default function ProductList() {
  const { 
    filteredProducts, 
    loading, 
    error, 
    currentPage, 
    itemsPerPage,
    totalPages, 
    setCurrentPage
  } = useProducts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Carregando produtos...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md my-4">
        <p>Erro ao carregar produtos: {error}</p>
      </div>
    );
  }
  
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">Nenhum produto encontrado com os filtros atuais.</p>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Adicionar Novo Produto
        </button>
        
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <ProductForm onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Produtos encontrados ({filteredProducts.length})</h2>
        <p className="text-sm text-gray-500">
          Mostrando {currentProducts.length} de {filteredProducts.length} produtos
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          
          <span className="px-3 py-1">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <ProductForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
