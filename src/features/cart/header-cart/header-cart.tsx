import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { CartDrawer } from "./cart-drawer";
import { HeaderCartProduct } from "./model";

type Props = {
  items: HeaderCartProduct[];
  totalPrice: number;
};

export const HeaderCart = ({ items, totalPrice }: Props) => {
  const [isCartDrawerVisible, setCartDrawerVisible] = React.useState(false);

  return (
    <>
      <ActionIcon size="xl" onClick={() => setCartDrawerVisible(true)}>
        <IconShoppingCart />
      </ActionIcon>

      <CartDrawer
        isOpen={isCartDrawerVisible}
        items={items}
        totalPrice={totalPrice}
        onClose={() => setCartDrawerVisible(false)}
      />
    </>
  );
};
