'use client';

import { useCurrencyInput } from '../hooks/useCurrencyInput';
import { useEffect, forwardRef, useImperativeHandle } from 'react';

interface CurrencyInputProps {
  id: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  initialValue?: number;
  className?: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export interface CurrencyInputRef {
  setValue: (value: number) => void;
  getValue: () => number;
}

const CurrencyInput = forwardRef<CurrencyInputRef, CurrencyInputProps>(function CurrencyInput(
  {
    id,
    label,
    required = false,
    placeholder = "0,00",
    initialValue = 0,
    className = "",
    onChange,
    disabled = false
  },
  ref
) {
  const currencyInput = useCurrencyInput({ initialValue });

  // Expor métodos através da ref
  useImperativeHandle(ref, () => ({
    setValue: (value: number) => {
      currencyInput.setValue(value);
    },
    getValue: () => currencyInput.numericValue
  }));

  // Notificar o componente pai sobre mudanças no valor
  useEffect(() => {
    if (onChange) {
      onChange(currencyInput.numericValue);
    }
  }, [currencyInput.numericValue, onChange]);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
          <span className="text-gray-500 text-sm sm:text-base">R$</span>
        </div>
        <input
          id={id}
          name={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          value={currencyInput.formattedValue}
          onChange={currencyInput.handleChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full pl-8 pr-2 py-2 border rounded-md border-gray-300 text-base ${className}`}
          style={{ fontSize: '16px', touchAction: 'manipulation' }}
        />
      </div>
    </div>
  );
});

export default CurrencyInput; 