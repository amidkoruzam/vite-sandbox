import { client } from "./client";
import { ProductObject } from "./types";

export const getProductById = (id: number) =>
  client(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json() as Promise<ProductObject>
  );
