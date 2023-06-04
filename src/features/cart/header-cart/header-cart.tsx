import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { CartDrawer } from "./cart-drawer";

type Props = {
  items: unknown[];
};

export const HeaderCart = ({ items }: Props) => {
  const [isCartDrawerVisible, setCartDrawerVisible] = React.useState(false);

  return (
    <>
      <ActionIcon size="xl" onClick={() => setCartDrawerVisible(true)}>
        <IconShoppingCart />
      </ActionIcon>

      <CartDrawer
        isOpen={isCartDrawerVisible}
        items={items}
        onClose={() => setCartDrawerVisible(false)}
      />
    </>
  );
};
