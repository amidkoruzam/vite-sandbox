import { getCart } from "#root/src/shared/api/cart";
import { getProductById } from "#root/src/shared/api/get-product-by-id";
import { ProductObject } from "#root/src/shared/api/types";

type Props = {
  cartId: number;
  products: ProductObject[];
};

export const getHeaderCart = async () => {
  const response = await getCart();
  const products = await Promise.all([
    response.products.map(({ productId }) => getProductById(productId)),
  ]);

  return { ...response, products };
};

export const useHeaderCart = (cart: Props) => {
  const addToCart = ({ productId }: { productId: number }) => {
    const product = cart.products.find((product) => product.id === productId);
    console.log(product);
  };

  return { addToCart };
};
