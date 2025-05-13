import { Product, ProductFormData } from '../types/product';

class ProductApiService {
  private baseUrl = '/api';

  getProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${this.baseUrl}/products`);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Sem detalhes disponíveis');
        console.error(`[API] Resposta não-OK: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Falha ao obter produtos: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('[API] Erro ao buscar produtos:', error);
      throw error;
    }
  }

  createProduct = async (productData: ProductFormData): Promise<Product> => {
    try {
      const response = await fetch(`${this.baseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Sem detalhes disponíveis');
        console.error(`[API] Resposta não-OK: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`Falha ao criar produto: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('[API] Erro ao criar produto:', error);
      throw error;
    }
  }
}

export const productApi = new ProductApiService(); 