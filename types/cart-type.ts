export type cartType = {
  _id: string;
  items: {
    product: {
      _id: string;
    };
    qty: number;
    store: {
      _id: string;
    };
  }[];
};

export type formattedCartType = {
  cartId: string;
  items: { productId: string; storeId: string; qty: number }[];
};
