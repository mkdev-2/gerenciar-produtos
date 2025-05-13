'use client';

import { FormEvent, useState } from 'react';
import { useProducts } from '@/app/context/ProductContext';
import { useCurrencyInput } from '../hooks/useCurrencyInput';

export default function ProductForm({ onClose }: { onClose?: () => void } = {}) {
  const { createProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Desenvolvimento',
    imageUrl: '',
  });
  
  const priceInput = useCurrencyInput();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await createProduct({
        name: formData.name,
        price: priceInput.numericValue,
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl,
      });
      
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Limpar o formulário ao fechar
    setFormData({
      name: '',
      description: '',
      category: 'Desenvolvimento',
      imageUrl: '',
    });
    priceInput.setValue(0);
    // Chamar callback onClose se existir
    if (onClose) onClose();
  };

  const categories = [
    'Desenvolvimento',
    'Design',
    'Marketing',
    'Infraestrutura',
    'Suporte',
    'Consultoria',
  ];

  if (!isModalOpen) {
    return (
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Cadastrar Novo Produto
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl mx-4">
        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Cadastrar Novo Produto</h2>
          <button 
            type="button" 
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Nome do produto */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nome do Produto <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nome do produto"
                className="w-full px-3 py-2 border rounded-md border-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Preço */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Preço <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">R$</span>
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={priceInput.formattedValue}
                    onChange={priceInput.handleChange}
                    required
                    placeholder="0,00"
                    className="w-full pl-8 pr-3 py-2 border rounded-md border-gray-300"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Categoria <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-white appearance-none pr-8"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
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

            {/* Descrição */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Descreva o produto"
                className="w-full px-3 py-2 border rounded-md border-gray-300"
              />
            </div>

            {/* URL da imagem */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                URL da Imagem <span className="text-red-500">*</span>
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full px-3 py-2 border rounded-md border-gray-300"
              />
            </div>

            {/* Botões de ação */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 