'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detectar quando a página estiver completamente carregada
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      const handleLoad = () => setIsLoading(false);
      window.addEventListener('load', handleLoad);
      
      // Backup: se o evento load não disparar após 3s, remover o preloader
      const timer = setTimeout(() => setIsLoading(false), 3000);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      <div className={`${isLoading ? 'invisible' : 'visible fade-in'}`}>
        {children}
      </div>
    </>
  );
} 