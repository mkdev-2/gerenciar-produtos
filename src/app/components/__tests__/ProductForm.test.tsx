import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from '../ProductForm';
import { jsx } from 'react/jsx-runtime';

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
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    useProductsMock.mockReturnValue({
      loading: false,
      createProduct: createProductMock
    });
  });

  it('deve renderizar o formulário corretamente', () => {
    render(jsx(ProductForm, { onClose: mockOnClose }));
    
    // Verificar elementos principais
    expect(screen.getByText('Cadastrar Novo Produto')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome do Produto *')).toBeInTheDocument();
    expect(screen.getByLabelText('Preço *')).toBeInTheDocument();
    expect(screen.getByLabelText('Categoria *')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição *')).toBeInTheDocument();
    expect(screen.getByLabelText('URL da Imagem *')).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botão de fechar', () => {
    render(jsx(ProductForm, { onClose: mockOnClose }));
    
    // Clicar no botão de fechar
    const closeButton = screen.getByLabelText('Fechar');
    fireEvent.click(closeButton);
    
    // onClose deve ser chamado
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao clicar no botão de cancelar', () => {
    render(jsx(ProductForm, { onClose: mockOnClose }));
    
    // Clicar no botão de cancelar
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    
    // onClose deve ser chamado
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve exibir o botão de loading quando estiver enviando o formulário', () => {
    useProductsMock.mockReturnValue({
      loading: true,
      createProduct: createProductMock
    });
    
    render(jsx(ProductForm, { onClose: mockOnClose }));
    
    // Deve mostrar o texto de loading
    expect(screen.getByText('Cadastrando...')).toBeInTheDocument();
  });
  
  it('deve chamar createProduct com os dados corretos ao submeter o formulário', async () => {
    render(jsx(ProductForm, { onClose: mockOnClose }));
    
    // Preencher o formulário
    fireEvent.change(screen.getByLabelText('Nome do Produto *'), { 
      target: { value: 'Produto de Teste' } 
    });
    
    fireEvent.change(screen.getByLabelText('Descrição *'), { 
      target: { value: 'Descrição de teste' } 
    });
    
    fireEvent.change(screen.getByLabelText('URL da Imagem *'), { 
      target: { value: 'https://exemplo.com/imagem.jpg' } 
    });
    
    // Submeter o formulário
    const form = screen.getByText('Cadastrar Produto').closest('form');
    if (form) {
      fireEvent.submit(form);
    }
    
    // createProduct deve ser chamado
    expect(createProductMock).toHaveBeenCalledWith({
      name: 'Produto de Teste',
      price: 0, // mock retorna 0
      description: 'Descrição de teste',
      category: 'Desenvolvimento', // valor padrão
      imageUrl: 'https://exemplo.com/imagem.jpg',
    });
  });
}); 