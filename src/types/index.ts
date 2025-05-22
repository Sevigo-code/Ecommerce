export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PlantDiagnosis {
  disease: string;
  description: string;
  treatment: string;
  confidence: number;
}

export interface Category {
  id: number;
  name: string;
} 