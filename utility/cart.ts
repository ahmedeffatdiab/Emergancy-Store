
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


export interface CartProduct {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartType {
  selectedProduct: CartProduct[];
  totalPrice: number;
  totalQuantity: number;
}

