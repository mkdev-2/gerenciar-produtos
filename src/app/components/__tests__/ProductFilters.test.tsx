import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductFilters from '../ProductFilters';
import { SortOption } from '../../context/ProductContext';
import { jsx } from 'react/jsx-runtime';

// Mock do hook useProducts
jest.mock('@/app/context/ProductContext', () => {
  const setNameFilterMock = jest.fn();
  const setPriceRangeMock = jest.fn();
  const setSortOptionMock = jest.fn();
  
  return {
    useProducts: jest.fn(() => ({
      nameFilter: '',
      minPrice: null,
      maxPrice: null,
      sortOption: 'recent' as SortOption,
      setNameFilter: setNameFilterMock,
      setPriceRange: setPriceRangeMock,
      setSortOption: setSortOptionMock
    })),
    SortOption: {
      NAME_ASC: 'name-asc',
      NAME_DESC: 'name-desc',
      PRICE_ASC: 'price-asc',
      PRICE_DESC: 'price-desc',
      RECENT: 'recent'
    }
  };
});

// Mock do hook personalizado useCurrencyInput
jest.mock('@/app/hooks/useCurrencyInput', () => {
  return {
    useCurrencyInput: ({ initialValue = 0 } = {}) => ({
      formattedValue: initialValue === 0 ? 'R$ 0,00' : `R$ ${initialValue},00`,
      numericValue: initialValue,
      handleChange: jest.fn(),
      setValue: jest.fn()
    })
  };
});

// Constantes para teste
const TEST_SEARCH_TERM = 'smartphone';

describe('ProductFilters', () => {
  const useProductsMock = require('@/app/context/ProductContext').useProducts;
  const setNameFilterMock = jest.fn();
  
  beforeEach(() => {
    // Limpa mocks entre os testes
    jest.clearAllMocks();
    
    // Configura mocks com implementações frescas
    useProductsMock.mockReturnValue({
      nameFilter: '',
      minPrice: null,
      maxPrice: null,
      sortOption: 'recent',
      setNameFilter: setNameFilterMock,
      setPriceRange: jest.fn(),
      setSortOption: jest.fn()
    });
  });

  it('deve renderizar todos os filtros corretamente', () => {
    render(jsx(ProductFilters, {}));
    
    // Verifica se os elementos principais estão presentes
    expect(screen.getByLabelText(/buscar produtos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço mínimo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço máximo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ordenar por/i)).toBeInTheDocument();
  });

  it('deve chamar setNameFilter quando o input de busca é alterado', async () => {
    // Setup fake timers para avançar o tempo do debounce
    jest.useFakeTimers();
    
    render(jsx(ProductFilters, {}));
    
    const searchInput = screen.getByLabelText(/buscar produtos/i);
    fireEvent.change(searchInput, { target: { value: TEST_SEARCH_TERM } });
    
    // Avançar o tempo para permitir que o debounce seja acionado (500ms + margem)
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Verificar se a função foi chamada após o debounce
    expect(setNameFilterMock).toHaveBeenCalledWith(TEST_SEARCH_TERM);
    
    // Limpar timers
    jest.useRealTimers();
  });

  it('deve chamar setSortOption quando a opção de ordenação é alterada', () => {
    const setSortOptionMock = jest.fn();
    useProductsMock.mockReturnValue({
      nameFilter: '',
      minPrice: null,
      maxPrice: null,
      sortOption: 'recent',
      setNameFilter: jest.fn(),
      setPriceRange: jest.fn(),
      setSortOption: setSortOptionMock
    });

    render(jsx(ProductFilters, {}));
    
    const sortSelect = screen.getByLabelText(/ordenar por/i);
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });
    
    expect(setSortOptionMock).toHaveBeenCalledWith('price-asc');
  });

  it('deve exibir os valores atuais dos filtros', () => {
    useProductsMock.mockReturnValue({
      nameFilter: 'teste',
      minPrice: 10,
      maxPrice: 100,
      sortOption: 'name-asc',
      setNameFilter: jest.fn(),
      setPriceRange: jest.fn(),
      setSortOption: jest.fn()
    });

    render(jsx(ProductFilters, {}));
    
    const searchInput = screen.getByLabelText(/buscar produtos/i);
    expect(searchInput).toHaveValue('teste');
    
    const sortSelect = screen.getByLabelText(/ordenar por/i);
    expect(sortSelect).toHaveValue('name-asc');
  });
}); 