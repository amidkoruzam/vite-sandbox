import { getCart } from "#root/src/shared/api/cart";
import { getProductById } from "#root/src/shared/api/get-product-by-id";
import { ProductObject } from "#root/src/shared/api/types";
import React from "react";

export type HeaderCartHookProps = {
  cartId: number;
  products: HeaderCartProduct[];
  totalPriceInCents: number;
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

  const totalPriceInCents = products.reduce(
    (acc, product) => acc + product.quantity * product.product.centsPerItem,
    0
  );

  return { cartId: response.id, products, totalPriceInCents };
};

export const useHeaderCart = (cart: HeaderCartHookProps) => {
  const [state, setState] = React.useState(cart);

  const changeProductQuantity = ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => {
    const products = state.products.map((item) =>
      productId === item.product.id ? { ...item, quantity } : item
    );

    const total = products.reduce(
      (acc, item) => acc + item.product.centsPerItem * item.quantity,
      0
    );

    setState({ ...state, products, totalPriceInCents: total });
  };

  const addToCart = ({ productId }: { productId: number }) => {
    const product = cart.products.find(
      ({ product }) => product.id === productId
    );
    console.log(product);
  };

  return { changeProductQuantity, addToCart, cart: state };
};
