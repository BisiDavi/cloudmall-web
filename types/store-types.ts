export type storeType = {
  _id: string;
  name: string;
  isCurrentlyOpen: boolean;
  shoppingType: string;
  address?: string;
  logo: string;
  category: {
    name: string;
  };
};

export type storeCategoryType = {
  name: string;
  _id: string;
}; 