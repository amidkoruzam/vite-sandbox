import {
  Box,
  Button,
  Drawer,
  Flex,
  Image,
  NumberInput,
  Text,
} from "@mantine/core";
import { HeaderCartProduct } from "./model";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: HeaderCartProduct[];
  totalPrice: number;
};

export const CartDrawer = ({ isOpen, onClose, totalPrice, items }: Props) => {
  return (
    <Drawer opened={isOpen} onClose={onClose} title="Cart">
      <Flex justify={"space-between"} align={"center"}>
        <Button component="a" href="/">
          Checkout
        </Button>

        <Text fw="bold" size="lg">
          Total: {totalPrice / 100}$
        </Text>
      </Flex>

      <Box sx={{ marginTop: 30 }}>
        {items.map(({ product, quantity }, index) => (
          <Flex
            key={index}
            align={"stretch"}
            sx={{
              padding: 10,
              borderTop: index === 0 ? "1px solid grey" : "",
              borderBottom: "1px solid grey",
            }}
          >
            <Box sx={{ alignSelf: "center" }}>
              <Image fit="contain" src={product.image} height={75} width={75} />
            </Box>

            <Box sx={{ width: 175, marginLeft: 10 }}>
              <Text size="xs">{product.title}</Text>

              <Box sx={{ marginTop: 10 }}>
                <Text size="xs">{product.category}</Text>
                <Text size="xs">{product.price}$</Text>
              </Box>
            </Box>

            <Box
              ml="auto"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box w={75}>
                <NumberInput min={1} value={quantity} />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Text size="xs">
                  Total: {(quantity * product.centsPerItem) / 100}$
                </Text>
              </Box>
            </Box>
          </Flex>
        ))}
      </Box>
    </Drawer>
  );
};
