"use client";
import { AppShell } from "@mantine/core";
import { AppHeader } from "../AppHeader/AppHeader";

export function AppShell_({ children }: { children: any }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>

      <AppShell.Main display="flex" dir="column">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
