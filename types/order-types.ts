export type orderListType = {
  food: string;
  foodImage: string;
  quantity: number;
  price: number;
  orderId: number;
  others: { food: string; quantity: number }[] | any[];
};
