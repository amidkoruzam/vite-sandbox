import { getCart } from "#root/src/shared/api/cart";
import { getProductById } from "#root/src/shared/api/get-product-by-id";
import { ProductObject } from "#root/src/shared/api/types";

export type HeaderCartHookProps = {
  cartId: number;
  products: HeaderCartProduct[];
};

export type HeaderCartProduct = {
  product: ProductObject & { centsPerItem: number };
  quantity: number;
};

export const getHeaderCart = async () => {
  const response = await getCart();
  const products = await Promise.all(
    response.products.map(async ({ productId, quantity }) => {
      const product = await getProductById(productId);
      const centsPerItem = parseFloat(product.price) * 100;
      return { product: { ...product, centsPerItem }, quantity };
    })
  );

  return { cartId: response.id, products };
};

export const useHeaderCart = (cart: HeaderCartHookProps) => {
  const addToCart = ({ productId }: { productId: number }) => {
    const product = cart.products.find(
      ({ product }) => product.id === productId
    );
    console.log(product);
  };

  return { addToCart };
};
