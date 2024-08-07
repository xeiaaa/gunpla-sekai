import { Group, Button, Box } from "@mantine/core";
import classes from "./AppHeader.module.css";
import Link from "next/link";
import { HeaderAuthMenu } from "./HeaderAuthMenu";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function AppHeader() {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/" className={classes.logo}>
            {/* <span>Gunpla Sekai</span> */}
            <Image
              src="/logo.png"
              alt="Gunpla Sekai Logo"
              width={100}
              height={46}
              style={{ marginTop: 6 }}
            />
          </Link>
          <Group h="100%" gap={5} visibleFrom="sm">
            <Group h="100%">
              <Link href="/shop" className={classes.link}>
                Shop
              </Link>
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
            <Group visibleFrom="sm" pl={5}>
              <SignedOut>
                <Link href="/sign-in">
                  <Button variant="default">Log in</Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {/* <Button variant="default">Log in</Button> */}
              {/* <Button>Sign up</Button>
              <HeaderAuthMenu /> */}
            </Group>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
