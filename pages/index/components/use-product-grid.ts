import { ProductObject } from "#root/src/shared/api/types";

type Props = {
  addToCart: ({ product }: { product: ProductObject }) => void;
  products: ProductObject[];
  checkCartForProductQuantity: (productId: number) => number;
};

export const useProductGrid = ({
  addToCart,
  products,
  checkCartForProductQuantity,
}: Props) => {
  const items = products.map((p) => ({
    product: p,
    quantityInCart: checkCartForProductQuantity(p.id),
  }));

  const add = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) addToCart({ product });
  };

  return {
    products: items,
    addProductByIdToCart: add,
  };
};
