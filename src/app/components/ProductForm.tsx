'use client';

import { FormEvent, useState, useRef } from 'react';
import { useProducts } from '@/app/context/ProductContext';
import CurrencyInput, { CurrencyInputRef } from './CurrencyInput';

export default function ProductForm({ onClose }: { onClose?: () => void } = {}) {
  const { createProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Desenvolvimento',
    imageUrl: '',
  });
  
  const priceInputRef = useRef<CurrencyInputRef>(null);

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
        price: priceInputRef.current?.getValue() || 0,
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl,
      });
      
      handleReset();
      if (onClose) onClose();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };
  
  const handleReset = () => {
    // Limpar o formulário
    setFormData({
      name: '',
      description: '',
      category: 'Desenvolvimento',
      imageUrl: '',
    });
    priceInputRef.current?.setValue(0);
  };

  const categories = [
    'Desenvolvimento',
    'Design',
    'Marketing',
    'Infraestrutura',
    'Suporte',
    'Consultoria',
  ];

  return (
    <div className="bg-white rounded-lg w-full">
        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cadastrar Novo Produto</h2>
        {onClose && (
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Preço */}
              <div>
                <CurrencyInput
                  ref={priceInputRef}
                  id="price"
                  label="Preço"
                  required
                  placeholder="0,00"
                />
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
                rows={3}
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
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
            )}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
              </button>
            </div>
          </div>
        </form>
    </div>
  );
} 