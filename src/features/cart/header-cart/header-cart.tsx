import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { CartDrawer } from "./cart-drawer";
import { HeaderCartProduct } from "./model";

type Props = {
  items: HeaderCartProduct[];
  totalPrice: number;
  changeProductQuantity: ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => void;
};

export const HeaderCart = ({
  items,
  totalPrice,
  changeProductQuantity,
}: Props) => {
  const [isCartDrawerVisible, setCartDrawerVisible] = React.useState(false);

  return (
    <>
      <ActionIcon size="xl" onClick={() => setCartDrawerVisible(true)}>
        <IconShoppingCart />
      </ActionIcon>

      <CartDrawer
        isOpen={isCartDrawerVisible}
        changeProductQuantity={changeProductQuantity}
        items={items}
        totalPrice={totalPrice}
        onClose={() => setCartDrawerVisible(false)}
      />
    </>
  );
};
