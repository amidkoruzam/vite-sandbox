import { getHeaderCart, HeaderCartHookProps } from "#root/src/features/cart";
import { getProducts } from "#root/src/shared/api/products";
import { ProductObject } from "#root/src/shared/api/types";

export type PageProps = {
  products: ProductObject[];
  cart: HeaderCartHookProps;
};

export const onBeforeRender = async () => {
  const [products, cart] = await Promise.all([getProducts(), getHeaderCart()]);

  const pageProps: PageProps = { products, cart };

  return {
    pageContext: {
      pageProps,
    },
  };
};

export const passToClient = ["pageProps"];
