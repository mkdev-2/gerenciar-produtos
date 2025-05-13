import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ProductList from '../ProductList';
import { Product } from '../../types/product';
import { jsx } from 'react/jsx-runtime';

// Mock do useProducts hook
jest.mock('@/app/context/ProductContext', () => {
  const originalModule = jest.requireActual('@/app/context/ProductContext');
  
  return {
    ...originalModule,
    useProducts: jest.fn(),
  };
});

import { useProducts } from '../../context/ProductContext';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Produto de Teste 1',
    price: 99.99,
    description: 'Descrição do produto teste 1',
    category: 'Eletrônicos',
    imageUrl: 'https://via.placeholder.com/150',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Produto de Teste 2',
    price: 199.99,
    description: 'Descrição do produto teste 2',
    category: 'Periféricos',
    imageUrl: 'https://via.placeholder.com/150',
    createdAt: new Date().toISOString(),
  },
];

// Mock do componente ProductCard para evitar problemas com o Next Image
jest.mock('../ProductCard', () => {
  return {
    __esModule: true,
    default: ({ product }: any) => 
      jsx('div', {
        'data-testid': `product-card-${product.id}`,
        children: [
          jsx('div', { children: product.name }),
          jsx('div', { children: product.price }),
          jsx('div', { children: product.category })
        ]
      })
  };
});

// Mock do ProductForm
jest.mock('../ProductForm', () => {
  return {
    __esModule: true,
    default: ({ onClose }: any) => 
      jsx('div', { 'data-testid': 'product-form', children: 'Formulário de Produto' })
  };
});

describe('ProductList', () => {
  beforeEach(() => {
    // Limpa os mocks entre os testes
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente a lista de produtos', () => {
    // Configura o mock do hook useProducts
    (useProducts as jest.Mock).mockReturnValue({
      filteredProducts: mockProducts,
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 8,
      setCurrentPage: jest.fn()
    });

    const { container, getByTestId } = render(jsx(ProductList, {}));

    // Verifica se os produtos estão sendo renderizados
    expect(getByTestId('product-card-1')).toBeInTheDocument();
    expect(getByTestId('product-card-2')).toBeInTheDocument();
  });

  it('deve mostrar a mensagem de "nenhum produto encontrado" quando não há produtos', () => {
    // Configura o mock do hook useProducts com array vazio
    (useProducts as jest.Mock).mockReturnValue({
      filteredProducts: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 8,
      setCurrentPage: jest.fn()
    });

    const { getByText } = render(jsx(ProductList, {}));

    // Verifica se a mensagem é exibida com o texto exato usado no componente
    expect(getByText('Nenhum produto encontrado com os filtros atuais.')).toBeInTheDocument();
  });

  it('deve mostrar o estado de carregamento quando loading for true', () => {
    // Configura o mock do hook useProducts com loading true
    (useProducts as jest.Mock).mockReturnValue({
      filteredProducts: [],
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 8,
      setCurrentPage: jest.fn()
    });

    const { getByText } = render(jsx(ProductList, {}));
    
    // Verifica se a mensagem de carregamento é exibida
    expect(getByText('Carregando produtos...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando ocorrer um erro', () => {
    // Configura o mock do hook useProducts com erro
    (useProducts as jest.Mock).mockReturnValue({
      filteredProducts: [],
      loading: false,
      error: 'Erro ao carregar produtos',
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 8,
      setCurrentPage: jest.fn()
    });

    const { getByText } = render(jsx(ProductList, {}));
    
    // Verifica se a mensagem de erro é exibida
    expect(getByText(/Erro ao carregar produtos/)).toBeInTheDocument();
  });
}); 