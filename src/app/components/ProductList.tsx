'use client';

import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import ProductFormButton from './ProductFormButton';

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
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  if (loading) {
    return (
      <div className="text-center py-6 sm:py-10">
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
      <div className="text-center py-6 sm:py-10">
        <p className="text-gray-500 mb-4">Nenhum produto encontrado com os filtros atuais.</p>
        <ProductFormButton />
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Produtos encontrados ({filteredProducts.length})</h2>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
          <p className="text-xs sm:text-sm text-gray-500">
            Mostrando {currentProducts.length} de {filteredProducts.length} produtos
          </p>
          <p className="text-xs text-gray-400">
            {itemsPerPage} produtos por página (ajustado para seu dispositivo)
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-8 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1 border rounded-md disabled:opacity-50 text-sm"
            >
              Anterior
            </button>
            
            <span className="px-2 sm:px-3 py-1 text-sm">
              Página {currentPage} de {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1 border rounded-md disabled:opacity-50 text-sm"
            >
              Próxima
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-2 sm:mt-0 sm:ml-4">
            Mostrando {itemsPerPage} produtos por página
          </p>
        </div>
      )}
    </div>
  );
}
