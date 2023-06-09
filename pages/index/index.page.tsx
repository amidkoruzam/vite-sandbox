import {
  Card,
  Image,
  Grid,
  Text,
  Box,
  Button,
  Rating,
  AppShell,
  Header,
  Flex,
} from "@mantine/core";
import { HeaderCart, useHeaderCart } from "#root/src/features/cart";
import { PageProps } from "./index.page.server";

export function Page(pageProps: PageProps) {
  const {
    cart,
    changeProductQuantity,
    addToCart,
    checkIsProductInCart,
    increaseProductQuantity,
  } = useHeaderCart(pageProps.cart);

  const products = pageProps.products.map((product) => ({
    ...product,
    addedToCart: checkIsProductInCart(product.id),
  }));

  return (
    <AppShell
      header={
        <Header
          height={60}
          p="xs"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            sx={{ textDecoration: "none" }}
            component="a"
            href="/"
            fz="xl"
            fw="bold"
          >
            Daily Deals
          </Text>

          <HeaderCart
            changeProductQuantity={changeProductQuantity}
            totalPrice={cart.totalPriceInCents}
            items={cart.products}
            totalProducts={cart.totalProductsAdded}
          />
        </Header>
      }
    >
      <Grid align="stretch">
        {products.map(
          ({ id, title, image, rating, addedToCart, price }, index) => (
            <Grid.Col span={3} key={id}>
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
                  <Image
                    height={180}
                    fit="contain"
                    src={image}
                    alt={title}
                  ></Image>
                </Box>

                <Flex direction={"column"} mt="md" mb="xs">
                  <Text size="xs">{title}</Text>
                  <Box mt="xs" mb="xs">
                    <Text size="xs">{price}$</Text>
                  </Box>
                  <Rating value={rating.rate} readOnly />
                </Flex>

                <Box mt="auto">
                  <Button
                    fullWidth
                    onClick={() =>
                      addedToCart
                        ? increaseProductQuantity(id)
                        : addToCart({ product: pageProps.products[index] })
                    }
                  >
                    Add to cart
                  </Button>
                </Box>
              </Card>
            </Grid.Col>
          )
        )}
      </Grid>
    </AppShell>
  );
}
