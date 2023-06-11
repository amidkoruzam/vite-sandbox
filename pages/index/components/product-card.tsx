import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Image,
  NumberInput,
  Rating,
  Text,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import React from "react";

export type ProductCardProps = {
  id: number;
  title: string;
  image: string;
  price: string;
  rating: number;
  quantityInCart: number;

  onQuantityDecrease: (id: number) => void;
  onQuantityIncrease: (id: number) => void;
  onQuantityChange: ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => void;
  onAddToCart: (id: number) => void;
};

export const ProductCard = React.memo(
  ({
    id,
    title,
    image,
    price,
    rating,
    quantityInCart,
    onQuantityDecrease,
    onQuantityIncrease,
    onQuantityChange,
    onAddToCart,
  }: ProductCardProps) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Box mx="auto" sx={{ width: "80%" }}>
        <Image height={180} fit="contain" src={image} alt={title}></Image>
      </Box>

      <Flex direction={"column"} mt="md" mb="xs">
        <Text size="xs">{title}</Text>
        <Box mt="xs" mb="xs">
          <Text size="xs">{price}$</Text>
        </Box>
        <Rating value={rating} readOnly />
      </Flex>

      <Box mt="auto">
        {quantityInCart > 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActionIcon onClick={() => onQuantityDecrease(id)}>
              <IconMinus />
            </ActionIcon>
            <NumberInput
              value={quantityInCart}
              mx={10}
              hideControls
              styles={{ input: { width: 50, textAlign: "center" } }}
              min={0}
              onChange={(quantity) =>
                onQuantityChange({ id, quantity: quantity || 0 })
              }
            />
            <ActionIcon onClick={() => onQuantityIncrease(id)}>
              <IconPlus />
            </ActionIcon>
          </Box>
        ) : (
          <Button fullWidth onClick={() => onAddToCart(id)}>
            Add to cart
          </Button>
        )}
      </Box>
    </Card>
  )
);
