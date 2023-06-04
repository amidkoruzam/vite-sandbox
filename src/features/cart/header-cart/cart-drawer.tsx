import { Box, Button, Drawer, Stack } from "@mantine/core";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: unknown[];
};

export const CartDrawer = ({ isOpen, onClose, items }: Props) => {
  return (
    <Drawer opened={isOpen} onClose={onClose} title="Cart">
      <Button component="a" href="/">
        Checkout
      </Button>

      <Stack>
        {items.map((_, index) => (
          <Box>{index}</Box>
        ))}
      </Stack>
    </Drawer>
  );
};
