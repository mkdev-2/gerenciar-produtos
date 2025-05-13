import { Product } from '@/app/types/product';

export const mockProductList: Product[] = [
  {
    id: '1',
    name: 'Desenvolvimento Web',
    price: 5000.00,
    description: 'Serviço completo de desenvolvimento de websites responsivos',
    category: 'Desenvolvimento',
    imageUrl: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=3540&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Hospedagem Cloud',
    price: 199.90,
    description: 'Serviço de hospedagem em nuvem com alta disponibilidade',
    category: 'Infraestrutura',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3015&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Consultoria em TI',
    price: 3500.00,
    description: 'Consultoria especializada para transformação digital',
    category: 'Consultoria',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=3540&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Suporte Técnico',
    price: 899.90,
    description: 'Suporte técnico mensal para infraestrutura de TI',
    category: 'Suporte',
    imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=3540&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Design UX/UI',
    price: 2800.00,
    description: 'Design de interfaces para aplicações web e mobile',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=3164&auto=format&fit=crop',
    createdAt: new Date().toISOString(),
  }
];