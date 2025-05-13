import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { ProductProvider, useProducts } from '../ProductContext';
import { productApi } from '../../services/productApi';
import { mockProductList } from '@/lib/mocks/mockData';

// Usamos apenas os dois primeiros produtos para o teste
const mockProductListShort = mockProductList.slice(0, 2);

jest.mock('../../services/productApi', () => ({
  productApi: {
    getProducts: jest.fn(),
    createProduct: jest.fn()
  }
}));

// Wrapper para o renderHook
const wrapper = ({ children }: { children: React.ReactNode }) => <ProductProvider>{children}</ProductProvider>;

describe('ProductContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Não mockamos o useEffect, apenas o getProducts
    (productApi.getProducts as jest.Mock).mockResolvedValue(mockProductListShort);
  });

  it('deve retornar os valores e funções esperados do contexto', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    // Verificamos que o hook retorna as propriedades e funções esperadas
    expect(result.current).toHaveProperty('products');
    expect(result.current).toHaveProperty('filteredProducts');
    expect(result.current).toHaveProperty('nameFilter');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('fetchProducts');
    expect(result.current).toHaveProperty('createProduct');
    expect(result.current).toHaveProperty('setNameFilter');
    expect(result.current).toHaveProperty('setSortOption');
    expect(result.current).toHaveProperty('setPriceRange');
  });
});