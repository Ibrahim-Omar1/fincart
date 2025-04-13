// API Response Types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    total: number;
    limit: number;
  };
}

// Product Types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

// Category Types
export interface Category {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDTO {
  name: string;
  image: string;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {}
