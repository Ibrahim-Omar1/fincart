import {
  ApiResponse,
  AuthResponse,
  Category,
  CreateCategoryDTO,
  CreateProductDTO,
  CreateUserDTO,
  FileUploadResponse,
  LoginDTO,
  Product,
  ProductFilters,
  UpdateCategoryDTO,
  UpdateProductDTO,
  UpdateUserDTO,
  User,
} from '@/types/api';

const API_URL = 'https://api.escuelajs.co/api/v1';

// API Client Configuration
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function for API calls
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Products API
export const ProductsApi = {
  getAll: async (filters?: ProductFilters): Promise<ApiResponse<Product[]>> => {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return fetchApi<ApiResponse<Product[]>>(
      `/products?${queryParams.toString()}`,
    );
  },

  getById: async (id: number): Promise<Product> => {
    return fetchApi<Product>(`/products/${id}`);
  },

  create: async (data: CreateProductDTO): Promise<Product> => {
    return fetchApi<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: UpdateProductDTO): Promise<Product> => {
    return fetchApi<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<boolean> => {
    return fetchApi<boolean>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Categories API
export const CategoriesApi = {
  getAll: async (): Promise<Category[]> => {
    return fetchApi<Category[]>('/categories');
  },

  getById: async (id: number): Promise<Category> => {
    return fetchApi<Category>(`/categories/${id}`);
  },

  create: async (data: CreateCategoryDTO): Promise<Category> => {
    return fetchApi<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: UpdateCategoryDTO): Promise<Category> => {
    return fetchApi<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<boolean> => {
    return fetchApi<boolean>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Users API
export const UsersApi = {
  getAll: async (): Promise<User[]> => {
    return fetchApi<User[]>('/users');
  },

  getById: async (id: number): Promise<User> => {
    return fetchApi<User>(`/users/${id}`);
  },

  create: async (data: CreateUserDTO): Promise<User> => {
    return fetchApi<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: UpdateUserDTO): Promise<User> => {
    return fetchApi<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<boolean> => {
    return fetchApi<boolean>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API
export const AuthApi = {
  login: async (credentials: LoginDTO): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  profile: async (token: string): Promise<User> => {
    return fetchApi<User>('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// File Upload API
export const FileApi = {
  upload: async (file: File): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    return fetchApi<FileUploadResponse>('/files/upload', {
      method: 'POST',
      headers: {
        // Remove Content-Type header to let browser set it with boundary
        'Content-Type': undefined as any,
      },
      body: formData,
    });
  },
};
