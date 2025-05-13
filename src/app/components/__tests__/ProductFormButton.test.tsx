import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductFormButton from '../ProductFormButton';
import { jsx } from 'react/jsx-runtime';

// Mock do componente ProductForm
jest.mock('../ProductForm', () => {
  return jest.fn(() => (
    <div data-testid="product-form">
      Formulário de Produto Mockado
      <button>Fechar</button>
    </div>
  ));
});

describe('ProductFormButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o botão para abrir o modal', () => {
    render(jsx(ProductFormButton, {}));
    const button = screen.getByText('Cadastrar Novo Produto');
    expect(button).toBeInTheDocument();
  });

  it('deve abrir o modal ao clicar no botão', () => {
    render(jsx(ProductFormButton, {}));
    
    // Inicialmente o modal não deve estar visível
    expect(screen.queryByTestId('product-form')).not.toBeInTheDocument();
    
    // Clicar no botão para abrir o modal
    const button = screen.getByText('Cadastrar Novo Produto');
    fireEvent.click(button);
    
    // O modal deve estar visível
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
  });

  it('deve fechar o modal quando o ProductForm chamar onClose', () => {
    render(jsx(ProductFormButton, {}));
    
    // Abrir o modal
    const button = screen.getByText('Cadastrar Novo Produto');
    fireEvent.click(button);
    
    // O modal deve estar visível
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
    
    // Simular o fechamento do modal através do onClose
    const closeButton = screen.getByText('Fechar');
    fireEvent.click(closeButton);
    
    // O modal não deve mais estar visível
    expect(screen.queryByTestId('product-form')).not.toBeInTheDocument();
  });
}); 