'use client';

import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const renderCategoryBadge = (category: string) => {
    // Definir cores específicas para cada categoria
    const colorMap: Record<string, string> = {
      'Desenvolvimento': 'bg-blue-100 text-blue-800',
      'Infraestrutura': 'bg-purple-100 text-purple-800',
      'Consultoria': 'bg-green-100 text-green-800',
      'Suporte': 'bg-yellow-100 text-yellow-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Marketing': 'bg-orange-100 text-orange-800',
    };
    
    const colorClass = colorMap[category] || 'bg-gray-100 text-gray-800';
    
    return (
      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${colorClass}`}>
        {category}
      </span>
    );
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-200 h-full flex flex-col">
      <div className="relative h-40 sm:h-48">
        <img
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
      </div>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="mb-1 sm:mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <div className="flex-shrink-0">
            {renderCategoryBadge(product.category)}
          </div>
        </div>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 flex-grow line-clamp-3">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}