import { client } from "./client";
import { ProductObject } from "./types";

export const getProducts = () =>
  client("https://fakestoreapi.com/products").then(
    (res) => res.json() as Promise<ProductObject[]>
  );
