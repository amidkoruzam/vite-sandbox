import { getCart } from "#root/src/shared/api/cart";
import { getProductById } from "#root/src/shared/api/get-product-by-id";
import { ProductObject } from "#root/src/shared/api/types";
import React from "react";

export type HeaderCartHookProps = {
  cartId: number;
  products: HeaderCartProduct[];
  totalPriceInCents: number;
  totalProductsAdded: number;
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

  const totalProductsAdded = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return {
    cartId: response.id,
    products,
    totalPriceInCents,
    totalProductsAdded,
  };
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

    const totalProductsAdded = products.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    setState({
      ...state,
      products,
      totalPriceInCents: total,
      totalProductsAdded,
    });
  };

  const increaseProductQuantity = (productId: number) => {
    const product = state.products.find(
      (item) => item.product.id === productId
    );

    changeProductQuantity({
      productId,
      quantity: (product?.quantity ?? 0) + 1,
    });
  };

  const addToCart = ({ product }: { product: ProductObject }) => {
    const centsPerItem = parseFloat(product.price) * 100;

    const products = state.products.concat({
      product: { ...product, centsPerItem },
      quantity: 1,
    });

    const totalPriceInCents = state.totalPriceInCents + centsPerItem;

    setState({
      ...state,
      products,
      totalPriceInCents,
      totalProductsAdded: state.totalProductsAdded + 1,
    });
  };

  const checkIsProductInCart = (productId: number) =>
    state.products.some((product) => product.product.id === productId);

  return {
    changeProductQuantity,
    addToCart,
    cart: state,
    checkIsProductInCart,
    increaseProductQuantity,
  };
};
