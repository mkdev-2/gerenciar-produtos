import { useState, useEffect } from 'react';
import { formatCurrencyInput, currencyStringToNumber } from '../utils/formatters';

interface UseCurrencyInputOptions {
  initialValue?: number;
}

export function useCurrencyInput({ initialValue = 0 }: UseCurrencyInputOptions = {}) {
  const [formattedValue, setFormattedValue] = useState('');
  
  // Inicializa o valor formatado quando o componente é montado
  useEffect(() => {
    if (initialValue) {
      // Converte para centavos (multiplicando por 100) e depois para string
      const valueInCents = Math.round(initialValue * 100).toString();
      setFormattedValue(formatCurrencyInput(valueInCents));
    }
  }, [initialValue]);

  // Calcula o valor numérico a partir do valor formatado
  const numericValue = formattedValue ? currencyStringToNumber(formattedValue) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Remove tudo que não for dígito
    const onlyNumbers = value.replace(/[^\d]/g, '');
    
    if (onlyNumbers === '') {
      setFormattedValue('');
      return;
    }
    
    const formattedResult = formatCurrencyInput(onlyNumbers);
    setFormattedValue(formattedResult);
  };

  const setValue = (value: number) => {
    if (value === 0) {
      setFormattedValue('');
      return;
    }
    
    // Converte para centavos (multiplicando por 100) e depois para string
    const valueInCents = Math.round(value * 100).toString();
    setFormattedValue(formatCurrencyInput(valueInCents));
  };

  return {
    formattedValue,
    numericValue,
    handleChange,
    setValue
  };
}

export default useCurrencyInput; 