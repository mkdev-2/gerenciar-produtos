'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular um progresso de carregamento
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        return newProgress <= 100 ? newProgress : 100;
      });
    }, 100);

    // Simular um tempo de carregamento mínimo para garantir que o preloader seja visto
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Pequeno delay após chegar a 100% antes de remover o preloader
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
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
        />
      </div>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-center text-gray-700 font-medium">
        {progress}% Carregado
      </div>
    </div>
  );
} 