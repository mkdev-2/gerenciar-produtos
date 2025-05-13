import { http, HttpResponse } from 'msw';
import { mockProductList } from './mockData';
import { ProductFormData } from '@/app/types/product';

export const handlers = [
  // Pega todos os produtos
  http.get('/api/products', () => {
    return HttpResponse.json(mockProductList);
  }),

  // Cria um novo produto
  http.post('/api/products', async ({ request }) => {
    const data = await request.json() as ProductFormData;
    const newProduct = {
      ...data,
      id: `${Date.now()}`, // ID simples baseado em timestamp
      createdAt: new Date().toISOString()
    };
    
    return HttpResponse.json(newProduct, { status: 201 });
  })
];