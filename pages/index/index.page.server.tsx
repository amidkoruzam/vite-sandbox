import { getProducts } from "#root/src/shared/api/products";
import { ProductObject } from "#root/src/shared/api/types";

export type PageProps = {
  products: ProductObject[];
};

export const onBeforeRender = async () => {
  const products = await getProducts();

  const pageProps: PageProps = { products };

  return {
    pageContext: {
      pageProps,
    },
  };
};

export const passToClient = ["pageProps"];
