import { useState } from 'react';
import { formatCurrencyInput, currencyStringToNumber } from '../utils/formatters';

interface UseCurrencyInputOptions {
  initialValue?: number;
}

export function useCurrencyInput({ initialValue = 0 }: UseCurrencyInputOptions = {}) {
  const [formattedValue, setFormattedValue] = useState(initialValue ? formatCurrencyInput(initialValue.toString()) : '');
  const numericValue = formattedValue ? currencyStringToNumber(formattedValue) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    
    // Garantir que estamos trabalhando com uma string
    value = String(value);
    
    // Remover R$ e espaços se existirem
    value = value.replace(/R\$\s?/gi, '');
    
    // Remove caracteres não numéricos, exceto vírgula e ponto
    value = value.replace(/[^\d,.]/g, '');
    
    // Converter qualquer ponto para vírgula
    value = value.replace(/\./g, ',');
    
    // Garantir apenas uma vírgula
    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts.slice(1).join('');
    }
    
    // Se o valor estiver vazio após a limpeza
    if (value === '' || value === ',') {
      setFormattedValue('');
      return;
    }
    
    // Trata o caso onde o valor começa com vírgula
    if (value.startsWith(',')) {
      value = '0' + value;
    }
    
    // Converte para um formato que a função formatCurrencyInput possa processar
    // 1,99 -> 199 / 1,9 -> 190
    let numericValue;
    
    if (value.includes(',')) {
      const [intPart, decPart] = value.split(',');
      // Ajustar casas decimais
      const decimalPart = decPart.length > 2 ? decPart.slice(0, 2) : decPart.padEnd(2, '0');
      numericValue = intPart + decimalPart;
    } else {
      // É um número inteiro, multiplica por 100
      numericValue = value + '00';
    }
    
    const formattedResult = formatCurrencyInput(numericValue);
    setFormattedValue(formattedResult);
  };

  const setValue = (value: number) => {
    if (value === 0) {
      setFormattedValue('');
      return;
    }
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