'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageStatus, setImageStatus] = useState('Iniciando carregamento...');
  
  // Função para observar o carregamento de imagens
  const trackImageLoading = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Inicia observando imagens após o DOM estar pronto
    const checkForImages = () => {
      // Função que será chamada periodicamente para atualizar o status
      const updateImageStatus = () => {
        const allImages = document.querySelectorAll('img');
        const totalImages = allImages.length;
        
        if (totalImages === 0) {
          setProgress(95); // Avanço rápido se não há imagens
          setImageStatus('Quase pronto...');
          return;
        }
        
        // Conta quantas imagens estão carregadas
        let loadedCount = 0;
        allImages.forEach(img => {
          if (img.complete) loadedCount++;
        });
        
        // Calcula a porcentagem de imagens carregadas
        const loadedPercent = Math.min(95, Math.round((loadedCount / totalImages) * 100));
        setProgress(loadedPercent);
        
        if (loadedCount === 0) {
          setImageStatus('Carregando recursos...');
        } else if (loadedCount < totalImages) {
          setImageStatus(`Carregando imagens (${loadedCount}/${totalImages})...`);
        } else {
          setImageStatus('Finalizando...');
        }
      };
      
      // Atualiza o status a cada 200ms
      const statusInterval = setInterval(updateImageStatus, 200);
      
      // Limpa o intervalo quando o componente for desmontado
      return () => clearInterval(statusInterval);
    };
    
    // Verifica se o DOM já está pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const cleanup = checkForImages();
        return cleanup;
      }, { once: true });
    } else {
      return checkForImages();
    }
  }, []);
  
  useEffect(() => {
    // Inicia rastreamento de imagens
    const cleanup = trackImageLoading();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [trackImageLoading]);
  
  useEffect(() => {
    // Garantir que o progresso avance pelo menos um pouco, mesmo sem imagens
    const initialProgressTimer = setTimeout(() => {
      setProgress(prev => Math.max(prev, 10));
    }, 300);
    
    return () => clearTimeout(initialProgressTimer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative mb-8">
        {/* Logo da aplicação */}
        <Image 
          src="/logo.svg" 
          alt="Logo do Gerenciador de Produtos" 
          width={80} 
          height={80} 
          className="mb-4 animate-pulse" 
          priority // Carrega esta imagem com prioridade
        />
      </div>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-gray-700 font-medium">
          {progress}% Concluído
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {imageStatus}
        </div>
      </div>
    </div>
  );
} 