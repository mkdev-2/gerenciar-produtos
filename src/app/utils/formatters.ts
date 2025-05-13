export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatCurrencyInput(value: string): string {
  const numericValue = value.replace(/\D/g, '');
  
  if (!numericValue) return '';
  
  const paddedValue = numericValue.padStart(3, '0');
  
  const reais = parseInt(paddedValue.slice(0, -2));
  
  const centavos = paddedValue.slice(-2);
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(`${reais}.${centavos}`));
}

export function currencyStringToNumber(value: string): number {
  const numericString = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(numericString) || 0;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}