import { useState, useEffect } from 'react';

interface ValidationRules {
  [key: string]: (value: any, formValues?: any) => string | undefined;
}

export function useForm<T extends Record<string, any>>({ 
  initialValues, 
  validationRules = {}, 
  onSubmit 
}: { 
  initialValues: T; 
  validationRules?: ValidationRules; 
  onSubmit: (values: T) => void 
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: any): string | undefined => {
    if (validationRules[name]) {
      return validationRules[name](value, values);
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    // Valida o formulário
    const isValid = validateForm();
    
    if (isValid) {
      onSubmit(values);
    }
  };

  const setFieldValue = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm
  };
}

export default useForm; 