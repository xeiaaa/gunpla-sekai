"use client";

import { Group, Button, Box } from "@mantine/core";
import classes from "./AppHeader.module.css";
import Link from "next/link";
import { HeaderAuthMenu } from "./HeaderAuthMenu";

export function AppHeader() {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <Link href="/" className={classes.logo}>
            <span>Gunpla Sekai</span>
          </Link>
          <Group h="100%" gap={5} visibleFrom="sm">
            <Group h="100%">
              {/* <Link href="/shop" className={classes.link}>
                Shop
              </Link> */}
              <Link href="/gundam" className={classes.link}>
                Gundam
              </Link>
              <Link href="/customize" className={classes.link}>
                Customize
              </Link>
              {/* <Link href="/builds" className={classes.link}>
                Builds
              </Link> */}
              <Link href="/blog" className={classes.link}>
                Blog
              </Link>
            </Group>
            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              {/* <Button>Sign up</Button>
              <HeaderAuthMenu /> */}
            </Group>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
