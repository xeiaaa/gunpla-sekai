"use client";

import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./NavbarLinksGroup.module.css";

interface LinksGroupProps {
  icon?: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string }[];
  setter: () => void;
}

export default function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  setter,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      // component="a"
      size="lg"
      className={classes.link}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        setter();
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            {/* {Icon && (
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
            )} */}
            <Text size="md" fw={500}>
              {label}
            </Text>
          </Box>
          {/* {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )} */}
        </Group>
      </UnstyledButton>
      {/* {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null} */}
    </>
  );
}
