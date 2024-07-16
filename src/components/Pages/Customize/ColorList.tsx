"use client";

import {
  Box,
  Collapse,
  Flex,
  Group,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import classes from "./NavbarLinksGroup.module.css";

interface ColorGroupsProps {
  name: string;
  samples: { name: string; hex: string; finish: string }[];
}

export default function ColorGroups({ data }: { data: ColorGroupsProps }) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Text size="md" fw={500}>
              {data?.name && data.name}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
      {data?.samples?.length > 0 && (
        <Collapse in={opened}>
          {data?.samples.map((item) => (
            <div
              key={item.name + "-" + item.finish}
              className={classes.link}
              style={{
                display: "flex",
                gap: "6px",
                flexDirection: "row",
                flexWrap: "nowrap",
              }}
            >
              <div
                className={classes.colorAvatar}
                style={{ backgroundColor: item.hex }}
              />
              <Text size="sm">
                {item.name} ({item.finish})
              </Text>
            </div>
          ))}
        </Collapse>
      )}
    </>
  );
}
