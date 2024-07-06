"use client";
import {
  Box,
  Flex,
  ScrollArea,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Image from "next/image";
import series from "../../mock/series.json";
import { useState } from "react";

export default function GundamPage() {
  const [selectedSeries, setSelectedSeries] = useState(series[0]);

  return (
    <Flex direction="row" flex={1} gap={8}>
      <Box pos="relative" w={200}>
        <ScrollArea
          pos="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
          type="never">
          {series
            .filter((media) => !!media.logoSrc)
            .map((media) => {
              return (
                <UnstyledButton
                  key={media.id}
                  onClick={() => setSelectedSeries(media)}>
                  <Image
                    src={media.logoSrc as string}
                    alt="Mobile Suit Gundam Logo"
                    width={200}
                    height={120}
                    style={{ objectFit: "contain" }}
                  />
                </UnstyledButton>
              );
            })}
        </ScrollArea>
      </Box>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 2, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}>
        {Array.isArray(selectedSeries.mobileSuits) &&
          selectedSeries.mobileSuits.map((ms) => {
            return (
              <Flex direction="column" key={ms.id}>
                <img src={ms.imageSrc} alt={ms.name} />
                <Text>{ms.name}</Text>
              </Flex>
            );
          })}{" "}
        {Array.isArray(selectedSeries.mobileSuits) &&
          selectedSeries.mobileSuits.map((ms) => {
            return (
              <Flex direction="column" key={ms.id}>
                <img src={ms.imageSrc} alt={ms.name} />
                <Text>{ms.name}</Text>
              </Flex>
            );
          })}{" "}
        {Array.isArray(selectedSeries.mobileSuits) &&
          selectedSeries.mobileSuits.map((ms) => {
            return (
              <Flex direction="column" key={ms.id}>
                <img src={ms.imageSrc} alt={ms.name} />
                <Text>{ms.name}</Text>
              </Flex>
            );
          })}{" "}
        {Array.isArray(selectedSeries.mobileSuits) &&
          selectedSeries.mobileSuits.map((ms) => {
            return (
              <Flex direction="column" key={ms.id}>
                <img src={ms.imageSrc} alt={ms.name} />
                <Text>{ms.name}</Text>
              </Flex>
            );
          })}
      </SimpleGrid>
    </Flex>
  );
}
