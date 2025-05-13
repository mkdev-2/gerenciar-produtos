import { NextResponse } from 'next/server';
import { Product, ProductFormData } from '@/app/types/product';
import { mockProductList } from '@/lib/mocks/mockData';

const mockProducts: Product[] = [...mockProductList];

export async function GET() {
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(mockProducts);
}

export async function POST(request: Request) {
  try {
    const productData = await request.json() as ProductFormData;
    
    const newProduct: Product = {
      id: Math.random().toString(36).substring(2, 11),
      ...productData,
      createdAt: new Date().toISOString(),
    };
    
    mockProducts.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('[API Route] Erro ao processar requisição POST:', error);
    return NextResponse.json(
      { error: 'Erro ao processar o produto' },
      { status: 400 }
    );
  }
} 