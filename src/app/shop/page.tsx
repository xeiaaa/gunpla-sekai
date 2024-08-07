import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import { ProductShort } from "../../types";
import Image from "next/image";
import { formatNumberString } from "../customize/helpers";

export default async function ShopPage() {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/products"
  );

  return (
    <div>
      <SimpleGrid cols={4}>
        {products.map((product: ProductShort) => {
          return (
            <Card
              key={product.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder>
              <Box
                style={{
                  height: 300,
                  position: "relative",
                }}>
                <Image
                  src={product.image.src}
                  fill
                  alt={`${product.title} art`}
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{product.title}</Text>
                {/* <Badge color="pink">On Sale</Badge> */}
              </Group>
              <Text fw={500}>
                ₱{formatNumberString(product.variants[0].price)}
              </Text>

              <Text size="sm" c="dimmed">
                {/* <div
                  dangerouslySetInnerHTML={{ __html: product.body_html }}></div> */}
              </Text>

              {/* <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
              </Button> */}
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
