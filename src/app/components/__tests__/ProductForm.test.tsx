import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from '../ProductForm';
import { jsx, jsxs } from 'react/jsx-runtime';

// Mock do hook useProducts
jest.mock('@/app/context/ProductContext', () => {
  return {
    useProducts: jest.fn(() => ({
      loading: false,
      createProduct: jest.fn(),
    }))
  };
});

// Mock do hook personalizado useCurrencyInput
jest.mock('@/app/hooks/useCurrencyInput', () => {
  return {
    useCurrencyInput: () => ({
      formattedValue: 'R$ 0,00',
      numericValue: 0,
      handleChange: jest.fn((e) => e),
      setValue: jest.fn()
    })
  };
});

describe('ProductForm', () => {
  const useProductsMock = require('@/app/context/ProductContext').useProducts;
  const createProductMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    useProductsMock.mockReturnValue({
      loading: false,
      createProduct: createProductMock
    });
  });

  it('deve renderizar o botão para abrir o formulário', () => {
    render(jsx(ProductForm, {}));
    const openButton = screen.getByText('Cadastrar Novo Produto');
    expect(openButton).toBeInTheDocument();
  });

  it('deve abrir o modal ao clicar no botão', () => {
    const { container } = render(jsx(ProductForm, {}));
    
    // Verificar se o modal inicialmente não é renderizado
    expect(container.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
    
    // Clicar no botão para abrir o modal
    const openButton = screen.getByText('Cadastrar Novo Produto');
    fireEvent.click(openButton);
    
    // Modal deve estar aberto
    expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
  });

  it('deve fechar o modal ao clicar no botão de fechar', () => {
    const { container } = render(jsx(ProductForm, {}));
    
    // Abrir o modal
    const openButton = screen.getByText('Cadastrar Novo Produto');
    fireEvent.click(openButton);
    
    // Modal deve estar aberto
    expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
    
    // Fechar o modal
    const closeButton = screen.getByLabelText('Fechar');
    fireEvent.click(closeButton);
    
    // Modal deve estar fechado
    expect(container.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
  });

  it('deve exibir o botão de loading quando estiver enviando o formulário', () => {
    useProductsMock.mockReturnValue({
      loading: true,
      createProduct: createProductMock
    });
    
    const { container } = render(jsx(ProductForm, {}));
    
    // Abrir o modal
    const openButton = screen.getByText('Cadastrar Novo Produto');
    fireEvent.click(openButton);
    
    // Deve mostrar o texto de loading
    expect(screen.getByText('Cadastrando...')).toBeInTheDocument();
  });
}); 