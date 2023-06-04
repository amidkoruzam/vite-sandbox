export type ProductObject = {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartObject = {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
};
