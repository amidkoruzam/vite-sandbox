import { Grid, Text, AppShell, Header } from "@mantine/core";
import { HeaderCart, useHeaderCart } from "#root/src/features/cart";
import { PageProps } from "./index.page.server";
import { ProductCard } from "./components/product-card";
import { useProductGrid } from "./components/use-product-grid";

export function Page(pageProps: PageProps) {
  const {
    cart,
    changeProductQuantity,
    addToCart,
    checkCartForProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useHeaderCart(pageProps.cart);

  const { products, addProductByIdToCart } = useProductGrid({
    addToCart,
    checkCartForProductQuantity,
    products: pageProps.products,
  });

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
          ({
            quantityInCart,
            product: { id, title, image, rating, price },
          }) => (
            <Grid.Col span={3} key={id}>
              <ProductCard
                id={id}
                image={image}
                rating={rating.rate}
                title={title}
                quantityInCart={quantityInCart}
                price={price}
                onAddToCart={addProductByIdToCart}
                onQuantityChange={changeProductQuantity}
                onQuantityDecrease={decreaseProductQuantity}
                onQuantityIncrease={increaseProductQuantity}
              />
            </Grid.Col>
          )
        )}
      </Grid>
    </AppShell>
  );
}
