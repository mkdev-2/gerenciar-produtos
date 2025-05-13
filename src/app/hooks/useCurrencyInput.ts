import { useState } from 'react';
import { formatCurrencyInput, currencyStringToNumber } from '../utils/formatters';

interface UseCurrencyInputOptions {
  initialValue?: number;
}

export function useCurrencyInput({ initialValue = 0 }: UseCurrencyInputOptions = {}) {
  const [formattedValue, setFormattedValue] = useState(initialValue ? formatCurrencyInput(initialValue.toString()) : '');
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
    setFormattedValue(formatCurrencyInput(value.toString()));
  };

  return {
    formattedValue,
    numericValue,
    handleChange,
    setValue
  };
}

export default useCurrencyInput; 