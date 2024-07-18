"use client";
import { Title, Text, Container, Button, Flex } from "@mantine/core";
import classes from "./page.module.css";

export default function HomePage() {
  return (
    <div className={classes.root}>
      <Container size="lg" pos="relative">
        <Flex>
          <div className={classes.content}>
            <Title className={classes.title}>
              Dedicated to
              <br />
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "#B23634", to: "#F5D34B" }}>
                Gunpla (ガンプラ)
              </Text>{" "}
              and anything model kit related
            </Title>

            <Text className={classes.description} mt={30}>
              {`At Gunpla Sekai, we're dedicated to providing the ultimate Gunpla
              experience. Explore our comprehensive shop for the latest kits and
              tools, customize your builds with our 3D
              configurator, and share your creations with a community of passionate
              builders. Whether you're shopping, creating, or showcasing, Gunpla
              Sekai is your go-to destination for all things Gunpla.`}
            </Text>

            <Button
              variant="gradient"
              gradient={{ to: "#F5D34B", from: "#B23634" }}
              size="xl"
              className={classes.control}
              mt={40}>
              Get started
            </Button>
          </div>
        </Flex>
      </Container>
    </div>
  );
}
