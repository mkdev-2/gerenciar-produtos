'use client';

import { useEffect, useState } from 'react';

/**
 * Hook customizado que ajusta o número de itens por página
 * com base no tamanho da tela
 * 
 * @returns {number} Número de itens para exibir por página
 */
export function useResponsiveItemsPerPage(): number {
  // Valor padrão para SSR e renderização inicial
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    // Essa função só roda no lado do cliente
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setItemsPerPage(4); // Mobile
        } else if (window.innerWidth < 1024) {
          setItemsPerPage(6); // Tablet
        } else {
          setItemsPerPage(8); // Desktop
        }
      }
    };

    // Verifica se está no navegador antes de adicionar o listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      // Configuração inicial
      handleResize();

      // Limpeza do listener quando o componente desmontar
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return itemsPerPage;
} 