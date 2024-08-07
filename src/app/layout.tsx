import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "./theme";
import { AppShell_ } from "../components/AppShell_/AppShell_";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const metadata = {
  title: "Gunpla Sekai",
  description: "Dedicated to Gunpla (ガンプラ) and anything model kit related",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
          {/* <link rel="shortcut icon" href="/favicon.svg" /> */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </head>
        <body>
          <MantineProvider theme={theme}>
            <Notifications />

            <AppShell_>{children}</AppShell_>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
