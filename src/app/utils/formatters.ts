export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatCurrencyInput(value: string): string {
  // Garantir que estamos trabalhando com uma string
  const inputValue = String(value);
  
  // Limpar qualquer caracter não numérico
  const numericValue = inputValue.replace(/\D/g, '');
  
  if (!numericValue) return '';
  
  // Converter para centavos
  const cents = parseInt(numericValue, 10);
  
  // Converter para reais (dividir por 100)
  const reais = cents / 100;
  
  try {
    // Formatar usando o Intl.NumberFormat
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(reais);
  } catch (error) {
    // Fallback manual se o Intl.NumberFormat falhar
    const fixedValue = reais.toFixed(2).replace('.', ',');
    if (reais >= 1000) {
      // Adicionar pontos para milhares
      const parts = fixedValue.split(',');
      const integerPart = parts[0];
      const formattedInteger = integerPart
        .split('')
        .reverse()
        .reduce((acc, digit, i) => {
          const shouldAddDot = i > 0 && i % 3 === 0;
          return shouldAddDot ? `${digit}.${acc}` : `${digit}${acc}`;
        }, '');
      return `${formattedInteger},${parts[1]}`;
    }
    return fixedValue;
  }
}

export function currencyStringToNumber(value: string): number {
  if (!value) return 0;
  
  // Garantir que estamos trabalhando com uma string
  const inputValue = String(value);
  
  // Remover todos os pontos e substituir vírgula por ponto
  const numericString = inputValue.replace(/\./g, '').replace(',', '.');
  
  // Converter para número
  const result = parseFloat(numericString);
  
  // Retornar 0 se não for um número válido
  return isNaN(result) ? 0 : result;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}