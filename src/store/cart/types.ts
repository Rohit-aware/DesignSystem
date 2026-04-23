export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartState = {
  items: Record<string, CartItem>;
  addToCart: (product: { id: string; title: string; price: number; image: string }) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
};

export type CartItemsSelector = Record<string, CartItem>;
