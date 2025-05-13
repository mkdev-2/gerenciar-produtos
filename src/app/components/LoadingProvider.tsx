'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Função para verificar se todas as imagens foram carregadas
    const checkImagesLoaded = () => {
      // Tempo mínimo que o preloader deve ser mostrado (1.5 segundos)
      const minLoadingTime = 1500;
      const startTime = Date.now();
      
      // Aguarda o DOM ser completamente carregado
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMLoaded);
      } else {
        onDOMLoaded();
      }
      
      function onDOMLoaded() {
        // Remove o event listener para evitar chamadas duplicadas
        document.removeEventListener('DOMContentLoaded', onDOMLoaded);
        
        const images = Array.from(document.querySelectorAll('img'));
        const totalImages = images.length;
        
        // Se não houver imagens, aguardar somente o tempo mínimo
        if (images.length === 0) {
          const timeElapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - timeElapsed);
          
          setTimeout(() => {
            setIsLoading(false);
          }, remainingTime);
          return;
        }
        
        // Contador de imagens carregadas
        let loadedImages = 0;
        
        // Marcar como carregada cada imagem
        const onImageLoad = () => {
          loadedImages++;
          
          // Verifica se todas as imagens foram carregadas
          if (loadedImages === totalImages) {
            const timeElapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadingTime - timeElapsed);
            
            // Aguarda pelo menos o tempo mínimo antes de remover o preloader
            setTimeout(() => {
              setIsLoading(false);
            }, remainingTime);
          }
        };
        
        // Adiciona os listeners para cada imagem
        images.forEach(img => {
          // Se a imagem já estiver carregada (do cache)
          if (img.complete) {
            onImageLoad();
          } else {
            // Se a imagem ainda não estiver carregada
            img.addEventListener('load', onImageLoad);
            // Caso ocorra erro no carregamento, contabiliza mesmo assim
            img.addEventListener('error', onImageLoad);
          }
        });
      }
    };
    
    // Iniciar a verificação
    checkImagesLoaded();
    
    // Backup: se algo não funcionar após 10s, remover o preloader de qualquer forma
    const backupTimer = setTimeout(() => setIsLoading(false), 10000);
    
    return () => {
      clearTimeout(backupTimer);
    };
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