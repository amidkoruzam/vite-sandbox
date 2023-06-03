import {
  Card,
  Image,
  Grid,
  Text,
  Group,
  Box,
  Button,
  Rating,
  AppShell,
  Header,
} from "@mantine/core";
import { PageProps } from "./index.page.server";

export function Page(pageProps: PageProps) {
  return (
    <AppShell
      header={
        <Header height={60} p="xs">
          <Text
            sx={{ textDecoration: "none" }}
            component="a"
            href="/"
            fz="xl"
            fw="bold"
          >
            Daily Deals
          </Text>
        </Header>
      }
    >
      <Grid align="stretch">
        {pageProps.products.map(({ id, title, image, rating }) => (
          <Grid.Col span={3} key={id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
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

              <Group position="apart" mt="md" mb="xs">
                <Text size="xs">{title}</Text>
                <Rating value={rating.rate} readOnly />
              </Group>

              <Box mt="auto">
                <Button>Add to cart</Button>
              </Box>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </AppShell>
  );
}
