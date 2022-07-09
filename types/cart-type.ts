export type cartType = {
  _id: string;
  items: {
    _id: string;
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
  items: { productId: string; storeId: string; qty: number; itemId: string }[];
};

export type addToCartMutationType = {
  product: {
    _id: string;
  };
  qty: number;
};

export type addToCartResponseType = {
  cartId?: string;
  item: {
    productId: string;
    qty: number;
  };
  coordinates: any[];
};

export type updateCartMutationType = {
  itemId: string;
  qty: number;
};

export type deleteCartItemMutationType = {
  itemId: string;
  cartId: string;
};

export type checkoutDetailsType = {
  address: string;
  paymentMethod: "FLUTTERWAVE" | "WALLET";
  note?: string;
  instantDelivery: boolean;
  eta?: string;
  voucher?: string;
  cartId: string;
};
