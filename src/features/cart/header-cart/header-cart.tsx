import React from "react";
import { Box, Button, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { CartDrawer } from "./cart-drawer";
import { HeaderCartProduct } from "./model";

type Props = {
  totalProducts: number;
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
  totalProducts,
  items,
  totalPrice,
  changeProductQuantity,
}: Props) => {
  const [isCartDrawerVisible, setCartDrawerVisible] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        leftIcon={<IconShoppingCart size="1rem" />}
        onClick={() => setCartDrawerVisible(true)}
      >
        <Box>
          <Text>
            {totalProducts} items, {totalPrice / 100}$
          </Text>
        </Box>
      </Button>

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
