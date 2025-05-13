export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
} 