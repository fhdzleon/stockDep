
export interface ProductsResponse {
  Category: {
    name: string
  }
  id: string;
  sku: string;
  name: string;
  description: string;
  quantity: number;
  finalPrice: number;
  costPrice: number;
  expirationDate: string | null;
  minimumQuantity: number;
  activated: boolean;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}


// Server action return types
export type QueriesResponse = {
  data: ProductsResponse[];
  pagination?: {
    currentPage: number;
    totalPages: number;
  } | null;
  error?: string;
};

// For single contact queries
export type SingleQueryResponse = {
  data: ProductsResponse | null;
  error?: string;
};

// For mutation operations
export type MutationResponse = {
  success: boolean;
  data?: ProductsResponse;
  error?: string;
};


export interface ProductoProps {
  data: ProductsResponse;
  isActive: boolean;
  openModal: () => void;
  closeModal: () => void;
  custom: number
}



export type TopSoldProduct = {
  "productId": string,
  "product_name": string,
  "total_quantity": string
}

export type QueryFilterTopSoldProductResponse = {
  data: TopSoldProduct[]
  error?: string
}