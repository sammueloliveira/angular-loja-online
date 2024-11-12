export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product {
  name: string;
  price: number | null;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}

export interface Cart {
  name: string;
  price: number | null;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  productId: number;
}

export interface PriceSomary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface Order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: number;
  id: number | undefined
}
