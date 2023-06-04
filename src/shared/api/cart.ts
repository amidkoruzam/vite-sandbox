import { client } from "./client";
import { CartObject } from "./types";

export const getCart = () =>
  client("https://fakestoreapi.com/carts/user/1")
    .then((res) => res.json())
    .then((res) => res.at(-1) as CartObject);
