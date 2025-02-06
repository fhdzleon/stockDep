export interface MovementItem {
  Product: {
    name: string
  }
  id: string,
  sku: string,
  name: string,
  type: string,
  motive: string,
  movQuantity: number,
  userId: string,
  productId: string,
  createdAt: string,
  updatedAt: string
}

export type QuerieMovementResponse = {
  data: MovementItem[];
  error?: string;
};

export type SingleQueryMovementResponse = {
  data: MovementItem | null;
  error?: string;
};

export type MutationMovementResponse = {
  success: boolean;
  data?: MovementItem;
  error?: string;
};